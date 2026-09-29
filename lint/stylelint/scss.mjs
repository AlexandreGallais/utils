// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// SCSS (stylelint-config-standard-scss): the Sass-aware versions of the core rules, and no dead or risky Sass
// (`@use` with a namespace, no duplicate variable, no redundant nesting). Use it instead of nothing for .scss.

/**
 * SCSS rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function scssBlock() {
  return {
    extends: ['stylelint-config-standard-scss'],
    rules: {
      // Off: the SCSS-aware version below understands `$variables` and Sass functions.
      'declaration-property-value-no-unknown': null,
      'scss/declaration-property-value-no-unknown': true,
      'scss/function-no-unknown': true,
      'scss/at-mixin-no-risky-nesting-selector': true,
      'scss/at-root-no-redundant': true,
      'scss/at-use-no-redundant-alias': true,
      // `@use 'x' as x` is explicit; `as *` would hide where a variable comes from.
      'scss/at-use-no-unnamespaced': true,
      'scss/block-no-redundant-nesting': true,
      'scss/dimension-no-non-numeric-values': true,
      'scss/function-calculation-no-interpolation': true,
      'scss/no-duplicate-dollar-variables': true,
      'scss/no-duplicate-load-rules': true,
      'scss/no-unused-private-members': true,
      'scss/selector-no-redundant-nesting-selector': true,
      // Custom: `@use` / `@forward` only (Sass removes `@import`).
      'at-rule-disallowed-list': ['import'],
    },
  };
}
