# Tests and coverage

Every file exporting code has a spec next to it (`format-number.ts` → `format-number.spec.ts`), run by
Vitest. The check fails below **100 %** coverage of lines, branches, functions and statements.

- Each API page lists the tests of its function, with their result from the last build, and its line
  coverage.
- The SVG specs render real SVG in Chromium (the `browser` project of Vitest, through Playwright): run
  `pnpm exec playwright install chromium` once; the CI installs it at each run.
- The full [coverage report](/coverage/index.html) shows every line and branch.
- `pnpm check` runs everything before a push: catalog, types, lint, format, unused code, tests with coverage.
