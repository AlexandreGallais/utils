# ESLint blocks

Each block is a function in `lint/eslint/` returning named flat config objects. Spread them in
`defineConfig([…])`: the order matters, a later block overrides an earlier one (the profiles already use the
right order). The blocks are grouped by **what they lint**, and the code rules by **concept**, whatever the
plugin: `code/conditions` holds the rules of ESLint, SonarJS and Unicorn about conditions.

| Folder        | Files                    | Blocks                                                                                                          |
| ------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `setup/`      | —                        | `files` (shared globs), `javascript` (linter options, globals), `typescript` (parser, types)                    |
| `code/`       | JS + TS                  | one block per concept (below), plus `imports`, `file-names`, `jsdoc`, `regexp`, `prettier`, `eslint-directives` |
| `templates/`  | HTML (Angular templates) | `angular-template`, `angular-accessibility`, `angular-i18n`                                                     |
| `frameworks/` | TS                       | `angular`, `angular-i18n`, `ngrx-signals`, `rxjs`, `storybook`                                                  |
| `tests/`      | specs, benchmarks        | `vitest`                                                                                                        |
| `node/`       | configs, scripts         | `tooling`: Node APIs and default exports allowed                                                                |
| `project/`    | depends                  | `app` (locked rules), `architecture` (atomic design), `compat` (browsers), `one-function-per-file`              |

The concepts of `code/`: `conditions`, `loops`, `functions`, `classes`, `objects-and-collections`, `arrays`,
`strings`, `regular-expressions`, `numbers`, `types`, `variables`, `async`, `errors`, `modules`, `naming`,
`comments`, `complexity`, `dead-code`, `security`, `browser-apis`, `node-apis`, `test-code`, `modern-syntax`,
`formatting`, `other-frameworks`. Each concept file exports two configs: `code/<concept>` for every code file
(core, SonarJS and Unicorn rules, under `// ---- Plugin ----` headers) and `code/<concept>/typescript` for the
TypeScript files (typescript-eslint rules, and the core rules they replace turned off).

Every rule, its setting and its reason is listed in the [rule reference](/lint-rules/), generated from these
files.

## Profiles

One profile per file in `lint/profiles/`; a project imports one and passes its options:

| Profile                         | For                                               | Adds                                      |
| ------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| `eslint-core.mjs`               | any TypeScript project                            | setup, `code/`, `tests/`, `node/`         |
| `eslint-typescript-library.mjs` | a TypeScript library (this repository, a SVG lib) | `code/jsdoc` on the public API            |
| `eslint-angular-common.mjs`     | shared by the two Angular profiles                | `frameworks/`, `templates/`, architecture |
| `eslint-angular-library.mjs`    | an Angular library of features                    | —                                         |
| `eslint-angular-app.mjs`        | an Angular application                            | `project/app`, `project/compat`           |
| `stylelint.mjs`                 | SCSS of a design system                           | every block of `lint/stylelint/`          |

## Cost

Typed rules (typescript-eslint, `rxjs`) need the TypeScript program: they are the **high** cost of a lint.
`import-x/no-cycle` follows every import (medium). The other blocks are cheap. See [Performance](./performance.md).

## architecture: atomic design

The layers of a design system library and of its features, by folder name. A layer imports only the layers
below it; utils (pure functions) and models (shared types) are allowed everywhere; only `data-access` may use
`HttpClient`.

<<< @/../lint/eslint/project/architecture.mjs

See [Atomic design](../css/atomic-design.md) for what goes in each layer.

## Angular: frameworks/ and templates/

Angular is split in four so that a project enables what it needs. The template block turns the
accessibility and i18n rules **off**, and the two dedicated blocks turn them **on**:

<<< @/../lint/eslint/templates/angular-accessibility.mjs

## code/security

<<< @/../lint/eslint/code/security.mjs
