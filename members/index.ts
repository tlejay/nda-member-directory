/**
 * Shared member index — the ONE file every contributor edits.
 *
 * To add yourself: append exactly one line with your GitHub username at the
 * END of the list below (just above the closing bracket). The username must
 * match your card file name: members/<username>.json
 *
 * MERGE CONFLICTS HERE ARE EXPECTED. Everyone appends to the same spot, so
 * when someone else's PR is merged before yours, Git cannot decide the order.
 * That is the exercise, not a mistake.
 *
 * How to resolve:
 *   1. Run `git merge main` on your branch (never rebase, never force push).
 *   2. Open this file. Between the conflict markers you will see their
 *      line(s) and your line. KEEP BOTH — delete only the three marker lines
 *      (`<<<<<<<`, `=======`, `>>>>>>>`).
 *   3. Check that every username that is on `main` is still in the list and
 *      that every line ends with a comma.
 *   4. Run `pnpm build`. It fails if any card in members/ is missing here.
 *   5. Commit the merge and push.
 *
 * Changed your mind mid-merge? `git merge --abort` puts everything back.
 */
export const memberIds: string[] = [
  "tlejay",
  "example-member",
];
