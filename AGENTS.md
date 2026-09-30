You are an expert in TypeScript and performance-sensitive front-end code. You write functional, maintainable and fast code following TypeScript best practices.

This repository is linted very strictly on purpose: most rules below are enforced by ESLint, Prettier or the TypeScript compiler, and lint warnings count as errors. Write code that passes them the first time; never loosen a rule to make code pass.

## Project

- A TypeScript utility library, never built nor published: its folders are copied into the Angular simulation UIs that use them. No runtime dependency.
- **One exported function or class per file**, named after it, in a folder per theme: `src/math/round-to-step.ts` exports `roundToStep`, its spec is `src/math/round-to-step.spec.ts`. The types and constants that belong to it (its `…Options`, its result type) stay in its file; a type used by several files has its own file.
- Every folder has an `index.ts` that re-exports what it shares (`internal/` and `testing/` included, for the files of their theme); `src/index.ts` re-exports every theme folder (`export * from './math';`).
- Helpers shared inside a theme live in `src/<theme>/internal/`, private to that theme; helpers shared by several themes live in `src/internal/`. Neither is re-exported by `src/index.ts` or a theme's `index.ts`.
- Constants live in the file that uses them (duplicate a small constant rather than share it).
- `docs/FUNCTIONS.md` is generated (`pnpm docs:catalog`): it lists every export and the files it needs, followed through the `index.ts` files.
- The wiki is VitePress in `docs/` (`pnpm wiki:dev`): hand-written guide pages in `docs/guide/`, API pages generated from the JSDoc by `scripts/generate-wiki.mjs` into `docs/api/` (ignored by Git). `.github/workflows/wiki.yml` publishes it on GitHub Pages at each push to `main`. A new folder needs a title in `scripts/wiki/read-sources.mjs`.
- Tests: Vitest with globals and 100 % coverage: the `node` project runs the specs in Node, the `browser` project runs the SVG specs in Chromium through Playwright, on rendered SVG. Benchmarks: Vitest benchmarks in `benchmarks/`, run in Chromium (`pnpm bench`).
- The specification and the design decisions are in `docs/SPEC.md`: update it with any API change.

## Performance

Values may refresh ~1 000 times per second: functions used at each refresh must be cheap.

- No allocation in hot paths when avoidable: plain `for` / `for…of` loops, no intermediate arrays, no spread of large arrays.
- Objects that are expensive to create (`Intl` formatters, segmenters) may be cached inside the plain function.
- A cache lives inside the function when it always pays (`Intl` formatters by settings, the values of each enum in a `WeakMap`), with a `@cached` JSDoc tag; there is no `…Cached` variant. A cache keyed by user input is bounded.
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

`pnpm lint` and `pnpm lint:css` fail on errors, `pnpm lint:strict` and `pnpm lint:css:strict` on warnings too (a merge request to `main`). `pnpm transfer <folders>` packs folders into one text file (`transfer/`) that recreates them on another machine. `pnpm check` runs `docs:catalog`, `wiki:generate`, `typecheck`, `lint` (`--max-warnings 0`), `lint:presets`, `format:check`, `knip` (unused files, exports and dependencies) and `coverage` (100 % thresholds). `pnpm lint:fix` and `pnpm format` fix most formatting and ordering issues; `pnpm lint:fix` also rewrites imports through the folders' `index.ts`. Commit messages follow Conventional Commits (commitlint).

## Tooling configuration

