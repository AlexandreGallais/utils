// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// Order (stylelint-order, stylelint-config-recess-order): custom properties first, then declarations grouped
// by role (position, box model, typography, visual, misc), then nested rules. Autofixable.

/**
 * Property order rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function orderBlock() {
  return {
    extends: ['stylelint-config-recess-order'],
    plugins: ['stylelint-order'],
    rules: {
      'order/order': ['custom-properties', 'declarations', 'rules', 'at-rules'],
      // Custom: tokens sorted, easy to scan and to diff.
      'order/custom-properties-alphabetical-order': true,
    },
  };
}
