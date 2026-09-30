# Old projects (ESLint 8)

An Angular 18 project on ESLint 8 cannot use the flat configs of `lint/eslint/`. `lint/legacy/angular-18.eslintrc.json`
gives it the same rules and the same levels, in the old format, in one file to paste as `.eslintrc.json`.

- **Generated** from the Angular application preset, and **checked** with ESLint 8.57.1, typescript-eslint 8
  and angular-eslint 18.4: every rule exists in those versions and every option is valid. The settings that
  came in later versions are adapted, with a comment (OnPush is required explicitly: it is not the default
  before Angular 22).
- **The levels**: errors, then warnings, then the infos, off (ESLint 8 has no info level: set one to `"warn"` to
  see it), then the rules off on purpose. Each rule keeps its comment (`.eslintrc.json` accepts comments).
- **Specs** relax the warnings and the hacks (`any`, `!`), like the flat configs.
- **Inline templates** are linted with the `*.html` rules (`@angular-eslint/template/extract-inline-html`).
- **Not included**: SonarJS, import-x, Prettier and the rules written here (file names, one export per file,
  folder imports, disable comments only on warnings): their plugins are not installed in those projects.

It needs `eslint` 8.57, `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` 8,
`@angular-eslint/eslint-plugin`, `@angular-eslint/eslint-plugin-template` and `@angular-eslint/template-parser` 18.
