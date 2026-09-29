---
name: add-function
description: Checklist to add or change a function, class, type or enum in this utils library (one export per file, JSDoc standard, spec, index.ts, generated docs). Use it for any new utility or any change of a public signature.
---

# Add or change a function

Follow `AGENTS.md` → "Writing a function". In short:

1. **Place it**: the theme folder (`src/<theme>/`), a kebab-case file named after the export (`round-to-step.ts` → `roundToStep`, `alarm-level.enum.ts` → `AlarmLevel`). Helpers used by several files of the theme go to `src/<theme>/internal/`, by several themes to `src/internal/`. Constants stay in the file that uses them.
2. **Write it** from the template: constants documented, one exported function, private helpers after it, readonly parameters, options object beyond 3–4 parameters, `RangeError` / `TypeError` with the received value, injectable `now` / `random`, angles 0° up and clockwise.
3. **Document it**: description sentences (capital, period), `@template`, `@param name - …`, `@returns`, `@throws` / `@rejects`, `@example` with results in comments; `@cached` for a `…Cached` variant, `@internal` for helpers. The description says more than the name.
4. **Value cache?** Plain function without cache + `…Cached` variant in its own file, tagged `@cached` (key, size, eviction).
5. **Test it** next to it (`*.spec.ts`): `describe(fn)`, `it.for` tables, edge cases (`NaN`, empty, negative, bounds, invalid arguments), at most 5 `expect` per test. Coverage must stay at 100 %.
6. **Export it** in the folder's `index.ts` (`export { fn } from './fn.ts';`, `export type` for types); a new folder is added to `src/index.ts`.
7. **Verify** one file at a time: `pnpm exec eslint --fix <files>`, `pnpm exec vitest run <spec>`, then `pnpm check` (it regenerates `README.md` and `docs/FUNCTIONS.md`).
8. **Performance claim?** Add a benchmark in `benchmarks/` against the naive baseline.
9. **Requirement?** Record it, or the decision it changes, in `docs/SPEC.md`.
