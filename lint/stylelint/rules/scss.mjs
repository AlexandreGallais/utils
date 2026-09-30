// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// SCSS (stylelint-scss): `@use`, variables, mixins, placeholders, operators.

import scssPlugins from 'stylelint-scss';

/**
 * Scss rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function scssBlock() {
  return {
    plugins: scssPlugins,
    rules: {
      'scss/at-each-key-value-single-line': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/at-else-closing-brace-newline-after': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/at-else-closing-brace-space-after': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/at-else-empty-line-before': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/at-else-if-parentheses-space-before': null,
      // Off: a notation choice, not a mistake.
      'scss/at-extend-no-missing-placeholder': null,
      'scss/at-function-named-arguments': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/at-function-parentheses-space-before': null,
      // Off: a naming convention the code review is enough for.
      'scss/at-function-pattern': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/at-if-closing-brace-newline-after': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/at-if-closing-brace-space-after': null,
      // Off: a notation choice, not a mistake.
      'scss/at-if-no-null': null,
      'scss/at-import-partial-extension-allowed-list': null,
      'scss/at-import-partial-extension-disallowed-list': null,
      // Off: a notation choice, not a mistake.
      'scss/at-mixin-argumentless-call-parentheses': null,
      'scss/at-mixin-named-arguments': null,
      'scss/at-mixin-no-risky-nesting-selector': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/at-mixin-parentheses-space-before': null,
      // Off: a naming convention the code review is enough for.
      'scss/at-mixin-pattern': null,
      'scss/at-root-no-redundant': null,
      // Off: a notation choice, not a mistake.
      'scss/at-rule-conditional-no-parentheses': null,
      'scss/at-rule-no-unknown': true,
      'scss/at-use-no-redundant-alias': null,
      'scss/at-use-no-unnamespaced': null,
      'scss/block-no-redundant-nesting': null,
      // Off: a notation choice, not a mistake.
      'scss/comment-no-empty': null,
      'scss/comment-no-loud': null,
      'scss/declaration-nested-properties': null,
      'scss/declaration-nested-properties-no-divided-groups': true,
      'scss/declaration-property-value-no-unknown': null,
      'scss/dimension-no-non-numeric-values': null,
      'scss/dollar-variable-colon-newline-after': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/dollar-variable-colon-space-after': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/dollar-variable-colon-space-before': null,
      'scss/dollar-variable-default': null,
      'scss/dollar-variable-empty-line-after': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/dollar-variable-empty-line-before': null,
      'scss/dollar-variable-first-in-block': null,
      'scss/dollar-variable-no-missing-interpolation': true,
      'scss/dollar-variable-no-namespaced-assignment': null,
      // Off: a naming convention the code review is enough for.
      'scss/dollar-variable-pattern': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/double-slash-comment-empty-line-before': null,
      'scss/double-slash-comment-inline': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/double-slash-comment-whitespace-inside': null,
      'scss/function-calculation-no-interpolation': null,
      'scss/function-color-channel': null,
      'scss/function-color-relative': null,
      'scss/function-disallowed-list': null,
      'scss/function-no-unknown': null,
      // Off: a notation choice, not a mistake.
      'scss/function-quote-no-quoted-strings-inside': null,
      // Off: a notation choice, not a mistake.
      'scss/function-unquote-no-unquoted-strings-inside': null,
      // Off: a notation choice, not a mistake.
      'scss/load-no-partial-leading-underscore': null,
      // Off: a notation choice, not a mistake.
      'scss/load-partial-extension': null,
      'scss/map-keys-quotes': null,
      'scss/media-feature-value-dollar-variable': null,
      'scss/no-dollar-variables': null,
      'scss/no-duplicate-dollar-variables': null,
      'scss/no-duplicate-load-rules': null,
      'scss/no-duplicate-mixins': true,
      'scss/no-global-function-names': true,
      'scss/no-unused-private-members': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/operator-no-newline-after': null,
      // Off: formatting, checked by prettier/prettier.
      'scss/operator-no-newline-before': null,
      'scss/operator-no-unspaced': true,
      'scss/partial-no-import': null,
      // Off: a naming convention the code review is enough for.
      'scss/percent-placeholder-pattern': null,
      'scss/property-no-unknown': null,
      'scss/selector-class-pattern': null,
      'scss/selector-nest-combinators': null,
      'scss/selector-no-redundant-nesting-selector': null,
      'scss/selector-no-union-class-name': null,
    },
  };
}
