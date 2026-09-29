# Linting: overview

The lint configuration goes very far on purpose: the code is written by people with very different levels in
JavaScript, and the linters are the review that never gets tired. A rule that fires explains the problem at
the moment it is written, long before a bug or a code review.

To stay readable, the rules are split into **blocks**, one file per theme, and the blocks are assembled into
**profiles**, one per kind of project. A project config is then a few lines.

```
lint/
  eslint/        one block per theme: base, typescript, imports, angular, accessibility…
  stylelint/     one block per theme: base, scss, order, design-tokens, layers…
  profiles/      the blocks assembled per kind of project
examples/
  design-system/ an Angular library linted by the profiles (and checked by `pnpm lint:presets`)
```

## Pick a profile

| Project                                                                       | ESLint profile                                             | Stylelint profile  |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------ |
| TypeScript library, no framework (utilities, the SVG library)                 | `typescriptLibraryProfile`                                 | — (no styles)      |
| Angular library of features: design system, features, stores, back-end access | `angularLibraryProfile`                                    | `stylelintProfile` |
| Angular application (a program)                                               | `angularAppProfile`                                        | `stylelintProfile` |
| Storybook                                                                     | option `storybookPackageDirectory` of the Angular profiles | —                  |

An Angular library, as the example writes it:

<<< @/../examples/design-system/eslint.config.mjs

Its styles:

<<< @/../examples/design-system/stylelint.config.mjs

And this repository, a TypeScript library, adds only what is specific to it:

<<< @/../eslint.config.mjs

## The options are choices, not defaults

Like the functions of the library, a profile takes every option explicitly. Reading the config tells what is
checked:

| Option                      | Block                   | When to enable it                                                            |
| --------------------------- | ----------------------- | ---------------------------------------------------------------------------- |
| `isAccessible`              | `angular-accessibility` | The application is used by the public or by people with disabilities (WCAG). |
| `isTranslated`              | `angular-i18n`          | The texts are translated with `@angular/localize`.                           |
| `usesRxjs`                  | `rxjs`                  | The code still uses observables (HttpClient, router events).                 |
| `storybookPackageDirectory` | `storybook`             | The project has stories.                                                     |
| `isAccessible` (Stylelint)  | `accessibility`         | Same as above, for focus styles, reduced motion, readable texts.             |
| `usesLogicalProperties`     | `logical-properties`    | The layout must mirror for right-to-left languages.                          |

## Library or application: the escape hatches

Some code needs an exception. A constructor type, for instance, needs `any[]` for its parameters (a narrower
type would reject the constructors with typed parameters, by contravariance). The policy:

- **Everywhere**, an exception is `// eslint-disable-next-line <rule> -- <reason>`: one line, named rules, a
  reason. File-wide disables are forbidden, and a disable that is no longer needed is an error.
- **In a library**, a justified disable is accepted: generic code sometimes needs `any` or an assertion.
- **In an application**, the unsafe rules are **locked**: `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
  is itself an error, whatever the reason. The code is fixed instead.

<<< @/../lint/eslint/app.mjs

`pnpm lint:presets` checks exactly this: the same justified `any` passes the library profile and is refused
by the application profile.

## Read a rule

Every rule of every plugin is listed, so that a new version of a plugin never enables or disables a rule
silently. The comment above a rule says why it is not the plugin's default:

- `// Custom:` a project choice (an option, a stricter setting);
- `// Off:` disabled on purpose, with the reason (often: a duplicate of a better rule);
- `// Deprecated:` replaced by another rule.

To see what applies to a file, and which block set it:

```sh
pnpm exec eslint --inspect-config   # opens the config inspector in the browser
pnpm exec eslint --print-config src/math/clamp.ts
```

Every block has a `name` (`angular`, `app/locked-rules`, `architecture`…), shown by the inspector.

## Commands

| Command             | What it does                                                                        |
| ------------------- | ----------------------------------------------------------------------------------- |
| `pnpm lint`         | ESLint on the whole repository, in parallel (`--concurrency auto`).                 |
| `pnpm lint:cached`  | The same, skipping unchanged files (see [Performance](./performance.md)).           |
| `pnpm lint:fix`     | Fixes what can be fixed automatically (order, formatting, simple rewrites).         |
| `pnpm lint:css`     | Stylelint on every `.scss` file.                                                    |
| `pnpm lint:presets` | Lints the example with its profiles and checks that each block catches its mistake. |
