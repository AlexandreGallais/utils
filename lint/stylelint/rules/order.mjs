// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// Order (stylelint-order): custom properties, variables, declarations, then rules; properties by role.

import recessOrder from 'stylelint-config-recess-order';
import orderPlugins from 'stylelint-order';

/**
 * Order rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function orderBlock() {
  return {
    plugins: orderPlugins,
    rules: {
      // Custom: custom properties, variables, declarations, then nested rules (fixed on save).
      'order/order': [['custom-properties', 'dollar-variables', 'declarations', 'rules', 'at-rules']],
      // Off: the recess order groups the properties by role.
      'order/properties-alphabetical-order': null,
      // Custom: properties grouped by role (position, box, text, visual), the recess order (fixed on save).
      'order/properties-order': recessOrder.rules['order/properties-order'],
    },
  };
}
