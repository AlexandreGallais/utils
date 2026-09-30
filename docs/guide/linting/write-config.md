# Write the `eslint.config.mjs`

A workspace has **one root config** and **one config per project**, like an Angular workspace does. ESLint
lints each file with the nearest `eslint.config.mjs`:

```
eslint.config.mjs                 the root: typescript-node preset (Node mode: tool configs, scripts)
lint/                             copied from this repository
projects/
  shell/eslint.config.mjs         imports the root config + angular-app preset
  design-system/eslint.config.mjs imports the root config + angular-library preset (Storybook: an option)
  svg/eslint.config.mjs           imports the root config + typescript-browser preset (Storybook: an option)
```

- The **root** config lints everything around the projects in **Node mode**: Node globals and modules, the
  tools' default exports, imports with their extension (Node needs it), devDependencies, console output.
- A **project** config imports the root config and adds its preset: its **sources** switch to the **browser
  mode** (browser globals, no Node module, imports of a folder without extension, devDependencies only in the
  specs and stories), and get the framework rules (Angular) and Storybook if the project has it. The rest of the
  project folder (its tool configs, `.storybook/main.ts`) stays in Node mode.

The rules are the same everywhere: a preset only chooses the mode, adds the framework, and says whether the
code is a library.

## The presets

| Preset (`lint/eslint/presets/`) | Where                                           | Options                                                                                             |
| ------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `typescript-node.mjs`           | The root of the workspace.                      | `tsconfigRootDirectory`                                                                             |
| `typescript-browser.mjs`        | A TypeScript project for the browser (SVG lib). | `rootConfig`, `sourceFiles`, `developmentDependencyFiles`, `isLibrary`, `storybookPackageDirectory` |
| `angular-library.mjs`           | An Angular library (a product).                 | `rootConfig`, `sourceFiles`, `developmentDependencyFiles`, `prefix`, `storybookPackageDirectory`    |
| `angular-app.mjs`               | An Angular application (a program: the shell).  | `rootConfig`, `sourceFiles`, `developmentDependencyFiles`, `prefix`                                 |

Every preset also takes `overrides`. `lint/examples/` has a ready-to-copy config for each:
`workspace-root`, `angular-app`, `angular-library`, `typescript-browser` (`<name>.eslint.config.mjs`).

