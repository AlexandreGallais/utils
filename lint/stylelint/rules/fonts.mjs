// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// Fonts: families, weights.

/**
 * Fonts rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function fontsBlock() {
  return {
    rules: {
      // Off: the UIs run offline with their fonts installed; quotes are a notation choice.
      'font-family-name-quotes': null,
      'font-family-no-duplicate-names': true,
      // Off: the UIs run offline with their fonts installed; quotes are a notation choice.
      'font-family-no-missing-generic-family-keyword': null,
      'font-weight-notation': null,
    },
  };
}
