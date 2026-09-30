// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// General: empty sources, nesting depth, animations, grid areas and the other rules.

/**
 * General rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function generalBlock() {
  return {
    rules: {
      'display-notation': null,
      'keyframe-block-no-duplicate-selectors': true,
      'keyframe-declaration-no-important': true,
      // Off: a naming convention the code review is enough for.
      'keyframes-name-pattern': null,
      // Custom: three levels of nesting at most: deeper SCSS gives long, over-specific selectors.
      'max-nesting-depth': [3, { severity: 'warning' }],
      'named-grid-areas-no-invalid': true,
      'nesting-selector-no-missing-scoping-root': [true, { ignoreAtRules: ['mixin'] }],
      'no-duplicate-at-import-rules': true,
      // Off: harmless.
      'no-empty-source': null,
      'no-invalid-double-slash-comments': true,
      'no-invalid-position-at-import-rule': [true, { ignoreAtRules: ['use', 'forward'] }],
      'no-invalid-position-declaration': [true, { ignoreAtRules: ['mixin'] }],
      'no-irregular-whitespace': true,
      'no-unknown-animations': null,
      'no-unknown-custom-media': null,
      'no-unknown-custom-properties': null,
      'relative-selector-nesting-notation': null,
      // Off: formatting, checked by prettier/prettier.
      'rule-empty-line-before': null,
      'rule-nesting-at-rule-required-list': null,
      'rule-selector-property-disallowed-list': null,
      'syntax-string-no-invalid': true,
    },
  };
}
