// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// At-rules: `@media`, `@import`, `@layer`, `@container` and the other at-rules.

/**
 * At rules rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function atRulesBlock() {
  return {
    rules: {
      'at-rule-allowed-list': null,
      'at-rule-descriptor-no-unknown': null,
      'at-rule-descriptor-value-no-unknown': null,
      'at-rule-disallowed-list': null,
      // Off: formatting, checked by prettier/prettier.
      'at-rule-empty-line-before': null,
      'at-rule-no-deprecated': true,
      'at-rule-no-unknown': null,
      // Off: the Angular build adds the vendor prefixes.
      'at-rule-no-vendor-prefix': null,
      'at-rule-prelude-no-invalid': null,
      'at-rule-property-required-list': null,
      // Off: a naming convention the code review is enough for.
      'container-name-pattern': null,
      // Off: a naming convention the code review is enough for.
      'custom-media-pattern': null,
      // Off: a notation choice, not a mistake.
      'import-notation': null,
      // Off: a naming convention the code review is enough for.
      'layer-name-pattern': null,
      'media-feature-name-allowed-list': null,
      'media-feature-name-disallowed-list': null,
      'media-feature-name-no-unknown': true,
      // Off: the Angular build adds the vendor prefixes.
      'media-feature-name-no-vendor-prefix': null,
      'media-feature-name-unit-allowed-list': null,
      'media-feature-name-value-allowed-list': null,
      'media-feature-name-value-no-unknown': null,
      // Off: a notation choice, not a mistake.
      'media-feature-range-notation': null,
      'media-query-no-invalid': null,
      'media-type-no-deprecated': true,
    },
  };
}
