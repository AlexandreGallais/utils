---
name: add-function
description: Checklist to add or change a function, class, type or enum in this utils library (one export per file, JSDoc standard, spec, index.ts, generated docs). Use it for any new utility or any change of a public signature.
---

# Add or change a function

Follow `AGENTS.md` → "Writing a function". In short:

1. **Place it**: the theme folder (`src/<theme>/`), a kebab-case file named after the export (`round-to-step.ts` → `roundToStep`, `level.enum.ts` → `Level`). Helpers used by several files of the theme go to `src/<theme>/internal/`, by several themes to `src/internal/`. Constants stay in the file that uses them.
2. **Write it** from the template: one exported function, private helpers after it, constants with explicit names and no comment, readonly parameters, defaults in the signature for the settings (no `| null`), options object beyond 3–4 parameters, angles 0° up and clockwise. Trust the inputs: no argument validation; a `parse…` throws one `TypeError` when its regular expression does not match.
3. **Document the export only**, in short sentences, with the wording of `AGENTS.md` (a verb for a function, `Checks whether…` for a boolean, `The…` for a `@param`): `@template`, `@param name - …` (ending with "Defaults to `X`." when there is one), `@returns`, `@throws` / `@rejects`, `@example` with results in comments. No JSDoc on helpers, constants or `internal/` files.
4. **Cache?** Only inside the function, when it always pays (`Intl` formatters, a `WeakMap` by object), tagged `@cached`. No `…Cached` or `…Simple` variant.
5. **Test it** next to it (`*.spec.ts`): `describe(fn)`, `it.for` tables, the edge cases the function handles on purpose, at most 5 `expect` per test. Coverage must stay at 100 %.
6. **Export it** in the folder's `index.ts` (`export { fn } from './fn';`, `export type` for types); a new folder is added to `src/index.ts`.
7. **Verify** one file at a time: `pnpm exec eslint --fix <files>`, `pnpm exec vitest run <spec>`, then `pnpm check` (it regenerates `README.md` and `docs/FUNCTIONS.md`).
8. **Performance claim?** Add a benchmark in `benchmarks/` against the naive baseline.
9. **Requirement?** Record it, or the decision it changes, in `docs/SPEC.md`.
