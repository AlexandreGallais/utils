// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Angular templates (.html files and inline templates): control flow, bindings, complexity. Accessibility and
// i18n rules are off here: they live in the angular-accessibility and angular-i18n blocks, enabled per project.

import angular from 'angular-eslint';

// angular-eslint is typed with typescript-eslint types, which ESLint's own types reject; it works at runtime.
const angularTemplatePlugin = /** @type {import('eslint').ESLint.Plugin} */ (
  /** @type {unknown} */ (angular.templatePlugin)
);

/**
 * Angular template rules, without accessibility and i18n.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function angularTemplateBlock() {
  return [
    {
      name: 'angular-template',
      files: ['**/*.html'],
      plugins: {
        '@angular-eslint/template': angularTemplatePlugin,
      },
      languageOptions: {
        parser: angular.templateParser,
      },
      rules: {
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/alt-text': ['off'],
        '@angular-eslint/template/attributes-order': ['error'],
        '@angular-eslint/template/banana-in-box': ['error'],
        '@angular-eslint/template/button-has-type': ['error'],
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/click-events-have-key-events': ['off'],
        '@angular-eslint/template/conditional-complexity': ['error'],
        // The count covers the whole template: past 5 branches, split into child components.
        '@angular-eslint/template/cyclomatic-complexity': ['error'],
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/elements-content': ['off'],
        '@angular-eslint/template/eqeqeq': ['error'],
        // Off: see the angular-i18n block.
        '@angular-eslint/template/i18n': ['off'],
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/interactive-supports-focus': ['off'],
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/label-has-associated-control': ['off'],
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/mouse-events-have-key-events': ['off'],
        '@angular-eslint/template/no-any': ['error'],
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/no-autofocus': ['off'],
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
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/no-positive-tabindex': ['off'],
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
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/role-has-required-aria': ['off'],
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/table-scope': ['off'],
        // Off: `@for` requires `track`, and *ngFor is forbidden by prefer-control-flow.
        '@angular-eslint/template/use-track-by-function': ['off'],
        // Off: see the angular-accessibility block.
        '@angular-eslint/template/valid-aria': ['off'],
      },
    },
    {
      name: 'angular-template/index-page',
      files: ['**/src/index.html'],
      rules: {
        // Angular requires this name for the application page.
        'check-file/no-index': ['off'],
      },
    },
  ];
}