A single package (this repository, the example design system) writes both in one file: the root config in a
constant, passed as `rootConfig` to the project preset (see this repository's `eslint.config.mjs` below).

## Set up a workspace

1. Copy the `lint/` folder of this repository to the root of the workspace.
2. Install the tools, at the exact versions of this repository (`package.json`):

   ```sh
   pnpm add -D eslint typescript-eslint eslint-plugin-import-x eslint-import-resolver-typescript \
     eslint-plugin-sonarjs prettier eslint-plugin-prettier eslint-config-prettier globals
   pnpm add -D angular-eslint            # Angular projects
   pnpm add -D eslint-plugin-storybook   # projects with Storybook
   ```

3. Copy `workspace-root.eslint.config.mjs` to the root as `eslint.config.mjs`, and the example of each
   project to its folder as `eslint.config.mjs`; fix the import paths (`./lint/index.mjs` at the root,
   `../../eslint.config.mjs` and `../../lint/index.mjs` in a project). `lint/index.mjs` re-exports every preset:
   `import { angularLibraryPreset } from '../../lint/index.mjs'`.
4. Add the scripts, so that the command line never shows the [info rules](./index.md#error-warning-or-info):

   ```json
   {
     "scripts": {
       "lint": "ESLINT_INFO_RULES=off eslint . --max-warnings 0 --concurrency auto",
       "lint:fix": "ESLINT_INFO_RULES=off eslint . --fix",
       "lint:editor": "node lint/eslint/setup/editor-settings.mjs"
     }
   }
   ```

   On Windows, `shellEmulator: true` in `pnpm-workspace.yaml` lets pnpm run `VAR=value command`.

5. Run `pnpm lint:editor` once: VS Code then shows the info rules in blue.
6. Run `pnpm lint`, then `pnpm lint:fix` for what the autofix repairs.

## A project config, line by line

<<< @/../lint/examples/angular-library.eslint.config.mjs

## The options

### `tsconfigRootDirectory` (root)

The folder of the root `tsconfig.json`: always `import.meta.dirname` (the folder of the root config). The typed
rules (typescript-eslint) and the import resolver read the TypeScript projects from there.

### `rootConfig` (projects)

The root config: `import rootConfig from '../../eslint.config.mjs'`. The project preset starts from it, so a
file of the project gets every rule of the root, then the browser mode and the project's rules.

### `sourceFiles` (projects)

The project's sources, relative to its config: `['src/**/*.ts']`. They switch to the browser mode, and a file
exports **one function or class, named after the file** (`local/export-matches-filename`, a warning):
`format-count.ts` exports `formatCount`, `button.component.ts` exports `ButtonComponent`. Specs, test helpers,
stories and `index.ts` files are left out of that rule.

Only the exported functions and classes count: the types and constants that go with them stay in the same
file, exported or not.

```ts
// toto-id.ts: the branded type and the function that builds it, together.
export type TotoId = string & { readonly brand: unique symbol };

export function TotoId(value: string): TotoId {
  // …
}
```

Two exported functions (or classes) in one file, or a function that is not named after its file, is a
warning: it rarely makes sense, and when it does, the reason is written on the line. A function may be
PascalCase when it builds the type of the same name, like `TotoId` above.

### `developmentDependencyFiles` (projects)

`package.json` separates `dependencies` (shipped with the code) from `devDependencies` (tools: test runner,
Storybook, build). `import-x/no-extraneous-dependencies` refuses a devDependency imported by shipped code: it
would be missing for the users of a library. Among the sources, this option lists the files that **may** import
devDependencies because they are never shipped:

| Glob                 | Files                    |
| -------------------- | ------------------------ |
| `**/*.spec.ts`       | Specs (Vitest, Jasmine). |
| `**/testing/**`      | Test helpers.            |
| `**/*.stories.ts`    | Stories.                 |
| `**/.storybook/*.ts` | Storybook configuration. |

Outside the sources (tool configs, scripts), the Node mode allows devDependencies everywhere. `**` does not
enter dot folders: name them explicitly (`**/.storybook/*.ts`).

### `isLibrary` (typescript-browser)

A library exposes a generic API that sometimes needs `any` (a constructor type: `new (...parameters: any[]) =>
T`) or `void` in a union (a callback returning `T | void`): with `isLibrary: true`, writing them is free;
otherwise it is a warning, to justify where it is written. `angular-library` is a library, `angular-app` is
not. In every case, **using** an `any` value is an error (`no-unsafe-member-access`, `no-unsafe-call`…):
reading `data.name` on an untyped value because "we know it is there" breaks the typing. Type the value, or
narrow it (`Record<string, unknown>`, a type guard).

### `storybookPackageDirectory` (typescript-browser, angular-library)

The folder of the `package.json` that lists the Storybook addons, usually `import.meta.dirname`, or
`undefined` without Storybook. It turns the Storybook rules on for the project, and serves twice:

- `storybook/no-uninstalled-addons` checks that every addon named in `.storybook/main.ts` is installed in that
  `package.json` (otherwise a missing addon only shows when Storybook starts);
- stories and Storybook files may import the devDependencies of that `package.json`.

### `prefix` (Angular)

The selector prefix of the project (`ds-button`, `[dsTooltip]`).

Screen-reader accessibility and `@angular/localize` are not used (simulators, texts translated with
Transloco): their rules are off. What is odd anyway stays a warning: `autofocus`, a positive `tabindex`.

### `overrides`

The project's own configs, spread last: a relaxation for one folder, a different setting for one rule.

```js
overrides: [
  {
    name: 'my-app/generated',
    files: ['src/generated/**/*.ts'],
    rules: { '@typescript-eslint/naming-convention': ['off'] },
  },
],
```

Write them here rather than after the preset: the preset copies the level of every rule for the
disable-comment policy (a warning may be disabled, an error may not), and only sees the configs it receives.

This repository, a single package, writes its root config and its library in one file:

<<< @/../eslint.config.mjs

## What is fixed, whatever the preset

- **SonarJS** always runs, with the Sonar way profile of SonarQube ([Standards and SonarQube](./standards.md)).
- **In the browser sources**, a relative import names a neighbour file or a folder, **without extension**:
  `./format-count` (same folder) or `../atoms` (another folder, through the `index.ts` that re-exports what it
  shares), never `../atoms/button/button.component` (`local/import-folders`). Each folder has an `index.ts`:
  the rest of the folder stays private, and a file can move inside its folder without breaking any import.

  ```ts
  import { ButtonComponent } from '../../atoms'; // ✓ the folder
  import { formatCount } from './format-count'; // ✓ a neighbour
  import { ButtonComponent } from '../../atoms/button/button.component'; // ✗ a file of another folder
  ```

- **Paths are simplified on save**, like WebStorm's "Path can be simplified": when the index of a folder
  re-exports what an import takes, the autofix of `local/import-folders` rewrites the import through it,
  following nested `index.ts` files and turning a default import into the name the index gives it. In the
  sources, the deep import becomes the folder (`'../../atoms'`); in Node files, where a deep path stays
  allowed, the path goes through the index with its extension (`'./lint/index.mjs'`). If the index does not
  re-export the name yet, the import is reported and the export is added to the index by hand.

## Change a rule

A rule changes in its block (`lint/eslint/rules/<concept>.mjs`), with a comment that says why, never in a
project config: every project gets the same rules. A project config only picks its preset and adds `overrides` for its own folders. After changing which rules are `info`, run
`pnpm lint:editor` again.

To see what applies to a file, and which block set it:

```sh
pnpm exec eslint --inspect-config   # the config inspector, in the browser
pnpm exec eslint --print-config projects/shell/src/app/app.component.ts
```
