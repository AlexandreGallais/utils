// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// Colors: notations, named colors, invalid hex, color functions.

/**
 * Colors rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function colorsBlock() {
  return {
    rules: {
      // Off: a notation choice, not a mistake.
      'alpha-value-notation': null,
      // Off: a notation choice, not a mistake.
      'color-function-alias-notation': null,
      // Off: a notation choice, not a mistake.
      'color-function-notation': null,
      'color-hex-alpha': null,
      // Off: a notation choice, not a mistake.
      'color-hex-length': null,
      // Custom: colors come from variables or custom properties, not `red`.
      'color-named': ['never', { severity: 'warning' }],
      'color-no-hex': null,
      'color-no-invalid-hex': true,
      'function-url-no-scheme-relative': null,
      // Off: a notation choice, not a mistake.
      'function-url-quotes': null,
      'function-url-scheme-allowed-list': null,
      'function-url-scheme-disallowed-list': null,
      // Off: a notation choice, not a mistake.
      'hue-degree-notation': null,
      // Off: a notation choice, not a mistake.
      'lightness-notation': null,
    },
  };
}
