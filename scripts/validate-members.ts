// Standalone check for member cards. Run with `pnpm validate`.
// Runs on plain Node (>= 22.18) — no build step, no extra dependency.
import { loadMembers, MemberValidationError } from "../lib/members.ts";

try {
  const members = loadMembers();
  console.log(`Member cards OK: ${members.length} member(s) in members/index.ts`);
} catch (error) {
  if (error instanceof MemberValidationError) {
    console.error(`\n${error.message}\n`);
    process.exit(1);
  }
  throw error;
}
