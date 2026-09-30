# Linting: overview

The lint catches mistakes at the moment they are written, long before a bug or a code review. It is strict,
but it **makes people responsible rather than blocking them**: an error is a real mistake and cannot be
disabled; a warning is a good practice that can be set aside for one line, with a reason; an info is a
suggestion that never blocks.

```
lint/
  eslint/
    presets/      typescript-node (the root), typescript-browser, angular-library, angular-app (the projects)
    rules/        one file per concept (conditions, async, naming…): ESLint + typescript-eslint + SonarJS +
                  import-x; plus node, browser, library, exports, angular-components, angular-templates,
                  storybook; local/ holds the rules written here
    setup/        file globs, parsers, the info level, the severity mirror, editor-settings.mjs
  stylelint/      the SCSS rules, same principle (see Stylelint)
  legacy/         angular-18.eslintrc.json: the same rules for an old project (ESLint 8, .eslintrc.json)
  examples/       an eslint.config.mjs for a workspace root and for each kind of project, a stylelint.config.mjs
examples/
  design-system/  an Angular library linted by the presets (and checked by `pnpm lint:presets`)
```

Stylelint follows the same principle: see [Stylelint](./stylelint.md).

## Plugins

| Plugin                                                    | Why                                                            |
| --------------------------------------------------------- | -------------------------------------------------------------- |
| ESLint core                                               | The JavaScript mistakes and bad practices, every rule listed.  |
| typescript-eslint (+ parser)                              | Types: no unsafe `any`, promises awaited, strict booleans.     |
| SonarJS                                                   | Always: the code is analysed by SonarQube (Sonar way profile). |
| import-x (+ TypeScript resolver)                          | Declared dependencies, **no import cycle**, import order.      |
| Prettier (eslint-plugin-prettier, eslint-config-prettier) | Formatting.                                                    |
| angular-eslint                                            | The Angular presets: components and templates.                 |
| Storybook                                                 | A project with Storybook (`storybookPackageDirectory`).        |
| `local` (lint/eslint/rules/local/)                        | Written here: file names, exports, imports, disable comments.  |

The core rules of ESLint need no package of their own (`@eslint/js` only holds a `recommended` list): every
core rule is listed in `lint/eslint/rules/`, under `// ---- ESLint ----`, next to the SonarJS rules of the same
concept (`// ---- SonarJS ----`). A SonarJS rule that checks the same thing as a core rule stays off
(`Off: duplicate of …`): the core rule is faster, and a mistake gives one message. Where SonarJS measures
differently (cognitive complexity instead of `complexity`), SonarJS wins, like SonarQube (`Off: replaced by
sonarjs/…` on the core rule).

To start a workspace: a root config and one config per project, see [Write the config](./write-config.md).

## Error, warning or info

Each rule has one of three levels, by one principle:

| Level   | What it is                                                                                     | Shown                            | Disable it?                            |
| ------- | ---------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------- |
| `error` | A **real mistake** (a bug, a broken type, a security hole), or a **style the autofix applies** | Editor (red) and command line    | Never: the comment itself is an error. |
| `warn`  | A **good practice without autofix** that improves the code, or a rule that may limit a need    | Editor (yellow) and command line | For one line, with a reason.           |
| `info`  | A **suggestion**: "this could also be written…", good to know, never required                  | Editor only (blue)               | No need: it never blocks.              |

The rule's own metadata decides first between error and warning (`problem` = a mistake, `fixable` = the
autofix applies); a few rules are placed by hand, with the reason written above them (`// Warn: …`). The
`info` rules are chosen by hand. A rule that SonarQube's Sonar way profile counts on is never `info`: it would
be off on the command line, and SonarQube would report it.

ESLint itself only knows `off`, `warn` and `error`. A block writes `['info']`, and the presets turn it into
`off` on the command line (`ESLINT_INFO_RULES=off`, set by `pnpm lint`) and into a warning in the editor,
which VS Code shows in blue once `pnpm lint:editor` has listed the info rules in `.vscode/settings.json`
(`eslint.rules.customizations`).

**Specs, test helpers, benchmarks and stories** are tests and documentation: one must be able to hack in them
to get a test or a story done. There, every warning becomes an info, and so do the rules that forbid the usual
hacks (`any`, `!`, unsafe assertions); the errors stay (a bug, a style the autofix applies), and so do the
SonarJS rules and the rules that stand for them, since SonarQube analyses the specs too
(`setup/relax-tests-and-stories.mjs`).

`examples/lint-levels/levels.mjs` shows the three levels: open it in the editor. VS Code shows the infos in blue
once `pnpm lint:editor` has run; WebStorm has no info level and shows them as warnings. `pnpm lint` skips that
folder (`--ignore-pattern`), since its mistakes are on purpose.

A warning is silenced like this, and only like this:

```ts
// eslint-disable-next-line no-console -- the command-line output.
console.info(report);
```

The `local/` rules enforce it: only `eslint-disable-next-line` (no block or file disable, no inline config),
the rules named, only rules set to `warn`, and a reason after `--` (a warning otherwise). A disable that is no
longer needed is an error. With `--max-warnings 0` in the CI, a warning is either fixed or justified.

To know the level of each rule for each file, the presets copy it into the settings of the config
(`setup/rule-severities.mjs`); this is why a project adds its own configs through the `overrides` option.

## File names, exports and imports

- Files and folders are **kebab-case** (`user-list/user-list.component.ts`); the dots of a file name separate
  kebab-case words. Dot folders imposed by tools (`.storybook/`) are skipped.
- A source file exports **one function or class, named after the file** (a warning): `format-count.ts`
  exports `formatCount`, `button.component.ts` exports `ButtonComponent`; its types and constants stay with it.
- A relative import names a neighbour file or a folder (its `index.ts`), without extension; the autofix
  simplifies a path an index allows, on save.

## Read a rule

Every rule of every plugin is listed, so that a new version of a plugin never enables or disables a rule
silently. The comment above a rule gives the reason: `// Custom:` a project choice, `// Off:` disabled on
purpose (often a duplicate of a rule of another plugin), `// Deprecated:` replaced, `// Warn:` the exception
that justifies disabling it. The [rule reference](/lint-rules/) lists them all, with what each rule checks.

## Commands

| Command             | What it does                                                                       |
| ------------------- | ---------------------------------------------------------------------------------- |
| `pnpm lint`         | ESLint on the whole repository, in parallel, info rules off: errors fail.          |
| `pnpm lint:strict`  | The same, warnings fail too (a merge request to `main`, see [CI](./ci.md)).        |
| `pnpm lint:css`     | Stylelint on every `.scss` file (`lint:css:strict`: warnings fail too).            |
| `pnpm lint:cached`  | The same, skipping unchanged files (see [Performance](./performance.md)).          |
| `pnpm lint:fix`     | Fixes what can be fixed automatically (order, formatting, simple rewrites).        |
| `pnpm lint:editor`  | Lists the info rules in `.vscode/settings.json`, so that VS Code shows them blue.  |
| `pnpm lint:presets` | Lints the example with the presets and checks that each block catches its mistake. |
