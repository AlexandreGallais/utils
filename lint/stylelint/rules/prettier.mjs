// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save (never disabled); `warning` = a choice to justify (disabled for one line, with a reason).
// Prettier (stylelint-prettier): the formatting, checked by Stylelint and fixed on save, like eslint-plugin-prettier.

/**
 * Prettier rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function prettierBlock() {
  return {
    plugins: ['stylelint-prettier'],
    rules: {
      // Custom: a file that Prettier would format differently is an error, fixed on save (reads .prettierrc.json).
      'prettier/prettier': true,
    },
  };
}
