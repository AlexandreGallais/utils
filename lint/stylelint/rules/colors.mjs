// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warning` = a style without autofix (disabled for one line, with a reason).
// Colors: notations, named colors, invalid hex, color functions.

/**
 * Colors rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function colorsBlock() {
  return {
    rules: {
      'alpha-value-notation': [
        'percentage',
        { exceptProperties: ['opacity', 'fill-opacity', 'flood-opacity', 'stop-opacity', 'stroke-opacity'] },
      ],
      'color-function-alias-notation': 'without-alpha',
      'color-function-notation': 'modern',
      'color-hex-alpha': null,
      'color-hex-length': 'short',
      // Custom: colors come from variables or custom properties, not `red`.
      'color-named': ['never', { severity: 'warning' }],
      'color-no-hex': null,
      'color-no-invalid-hex': true,
      'function-url-no-scheme-relative': null,
      'function-url-quotes': 'always',
      'function-url-scheme-allowed-list': null,
      'function-url-scheme-disallowed-list': null,
      'hue-degree-notation': 'angle',
      'lightness-notation': 'percentage',
    },
  };
}
