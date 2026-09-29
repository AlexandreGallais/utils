// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// Logical properties (stylelint-plugin-logical-css): `margin-inline-start` instead of `margin-left`, so that a
// right-to-left language mirrors the layout without new styles. For applications translated to RTL languages.

/**
 * Logical property rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function logicalPropertiesBlock() {
  return {
    plugins: ['stylelint-plugin-logical-css'],
    rules: {
      'logical-css/require-logical-keywords': true,
      'logical-css/require-logical-properties': true,
      'logical-css/require-logical-units': true,
    },
  };
}
