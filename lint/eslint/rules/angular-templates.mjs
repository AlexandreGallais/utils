// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Angular templates (.html files and inline templates): control flow, bindings, complexity. Screen-reader
// accessibility and @angular/localize are not used (simulators, Transloco): their rules are off, except what is
// odd anyway (`autofocus`, a positive `tabindex`).

import angular from 'angular-eslint';
import local from './local/plugin.mjs';

// angular-eslint is typed with typescript-eslint types, which ESLint's own types reject; it works at runtime.
const angularTemplatePlugin = /** @type {import('eslint').ESLint.Plugin} */ (
  /** @type {unknown} */ (angular.templatePlugin)
);

/**
 * Angular template rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function angularTemplateBlock() {
  return [
    {
      name: 'rules/angular-templates',
      files: ['**/*.html'],
      plugins: {
        '@angular-eslint/template': angularTemplatePlugin,
      },
      languageOptions: {
        parser: angular.templateParser,
      },
      rules: {
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/alt-text': ['off'],
        '@angular-eslint/template/attributes-order': ['error'],
        '@angular-eslint/template/banana-in-box': ['error'],
        '@angular-eslint/template/button-has-type': ['error'],
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/click-events-have-key-events': ['off'],
        '@angular-eslint/template/conditional-complexity': ['error'],
        // The count covers the whole template: past 5 branches, split into child components.
        '@angular-eslint/template/cyclomatic-complexity': ['error'],
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/elements-content': ['off'],
        '@angular-eslint/template/eqeqeq': ['error'],
        // Off: the texts are translated with Transloco, not @angular/localize.
        '@angular-eslint/template/i18n': ['off'],
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/interactive-supports-focus': ['off'],
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/label-has-associated-control': ['off'],
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/mouse-events-have-key-events': ['off'],
        '@angular-eslint/template/no-any': ['error'],
        // Warn: `autofocus` moves the focus without warning; justify it where the focus must start there.
        '@angular-eslint/template/no-autofocus': ['warn'],
        // Off: reading a signal is a call (`count()`); derived values belong in computed().
        '@angular-eslint/template/no-call-expression': ['off'],
        // Kept despite its accessibility tag: forbids the obsolete `<marquee>` and `<blink>`.
        '@angular-eslint/template/no-distracting-elements': ['error'],
        '@angular-eslint/template/no-duplicate-attributes': ['error'],
        '@angular-eslint/template/no-empty-control-flow': ['error'],
        // Custom: `[style.x]` only with a dynamic value (a constant belongs in a class); ngStyle is forbidden.
        '@angular-eslint/template/no-inline-styles': ['error', { allowBindToStyle: 'dynamic' }],
        '@angular-eslint/template/no-interpolation-in-attributes': ['error'],
        '@angular-eslint/template/no-negated-async': ['error'],
        '@angular-eslint/template/no-nested-tags': ['error'],
        '@angular-eslint/template/no-non-null-assertion': ['error'],
        '@angular-eslint/template/no-outerhtml': ['error'],
        // Warn: a positive `tabindex` breaks the natural keyboard order; justify it where it is needed.
        '@angular-eslint/template/no-positive-tabindex': ['warn'],
        '@angular-eslint/template/prefer-at-else': ['error'],
        '@angular-eslint/template/prefer-at-empty': ['error'],
        '@angular-eslint/template/prefer-built-in-pipes': ['error'],
        '@angular-eslint/template/prefer-class-binding': ['error'],
        '@angular-eslint/template/prefer-contextual-for-variables': ['error'],
        '@angular-eslint/template/prefer-control-flow': ['error'],
        '@angular-eslint/template/prefer-ngsrc': ['error'],
        '@angular-eslint/template/prefer-self-closing-tags': ['error'],
        '@angular-eslint/template/prefer-static-string-properties': ['error'],
        '@angular-eslint/template/prefer-style-binding': ['error'],
        '@angular-eslint/template/prefer-template-literal': ['error'],
        '@angular-eslint/template/require-switch-default': ['error'],
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/role-has-required-aria': ['off'],
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/table-scope': ['off'],
        // Off: `@for` requires `track`, and *ngFor is forbidden by prefer-control-flow.
        '@angular-eslint/template/use-track-by-function': ['off'],
        // Off: screen-reader accessibility is not required (simulators, no assistive technology).
        '@angular-eslint/template/valid-aria': ['off'],
      },
    },
    {
      name: 'rules/angular-templates/file-names',
      files: ['**/*.html'],
      plugins: {
        local,
      },
      rules: {
        // Custom: kebab-case files and folders, like the TypeScript files (rules/file-names).
        'local/kebab-case-path': ['error'],
      },
    },
  ];
}
