// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// No specificity war: no `!important`, no `#id`, shallow nesting and short selectors. A component that needs
// more is split into smaller components.

/**
 * Specificity and complexity rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function strictnessBlock() {
  return {
    rules: {
      // Custom: `!important` hides a specificity problem; use a later cascade layer instead.
      'declaration-no-important': true,
      // Custom: 3 levels, then split the component.
      'max-nesting-depth': 3,
      // Custom: 3 levels, then split the component.
      'selector-max-compound-selectors': 3,
      // Custom: classes only, no `#id`.
      'selector-max-id': 0,
      'selector-no-qualifying-type': true,
      // Custom: no universal selector outside the reset layer (costly and hard to override).
      'selector-max-universal': 1,
    },
  };
}
