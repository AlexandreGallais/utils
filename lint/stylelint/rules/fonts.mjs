// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warning` = a style without autofix (disabled for one line, with a reason).
// Fonts: families, weights.

/**
 * Fonts rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function fontsBlock() {
  return {
    rules: {
      'font-family-name-quotes': 'always-where-recommended',
      'font-family-no-duplicate-names': true,
      'font-family-no-missing-generic-family-keyword': true,
      'font-weight-notation': null,
    },
  };
}
