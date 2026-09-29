You are an expert in TypeScript and performance-sensitive front-end code. You write functional, maintainable and fast code following TypeScript best practices.

This repository is linted very strictly on purpose: most rules below are enforced by ESLint, Prettier or the TypeScript compiler, and lint warnings count as errors. Write code that passes them the first time; never loosen a rule to make code pass.

## Project

- A publishable TypeScript utility library (ESM only), consumed by Angular simulation UIs. No runtime dependency.
- **One exported function (or class, or type) per file**, named after it, in a folder per theme: `src/math/round-to-step.ts` exports `roundToStep`, its spec is `src/math/round-to-step.spec.ts`.
- Every theme folder has an `index.ts` that re-exports its public functions and types by name; `src/index.ts`, the package entry point (a standard Vite library), re-exports every folder (`export * from './math/index.ts';`).
- Helpers shared inside a theme live in `src/<theme>/internal/`, private to that theme; helpers shared by several themes live in `src/internal/`. Neither is exported by an `index.ts`.
- Constants live in the file that uses them (duplicate a small constant rather than share it): each file stays self-contained, ready to be copied.
- `docs/FUNCTIONS.md` is generated (`pnpm docs:catalog`): it lists every export and the files it needs.
- Built by Vite in library mode (one output file per module, for tree-shaking) + `tsc` for the declarations.
- Tests: Vitest (Node environment, globals). Benchmarks: Vitest benchmarks in `benchmarks/`, run on the built package.
- The specification and the design decisions are in `docs/SPEC.md`: update it with any API change.

## Performance

Values may refresh ~1 000 times per second: functions used at each refresh must be cheap.

- No allocation in hot paths when avoidable: plain `for` / `for…of` loops, no intermediate arrays, no spread of large arrays.
- Objects that are expensive to create (`Intl` formatters, segmenters) may be cached inside the plain function.
- A cache of computed values is opt-in: the plain function has no cache (`parseColor`), and a `…Cached` variant in its own file adds it (`parseColorCached`), with a `@cached` JSDoc tag describing the cache (key, size, eviction). Bound caches keyed by user input.
- Prefer precomputed tables (`/* @__PURE__ */` so bundlers drop unused ones) over repeated `Math.pow`, `toString(16)`, `10 ** n`.
- Any optimisation claim is backed by a benchmark in `benchmarks/` against the naive baseline; keep the optimisation only if it wins.

## Package manager

- **pnpm only** (`packageManager` in package.json; `corepack enable`). Never run `npm install` / `npm i`.
- `pnpm add -D <pkg>`. Pin exact versions (no `^`), like every existing dependency.
- `pnpm-workspace.yaml` installs native binaries for macOS, Windows and Linux (arm64 and x64); `allowBuilds` lists packages whose install scripts are skipped.

## Commands

Run this before considering a change done:

```sh
pnpm check
```

It runs `typecheck`, `lint` (`--max-warnings 0`), `format:check`, `knip` (unused files, exports and dependencies), `coverage` (100 % thresholds), `build`, `check:package` (publint + attw) and `size` (size-limit). `pnpm lint:fix` and `pnpm format` fix most formatting and ordering issues. Commit messages follow Conventional Commits (commitlint).

## Tooling configuration

- `eslint.config.mjs`: core, TypeScript, SonarJS, imports, file names, Vitest, ESLint comments. It imports the configs in `eslint/`: `jsdoc.config.mjs`, `regexp.config.mjs`, `unicorn.config.mjs` and `local.config.mjs` (project rules in `eslint/rules/`: `export-matches-filename`, `require-spec-file`).
- Every lint rule of every plugin is listed explicitly. When adding a plugin, list all its rules, turn off the ones that duplicate an existing rule (SonarJS included), and comment every non-default choice with a one-line prefix: `Custom:` (project choice), `Off:` (disabled on purpose), `Deprecated:` (replaced).
- `tsconfig.json` holds the compiler options and references `tsconfig.lib.json` (sources, emits declarations), `tsconfig.spec.json` (specs), `tsconfig.bench.json` (benchmarks) and `tsconfig.node.json` (tool configs).
- Relative imports name the `.ts` file (`./math.utils.ts`); `rewriteRelativeImportExtensions` turns them into `.js` in the output.
- `vite.config.mts`: library build and Vitest (tests, coverage, benchmarks). `.size-limit.json`: bundle size budgets.
- `.prettierrc.json`: single quotes; `.editorconfig`: 2 spaces, LF, 120 columns.

