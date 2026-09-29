// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// Standard CSS rules (stylelint-config-standard), invalid or unknown code, and the disable policy: a disable
// comment targets named rules, gives a reason and must still be needed.

/**
 * Base CSS rules, for any project with styles.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function baseBlock() {
  return {
    extends: ['stylelint-config-standard'],
    reportDescriptionlessDisables: true,
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    reportUnscopedDisables: true,
    rules: {
      // ---- Checked by SonarQube, off in the presets ----
      'no-descending-specificity': true,
      'no-duplicate-selectors': true,

      // ---- Invalid or unknown code ----
      'annotation-no-unknown': true,
      'at-rule-descriptor-no-unknown': true,
      'at-rule-descriptor-value-no-unknown': true,
      'at-rule-prelude-no-invalid': true,
      'declaration-property-value-no-unknown': true,
      'media-feature-name-value-no-unknown': true,
      'media-query-no-invalid': true,
      'no-unknown-animations': true,
      'no-unknown-custom-media': true,
      'selector-no-deprecated': true,
      'selector-no-invalid': true,
      'selector-no-unmatchable': true,

      // ---- Consistency ----
      // Custom: colors through tokens, never `red`.
      'color-named': 'never',
      'font-weight-notation': 'numeric',

      // Off: custom properties come from the design system tokens, unknown to each file.
      'no-unknown-custom-properties': null,
    },
  };
}
