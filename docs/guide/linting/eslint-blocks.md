# ESLint blocks

Each block is a function in `lint/eslint/` returning flat config objects. Spread them in `defineConfig([…])`:
the order matters, a later block overrides an earlier one (the profiles already use the right order).

| Block                   | Plugin            | What it checks                                                                           | Cost                                     |
| ----------------------- | ----------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------- |
| `base`                  | ESLint            | Possible bugs and bad practices of JavaScript; stale disable comments                    | low                                      |
| `typescript`            | typescript-eslint | Types: no `any`, no unsafe call or assignment, promises awaited, strict booleans, naming | **high** (builds the TypeScript program) |
| `imports`               | import-x          | Declared dependencies, no cycle, order, no default export                                | medium (`no-cycle` follows every import) |
| `naming`                | check-file        | kebab-case files and folders, no `index` barrel                                          | low                                      |
| `sonar`                 | SonarJS           | SonarQube rules: bugs, complexity, duplicated strings, security hotspots                 | medium                                   |
| `unicorn`               | Unicorn           | Modern and consistent JavaScript (300 rules)                                             | low per rule                             |
| `regexp`                | regexp            | Correct and efficient regular expressions                                                | low                                      |
| `jsdoc`                 | jsdoc             | Documented public API: sentences, `@param`, `@returns`, `@example`                       | medium                                   |
| `vitest`                | Vitest            | Specs: titles, matchers, no skipped test                                                 | low                                      |
| `prettier`              | Prettier          | Formatting                                                                               | medium                                   |
| `comments`              | eslint-comments   | One-line disables with a reason                                                          | low                                      |
| `tooling`               | —                 | Node configs and scripts may use Node and default exports                                | —                                        |
| `security`              | no-unsanitized    | No dynamic HTML injected (XSS), no sanitizer bypass                                      | low                                      |
| `angular`               | angular-eslint    | Components, signals, inject(), OnPush, standalone, lifecycle                             | low                                      |
| `angular-template`      | angular-eslint    | Templates: control flow, bindings, complexity                                            | low                                      |
| `angular-accessibility` | angular-eslint    | WCAG in templates: alt texts, keyboard, labels, ARIA                                     | low                                      |
| `angular-i18n`          | angular-eslint    | Every text marked for translation                                                        | low                                      |
| `ngrx-signals`          | @ngrx             | Signal stores: protected state, no array at the root                                     | low                                      |
| `rxjs`                  | rxjs-x            | Leaks, lost errors, nested subscriptions                                                 | medium (typed)                           |
| `architecture`          | boundaries        | Atomic design layers: what may import what                                               | low                                      |
| `storybook`             | storybook         | Stories in the Component Story Format                                                    | low                                      |
| `app`                   | eslint-comments   | Unsafe rules cannot be disabled                                                          | —                                        |
| `compat`                | compat            | Web APIs supported by the target browsers                                                | low                                      |

## base

The core rules of ESLint, every one listed: possible problems (`no-unsafe-finally`, `no-self-compare`…)
and suggestions (`eqeqeq`, `curly`, `no-param-reassign`…). The `linterOptions` report a stale
`eslint-disable` or inline config as an error.

## typescript

The strictest settings of typescript-eslint, with type information: no `any` (`no-explicit-any`,
`no-unsafe-*`), no floating promise, booleans compared explicitly (`strict-boolean-expressions`), readonly
parameters, explicit return types and member accessibility, and the naming convention
(`@typescript-eslint/naming-convention`: camelCase, PascalCase types, UPPER_CASE constants, no `I` prefix).

## imports

- Every package imported is declared in the nearest `package.json`; devDependencies only in the files listed
  by the project (specs, stories, tool configs).
- No import cycle, no relative import into another package, no default export (named exports are easier to
  search and rename).
- Import order: packages, then relative files; `import type` on its own line.

## architecture: atomic design

The layers of a design system library and of its features, by folder name. A layer imports only the layers
below it; utils (pure functions) and models (shared types) are allowed everywhere; only `data-access` may use
`HttpClient`.

<<< @/../lint/eslint/architecture.mjs

See [Atomic design](../css/atomic-design.md) for what goes in each layer.

## angular, angular-template, angular-accessibility, angular-i18n

Angular is split in four so that a project enables what it needs. The template block turns the
accessibility and i18n rules **off**, and the two dedicated blocks turn them **on**:

<<< @/../lint/eslint/angular-accessibility.mjs

## security

<<< @/../lint/eslint/security.mjs