## Disabling a rule

- Only `// eslint-disable-next-line <rule> -- <reason>`: one line, named rules, with a reason. File-wide disables, `eslint-disable-line`, `/* eslint … */` inline configs and `/* global */` are forbidden; unused disables are errors.
- Do not disable a rule to get code through: fix the code.
- Coverage: `/* v8 ignore next -- <reason> */` only for a branch the type system forces and that cannot run (e.g. a `?? 0` required by `noUncheckedIndexedAccess`). Prefer restructuring the code so the branch disappears.

## Files, folders and exports

- File and folder names are kebab-case and match the single export (`local/export-matches-filename`): `parse-color.ts` exports `parseColor`, `ring-buffer.ts` exports `RingBuffer`. Only the `index.ts` files re-export.
- Every file exporting runtime code has its spec next to it (`local/require-spec-file`); `internal/` helpers are tested through the public functions.
- No other barrel than the `index.ts` of each folder. Inside the library, import the file itself (`../math/clamp.ts`), never an `index.ts`. A theme never imports another theme's `internal/` folder.
- Named exports only. Default exports are allowed only where a tool requires them (config files).
- Import order: packages first, then relative files; `import type` lines are separate.
- No import cycles. No Node.js built-in in `src/`: the library runs in browsers.

## TypeScript

- Strict compiler options on top of `strict`: `noUncheckedIndexedAccess` (`array[i]` is `T | undefined`: check it, do not use `!`), `exactOptionalPropertyTypes`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`.
- Unused variables and unreachable code do not break the build but fail the lint.
- No `any` (use `unknown`), no non-null assertion `!`, no unsafe type assertion.
- Explicit return types on functions and methods, explicit accessibility (`public` / `private`) on class members.
- `interface` for object types; `import type { X }` for type-only imports, on its own line.
- Named functions use `function foo(): T {}`, not `const foo = () => {}`; callbacks stay arrow functions.
- Conditions: numbers are compared explicitly (`count > 0`, not `if (count)`).
- `_` prefix only for intentionally unused parameters and variables, and private members.

## Writing a function

Every function of the library follows the same shape, so any file reads the same and can be copied alone.

### File

```ts
import { clamp } from '../math/clamp.ts'; // the file itself, never an index.ts
import type { Rgb } from './rgb.ts';

/** What the constant is, and why this value. */
const MAX_CHANNEL = 255;

/**
 * One sentence saying what the function does, then when to use it or what makes it special (edge cases,
 * performance, conventions). Sentences start with a capital (or `code`) and end with a period.
 *
 * @template T - What the type parameter stands for.
 * @param value - What the parameter is: unit, range, accepted forms.
 * @param isInclusive - Boolean parameters read as questions.
 * @returns What comes back, and what comes back in the edge cases (`undefined`, `NaN`, empty).
 * @throws {RangeError} When an argument is out of range (the condition, not the message).
 * @example
 * functionName(15, 0, 10); // 10
 * functionName(5, 10, 0); // 5 (bounds swapped)
 */
export function functionName(value: number, isInclusive = true): number {
  …
}

/**
 * Private helpers stay in the file, after the exported function, with the same JSDoc (no `@example`).
 *
 * @param value - …
 * @returns …
 */
function helper(value: number): number {
  …
}
```

- **One export per file**, named like the file (`round-to-step.ts` → `roundToStep`); an enum goes in a `.enum.ts` file (`alarm-level.enum.ts` → `AlarmLevel`). Types and interfaces get their own file too (`rgb.ts` → `Rgb`).
- **JSDoc tags in this order**: `@internal` / `@cached`, `@template`, `@param`, `@returns`, `@yields`, `@throws`, `@rejects`, `@example`. Every exported function or class has an `@example` with its result as a `// comment`; an internal helper has `@internal` instead.
- **Descriptions** say more than the name (`jsdoc/informative-docs`): not "The matrix." but "The matrix to apply, such as the result of `parseTransform`.".

### Naming

