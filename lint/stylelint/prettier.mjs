// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// Formatting is Prettier's job: reported as a Stylelint problem, fixed by `stylelint --fix`.

/**
 * Prettier, run as a Stylelint rule.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function prettierBlock() {
  return {
    plugins: ['stylelint-prettier'],
    rules: {
      'prettier/prettier': true,
    },
  };
}
