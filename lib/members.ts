// Loads and validates member cards. Used by the home page (so a bad card
// fails `next build`) and by scripts/validate-members.ts (so it also fails
// `pnpm typecheck` with a short, readable message).
//
// Relative imports keep the `.ts` extension so Node can run this file
// directly, without a bundler.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { memberIds } from "../members/index.ts";

export type Member = {
  /** Display name. */
  name: string;
  /** What they do, one line. */
  business: string;
  /** GitHub username. Must equal the file name. */
  github: string;
  /** Link to their deployed product. Optional. */
  url?: string;
  /** Short personal line. Optional. */
  tagline?: string;
};

const MEMBERS_DIR = path.join(process.cwd(), "members");
const REQUIRED_KEYS = ["name", "business", "github"] as const;
const OPTIONAL_KEYS = ["url", "tagline"] as const;
const ALLOWED_KEYS: readonly string[] = [...REQUIRED_KEYS, ...OPTIONAL_KEYS];
const MAX_LENGTH: Record<string, number> = {
  name: 60,
  business: 120,
  tagline: 140,
  url: 200,
};
// GitHub's own username rule: letters, digits, single hyphens, max 39 chars.
const USERNAME_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

export class MemberValidationError extends Error {
  problems: string[];

  constructor(problems: string[]) {
    const count = `${problems.length} problem${problems.length === 1 ? "" : "s"}`;
    super(
      [
        `Member card validation failed (${count}):`,
        ...problems.map((problem) => `  - ${problem}`),
        "",
        "Fix the file(s) above, then run `pnpm typecheck` again.",
        "Card format and rules: see CLAUDE.md.",
      ].join("\n"),
    );
    this.name = "MemberValidationError";
    this.problems = problems;
  }
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

/** Checks one parsed card. Pushes readable problems instead of throwing. */
function checkCard(id: string, data: unknown, problems: string[]): Member | null {
  const file = `members/${id}.json`;
  const before = problems.length;

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    problems.push(`${file}: must be a JSON object like { "name": "...", ... }`);
    return null;
  }
  const card = data as Record<string, unknown>;

  for (const key of Object.keys(card)) {
    if (!ALLOWED_KEYS.includes(key)) {
      problems.push(
        `${file}: unknown field "${key}" (allowed: ${ALLOWED_KEYS.join(", ")})`,
      );
    }
  }

  for (const key of REQUIRED_KEYS) {
    const value = card[key];
    if (typeof value !== "string" || value.trim() === "") {
      problems.push(`${file}: "${key}" is required and must be a non-empty string`);
    }
  }

  for (const key of OPTIONAL_KEYS) {
    const value = card[key];
    if (value !== undefined && typeof value !== "string") {
      problems.push(`${file}: "${key}" must be a string (or remove the field)`);
    }
  }

  for (const [key, max] of Object.entries(MAX_LENGTH)) {
    const value = card[key];
    if (typeof value === "string" && value.length > max) {
      problems.push(`${file}: "${key}" is too long (${value.length}/${max} characters)`);
    }
  }

  if (typeof card.github === "string" && card.github.trim() !== "" && card.github !== id) {
    problems.push(
      `${file}: "github" is "${card.github}" but the file name says "${id}" — they must match exactly`,
    );
  }

  const url = typeof card.url === "string" ? card.url.trim() : "";
  if (url !== "" && !isHttpUrl(url)) {
    problems.push(`${file}: "url" must start with https:// or http:// (got "${url}")`);
  }

  if (problems.length > before) return null;

  const tagline = typeof card.tagline === "string" ? card.tagline.trim() : "";
  return {
    name: (card.name as string).trim(),
    business: (card.business as string).trim(),
    github: card.github as string,
    ...(url !== "" ? { url } : {}),
    ...(tagline !== "" ? { tagline } : {}),
  };
}

/**
 * Returns every member in index order.
 * Throws MemberValidationError listing ALL problems at once.
 */
export function loadMembers(): Member[] {
  const problems: string[] = [];
  const members: Member[] = [];
  const seen = new Set<string>();

  const cardFiles = readdirSync(MEMBERS_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.slice(0, -".json".length));

  for (const id of memberIds) {
    if (typeof id !== "string" || !USERNAME_PATTERN.test(id)) {
      problems.push(
        `members/index.ts: "${String(id)}" is not a valid GitHub username (letters, digits and single hyphens only)`,
      );
      continue;
    }
    if (seen.has(id.toLowerCase())) {
      problems.push(`members/index.ts: "${id}" is listed more than once — keep one line`);
      continue;
    }
    seen.add(id.toLowerCase());

    if (!cardFiles.includes(id)) {
      problems.push(
        `members/index.ts: "${id}" is listed but members/${id}.json does not exist (check spelling and upper/lower case)`,
      );
      continue;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(readFileSync(path.join(MEMBERS_DIR, `${id}.json`), "utf8"));
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      problems.push(
        `members/${id}.json: not valid JSON (${reason}). Look for a missing comma or quote, or leftover conflict markers.`,
      );
      continue;
    }

    const member = checkCard(id, parsed, problems);
    if (member) members.push(member);
  }

  // A card file that is not in the index usually means a line was dropped
  // while resolving a merge conflict.
  for (const id of cardFiles) {
    if (!seen.has(id.toLowerCase())) {
      problems.push(
        `members/${id}.json exists but "${id}" is missing from members/index.ts — add the line back (was it lost while resolving a conflict?)`,
      );
    }
  }

  if (problems.length > 0) throw new MemberValidationError(problems);
  return members;
}