| Prefix                      | Returns                                     | Examples                                    |
| --------------------------- | ------------------------------------------- | ------------------------------------------- |
| `is…`, `has…`, `meets…`     | `boolean`                                   | `isBetween`, `hasSignificantChange`         |
| `get…`                      | a value computed from the arguments         | `getRelativeLuminance`, `getAnimationPhase` |
| `to…`                       | the same data in another representation     | `toHex`, `toLinear`                         |
| `parse…`                    | a value from text, `undefined` when invalid | `parseColor`, `parseTransform`              |
| `parse…OrThrow`             | a value from text, throws when invalid      | `parseColorOrThrow`                         |
| `format…`                   | a `string` for display                      | `formatDecimal`, `formatDuration`           |
| `create…`                   | a new object, function or path              | `createArcPath`, `createLogger`             |
| `round…`, `floor…`, `ceil…` | a `number`                                  | `roundToStep`                               |
| `…Cached`                   | the same result, through a value cache      | `parseColorCached`                          |

- Plural parameters for lists (`items`, `values`, `points`); `min` / `max`, `from` / `to`, `start` / `end` for ranges; units in names when ambiguous (`deltaMs`, `angleDegrees`, `periodMs`).
- Decimals are `maxFractionDigits`; bounds may be given in any order when it makes sense.

### Parameters and results

- Pure functions whenever possible; classes only for stateful structures (`RingBuffer`, `Clock`).
- Up to 3 or 4 positional parameters; beyond, an options object with its own `…Options` interface file (`BarTicksOptions`), every field `readonly` and documented, defaults destructured in the function.
- Parameters are readonly (`readonly T[]`, `readonly` fields): a utility never mutates its arguments and returns new objects.
- Callbacks are named for their role (`callback`, `keySelector`, `predicate`, `mapper`, `listener`).
- Time sources and randomness are injectable (`now = () => performance.now()`, `random = Math.random`) for tests and replayable simulations.
- Angles: 0° up and clockwise everywhere (SVG y axis down, compass headings).
- No magic numbers: module constants, documented.

### Errors

- A programming error (argument out of range, invalid step) throws a `RangeError`, an unparsable input a `TypeError`; the message gives the expected range and the received value: `` `step must be a positive finite number, got ${step}` ``.
- Data that may legitimately be invalid (user input, network) is parsed by a `parse…` function returning `undefined`, with a `parse…OrThrow` variant when useful.
- Async functions reject with `Error` instances; an `AbortSignal` parameter cancels them (`signal?.throwIfAborted()`).

### Caches

- Objects that are expensive to create (`Intl` formatters, segmenters) may be cached inside the plain function.
- A cache of computed values is opt-in: the plain function has none (`parseColor`), a `…Cached` variant in its own file adds it (`parseColorCached`), with a `@cached` tag describing the key, the size and the eviction. Caches keyed by user input are bounded.

### Adding a function

1. Write the file (template above) and its spec next to it (`it.for` tables, edge cases: `NaN`, empty, negative, bounds).
2. Add the export to the folder's `index.ts` (a new folder also goes in `src/index.ts`).
3. Run `pnpm check`: it regenerates `README.md` and `docs/FUNCTIONS.md` from the JSDoc, then lints, tests (100 % coverage), builds and checks the package.
4. A performance claim needs a benchmark in `benchmarks/` against the naive baseline.
5. Update `docs/SPEC.md` when the function answers a requirement or changes a decision.

## Tests (Vitest)

- Specs are `*.spec.ts` next to the tested file; `it`, never `test`.
- Vitest globals are enabled: do NOT import `describe`, `it`, `expect`, `vi` from `vitest`.
- `describe` title: the tested function or class (`describe(clamp, …)`); `it` titles in lowercase.
- Table-driven tests with `it.for([...])`; at most 5 `expect` per test; no conditional expects or tests; no `.only`, `.skip` or commented-out tests.
- Matchers: `toStrictEqual` over `toEqual`, `toHaveLength`, `toHaveBeenCalledOnce()`, `toBeInstanceOf()`.
- Mocks are typed: `vi.fn<(value: number) => void>()`. Timers: `vi.useFakeTimers()` in `beforeEach`, `vi.useRealTimers()` in `afterEach`.
- Coverage must stay at 100 % (lines, branches, functions, statements).

## Benchmarks

- `benchmarks/<module>.bench.ts`, importing the package by its name (`from 'utils'`), which resolves to `dist/`: `pnpm bench` builds first and runs without Vite's module runner (its import getters distort the results).
- One `it` per comparison, with the test-context `bench` renamed `benchmark` (the Vitest ESLint plugin mistakes `bench` for the legacy test function):

  ```ts
  it('compares with …', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('library function', () => {
        _sink = libraryFunction(input);
      }),
      benchmark('naive baseline', () => {
        _sink = naive(input);
      }),
    );
  });
  ```

- Write results to a module-level `_sink` so the engine cannot drop the benchmarked code.
