# Blocks and rules

Each block is a function in `lint/eslint/` returning named flat config objects. The presets spread them in
the right order (a later block overrides an earlier one); a project only imports a preset.

## Rules, by concept

`lint/eslint/rules/` holds the rules of ESLint, typescript-eslint, SonarJS and import-x, **one file per concept**, so
that a rule is found by what it checks, not by its plugin. Each concept file exports two configs:
`rules/<concept>` for every JavaScript and TypeScript file, and `rules/<concept>/typescript` for the
TypeScript files (the typescript-eslint rules, and the core rules they replace turned off).

| Concept                                        | What it checks                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| `async`                                        | Promises, async / await, timers: nothing floating, nothing forgotten.  |
| `browser-apis`                                 | DOM, events, web APIs and the console.                                 |
| `classes`                                      | Constructors, members, accessors, `this`, inheritance.                 |
| `comments`                                     | Warning comments (TODO), comment style.                                |
| `complexity`                                   | Size and nesting limits (warnings).                                    |
| `conditions`                                   | if / else, ternaries, booleans, equality, exhaustive switches.         |
| `dead-code`                                    | Unused variables, unreachable code, useless statements.                |
| `errors`                                       | Throwing `Error` instances, catching, rejecting.                       |
| `functions`                                    | Declarations, parameters, return values, callbacks.                    |
| `loops`                                        | `for`, `for…of`, `while`, iteration.                                   |
| `modern-syntax`                                | Spread, destructuring, template literals, `const`.                     |
| `modules`                                      | import / export, no `require`, private `internal/` folders.            |
| `naming`                                       | The naming convention (camelCase, PascalCase types, UPPER_CASE).       |
| `numbers`                                      | Magic numbers, `NaN`, parsing, precision.                              |
| `objects-and-collections`, `arrays`, `strings` | Methods and literals of each data type.                                |
| `regular-expressions`                          | Valid, readable patterns with the `v` flag and named groups.           |
| `security`                                     | `eval`, implied eval, sanitizer bypasses.                              |
| `types`                                        | No `any`, no `!`, assertions, type definitions.                        |
| `variables`                                    | Declarations, shadowing, globals.                                      |
| `formatting`                                   | Prettier, and the few layout rules outside it.                         |
| `imports`                                      | import-x: declared dependencies, **no cycle**, order, folder imports.  |
| `file-names`                                   | Kebab-case files and folders (`local/`).                               |
| `exports`                                      | One exported function or class per source file (`local/`).             |
| `disable-comments`                             | The policy of the `eslint-disable` comments (`local/`).                |
| `test-code`                                    | SonarJS test rules, and the relaxations specs and benchmarks need.     |
| `node-apis`, `other-frameworks`                | SonarJS rules on Node APIs, and on frameworks not used here (all off). |

## SonarJS, in the same files

The SonarJS rules sit in the concept files too, under `// ---- SonarJS ----`: the **Sonar way** profile of
SonarQube is on, the other rules are off (`Off: not in the Sonar way profile`). A SonarJS rule that duplicates a
core rule stays off (`Off: duplicate of …`): the code already meets it, and a mistake gives one message, not
two. The few SonarJS rules that measure differently (cognitive complexity instead of `complexity`) replace
the core rule, which is off (`Off: replaced by sonarjs/…`). See [Standards and SonarQube](./standards.md).

## Modes, library, frameworks

These blocks sit in `lint/eslint/rules/` too; the presets choose them:

| Block                | Added by                                                 | What it does                                                                                |
| -------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `node`               | `typescript-node` (the root)                             | Node globals and modules, tool default exports, imports with extension, devDependencies.    |
| `browser`            | every project preset, on `sourceFiles`                   | Browser globals, no Node module, folder imports without extension, no stray console.        |
| `library`            | `angular-library`, `typescript-browser` with `isLibrary` | `any` and `void` free in a generic API.                                                     |
| `angular-components` | `angular-library`, `angular-app`                         | Components, directives, pipes, services, signals, `inject()`, OnPush.                       |
| `angular-templates`  | `angular-library`, `angular-app`                         | Control flow, bindings, complexity of the templates; accessibility and i18n off.            |
| `storybook`          | `storybookPackageDirectory`                              | Only what breaks a story or lies in a test; default exports and PascalCase stories allowed. |

Screen-reader accessibility and `@angular/localize` are not used (simulators, texts translated with
Transloco): their rules are listed and off, except what is odd anyway (`autofocus`, a positive `tabindex`:
warnings).

## The rules written here

`lint/eslint/rules/local/` is a small plugin for what no plugin does the way the presets need:

| Rule                            | What it checks                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| `local/kebab-case-path`         | Kebab-case files and folders; dots separate words, dot folders are skipped.              |
| `local/export-matches-filename` | One exported function or class per file, named after it (a warning); its types may stay. |
| `local/import-folders`          | Imports through a folder's index: required in the sources, simplified on save (autofix). |
| `local/disable-only-warnings`   | An `eslint-disable` names its rules, and only rules set to `warn`.                       |
| `local/disable-reason`          | A reason after `--` (a warning).                                                         |
| `local/disable-next-line-only`  | Only `eslint-disable-next-line`; no block or file disable, no inline config.             |

<<< @/../lint/eslint/rules/local/disable-only-warnings.mjs

## Remove a plugin

A project that does not want a plugin removes it after its preset, by keyword, with
`setup/without-plugins.mjs`: `withoutPlugins(angularPreset({ … }), ['sonarjs'])`. The rules turned off because
the removed plugin covered them come back on, so nothing is left unchecked.