- Lint rules live in `lint/eslint/`: `rules/` (one file per concept — async, conditions, naming… — with the ESLint, typescript-eslint, SonarJS and import-x rules, each with a `/typescript` config for the TypeScript rules; SonarJS is always on, Sonar way profile, duplicates of core rules off; plus the blocks the presets choose: `node`, `browser`, `library`, `exports`, `angular-components`, `angular-templates`, `storybook`; `rules/local/` holds the rules written here: `kebab-case-path`, `export-matches-filename` (a warning in the presets), `import-folders` (autofix: "path can be simplified" through a folder's index), `disable-only-warnings`, `disable-reason`, `disable-next-line-only`), `setup/` (globs, parsers, the core and project rule lists, the `info` level, the severity mirror, `without-plugins`, `editor-settings.mjs`) and `presets/` (re-exported by `lint/index.mjs`): `typescript-node` for the root config of a workspace (Node mode), and for each project config, which imports the root config (`rootConfig`) and switches its `sourceFiles` to the browser mode, `typescript-browser` (`isLibrary`, `storybookPackageDirectory`), `angular-library` (`prefix`, `storybookPackageDirectory`) and `angular-app` (`prefix`); all take `overrides`. Screen-reader accessibility and @angular/localize rules are off (simulators, Transloco). Levels: `error` (a real mistake or an autofixed style, never disabled), `warn` (disabled for one line with a reason), `info` (a suggestion, shown in blue in the editor only: `pnpm lint:editor` lists them in `.vscode/settings.json`; `pnpm lint` sets `ESLINT_INFO_RULES=off`). In specs, test helpers, benchmarks and stories, warnings and the hack-blocking rules (`any`, `!`, unsafe assertions) become infos, SonarJS and its stand-ins excepted (`setup/relax-tests-and-stories.mjs`). `lint/examples/` holds a root config and a config per project preset. Stylelint (`lint/stylelint/`): every core, stylelint-scss and stylelint-order rule listed by concept in `rules/`, same levels (error = a mistake or an autofixed style, warning otherwise), `local/disable-only-warnings`, one preset `presets/scss.mjs` (`scssPreset`). `lint/legacy/angular-18.eslintrc.json` gives the same ESLint rules to an Angular 18 project on ESLint 8 (generated, checked with ESLint 8.57 and angular-eslint 18). `pnpm lint:presets` also proves that every SonarQube Sonar way rule is on or covered. The rule reference of the wiki (`docs/lint-rules/`) is generated from the blocks, the comment above each rule and each rule's own description.
- `eslint.config.mjs` = the `typescript-node` preset (root: scripts, benchmarks, tool configs) passed as `rootConfig` to the `typescript-browser` preset (`src/`, a library). A rule change goes in its block, never in a project config.
- `examples/design-system/` is an Angular library linted by the Angular preset (folder imports through an `index.ts` per folder); `pnpm lint:presets` checks that it passes and that each block catches its mistake. Add a case there when a block gains a rule worth proving.
- The wiki documents the blocks, the presets and their performance (`docs/guide/linting/`), and the CSS of a design system (`docs/guide/css/`).
- Plugins are few on purpose: ESLint, typescript-eslint, import-x (+ TypeScript resolver), Prettier, angular-eslint, SonarJS (optional), Storybook (optional). Every rule of every plugin is listed explicitly. When adding a plugin, list all its rules, turn off the ones that duplicate an existing rule, and comment every non-default choice with a one-line prefix: `Custom:` (project choice), `Off:` (disabled on purpose), `Deprecated:` (replaced), `Warn:` (why the rule is a warning: the legitimate exception).
- `tsconfig.json` holds the compiler options (`noEmit`: nothing is built) and references `tsconfig.lib.json` (sources), `tsconfig.spec.json` (specs), `tsconfig.bench.json` (benchmarks) and `tsconfig.node.json` (tool configs).
- A relative import names a neighbour file or a folder, without extension (`./clamp`, `../math`): never a file inside another folder (`local/import-folders`, autofixed through the folder's `index.ts`).
- `vite.config.mts`: Vitest (specs, coverage). `vitest.bench.config.mts`: benchmarks in Chromium (Playwright), cross-origin isolated for precise timers.
- `.prettierrc.json`: single quotes; `.editorconfig`: 2 spaces, LF, 120 columns.

## Disabling a rule

- A rule is either an **error** — a real mistake, or a style the autofix applies — which cannot be disabled at all (`local/disable-only-warnings`), or a **warning** — a style without autofix — which `// eslint-disable-next-line <rule> -- <reason>` may silence (one line, named rules, a reason). File-wide disables, `eslint-disable-line`, `/* eslint … */` inline configs and `/* global */` are forbidden; unused disables are errors.
- Do not disable a rule to get code through: fix the code.
- Coverage: `/* v8 ignore next -- <reason> */` only for a branch the type system forces and that cannot run (e.g. a `?? 0` required by `noUncheckedIndexedAccess`). Prefer restructuring the code so the branch disappears.

## Files, folders and exports

- File and folder names are kebab-case and match the exported function or class (`local/export-matches-filename`): `parse-time-span.ts` exports `parseTimeSpan`, `get-svg-anchor-point.ts` exports `getSvgAnchorPoint`. Only the `index.ts` files re-export.
- Every file exporting runtime code has its spec next to it (the 100 % coverage thresholds enforce it); `internal/` helpers are tested through the public functions.
- No other barrel than the `index.ts` of each folder. Import a neighbour (`./clamp`) or another folder (`../math`), never a file inside another folder. A theme never imports another theme's `internal/` folder.
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
import { clamp } from '../math'; // another folder, through its index.ts
import type { Rgb } from './rgb'; // a neighbour

const MAX_CHANNEL = 255; // no comment: the name says it

/**
 * One short sentence saying what the function does, then, if needed, one saying when to use it or what
 * makes it special. Sentences start with a capital (or `code`) and end with a period.
 *
 * @template T - What the type parameter stands for.
 * @param value - What the parameter is: unit, range, accepted forms.
 * @param isInclusive - Boolean parameters read as questions. Defaults to `true`.
 * @returns What comes back, and in the edge cases it handles on purpose (`undefined`, `NaN`, empty).
 * @example
 * functionName(15, 0, 10); // 10
 * functionName(5, 0, 10, false); // 5
 */
export function functionName(value: number, isInclusive = true): number {
  …
}

// Private helpers stay in the file, after the exported function, without JSDoc: their name says what they do.
function helper(value: number): number {
  …
}
```

- **One exported function or class per file**, named like the file (`round-to-step.ts` → `roundToStep`), with the types and constants that belong to it; an enum goes in a `.enum.ts` file (`alarm-level.enum.ts` → `AlarmLevel`); a type shared by several files gets its own file (`rgb.ts` → `Rgb`).
- **JSDoc on exports only**, in this tag order: `@cached`, `@template`, `@param`, `@returns`, `@yields`, `@throws`, `@rejects`, `@example`. Every exported function or class has an `@example` with its result as a `// comment`. Constants, private helpers and `internal/` files get no comment: an explicit name is enough. No comment in the body either, unless a line cannot be understood without it.
- **Descriptions** are short sentences that say more than the name, written for developers: not "The matrix." but "The matrix to apply, such as the result of `parseTransform`.". One or two sentences; no long explanation.

### Naming

| Prefix                      | Returns                                                | Examples                                       |
| --------------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| `is…`, `has…`, `meets…`     | `boolean`                                              | `isBetween`, `hasSignificantChange`            |
| `get…`                      | a value computed from the arguments                    | `getSvgAnchorPoint`, `getContrastingTextColor` |
| `parse…`                    | a value from text, throws a `TypeError` when malformed | `parseTimeSpan`, `parseEnumValue`              |
| `format…`                   | a `string` for display                                 | `formatDecimal`, `formatNumber`                |
| `draw…`                     | writes the `d` of an SVG `<path>`                      | `drawSvgArc`, `drawSvgBarTicks`                |
| `reset…`                    | cancels a transform part without moving                | `resetSvgRotation`, `resetSvgFlip`             |
| `round…`, `floor…`, `ceil…` | a `number`                                             | `roundToStep`                                  |

- Plural parameters for lists (`items`, `values`, `points`); `min` / `max`, `from` / `to`, `start` / `end` for ranges; units in names when ambiguous (`deltaMs`, `angleDegrees`, `periodMs`).
- Decimals are `maxFractionDigits`.

### Parameters and results

- Pure functions whenever possible; classes only for stateful structures.
- Up to 3 or 4 positional parameters; beyond, an options object with its `…Options` interface, in the function's file, every field `readonly`, defaults destructured in the function (`const { budgetMs = 8 } = options;`).
- Parameters are readonly (`readonly T[]`, `readonly` fields): a utility never mutates its arguments and returns new objects.
- Callbacks are named for their role (`callback`, `keySelector`, `predicate`, `mapper`, `listener`).
- **Defaults in the signature** (`step = 1`, `locale = 'en-US'`, `anchor: Anchor = 'center'`) for the settings: precision, locale, anchor, random source, clock, options. The main operands (the value to format, the list to process, the element to move) stay required. The JSDoc ends the `@param` with "Defaults to `X`.".
- **No `null`**: a parameter is never typed `| null`. A caller holding a nullable value passes `value ?? undefined` to get the default.
- Time sources and randomness are parameters with a default (`now = () => performance.now()`, `random = Math.random`), so tests can pass fakes.
- Angles: 0° up and clockwise everywhere (SVG y axis down, compass headings).
- No magic numbers: module constants with explicit names (`MS_PER_SECOND`), without comment. A number in a default value is fine.

### Errors

- **Inputs are trusted**: the data reaching the UI is checked by the tests of its producer, and the UI is not exposed to the Internet. No argument validation (range, integer, empty list): a wrong argument is a bug to fix where the call is.
- A `parse…` function checks its text with the regular expression it needs anyway, and throws a single `TypeError` naming the expected format when it does not match: `` `digitsInfo must look like '1.0-3', got '${digitsInfo}'` ``. No other check.
- Async functions reject with `Error` instances; an `AbortSignal` parameter cancels them (`signal?.throwIfAborted()`).

### Caches

- Objects that are expensive to create (`Intl` formatters, segmenters) are cached inside the function.
- A cache of computed values lives inside the function when it always pays (the values of each enum, in a `WeakMap`); otherwise there is none. There is no `…Cached` variant.

### Adding a function

1. Write the file (template above) and its spec next to it (`it.for` tables, the edge cases the function handles on purpose).
2. Add the export to the folder's `index.ts` (a new folder also goes in `src/index.ts`).
3. Run `pnpm check`: it regenerates `README.md` and `docs/FUNCTIONS.md` from the JSDoc, then typechecks, lints and tests (100 % coverage).
4. A performance claim needs a benchmark in `benchmarks/` against the naive baseline.
5. Update `docs/SPEC.md` when the function answers a requirement or changes a decision.

## Tests (Vitest)

- Specs are `*.spec.ts` next to the tested file; `it`, never `test`. The SVG specs render real SVG in Chromium (`renderSvg` in `src/svg/testing/`).
- Vitest globals are enabled: do NOT import `describe`, `it`, `expect`, `vi` from `vitest`.
- `describe` title: the tested function or class (`describe(clamp, …)`); `it` titles in lowercase.
- Table-driven tests with `it.for([...])`; at most 5 `expect` per test; no conditional expects or tests; no `.only`, `.skip` or commented-out tests.
- Matchers: `toStrictEqual` over `toEqual`, `toHaveLength`, `toHaveBeenCalledOnce()`, `toBeInstanceOf()`.
- Mocks are typed: `vi.fn<(value: number) => void>()`. Timers: `vi.useFakeTimers()` in `beforeEach`, `vi.useRealTimers()` in `afterEach`.
- Coverage must stay at 100 % (lines, branches, functions, statements).

## Benchmarks

- `benchmarks/<module>.bench.ts`, importing the library by its name (`from 'utils'`, an alias of `src/index.ts`): `pnpm bench` runs them in Chromium through Playwright, where the functions run in the applications (`pnpm exec playwright install chromium` once).
- One `it` per comparison, with the test-context `bench` renamed `benchmark` (`bench` reads like the legacy test function of Vitest):

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
