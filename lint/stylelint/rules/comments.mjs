// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// Comments: empty comments, patterns.

/**
 * Comments rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function commentsBlock() {
  return {
    rules: {
      // Off: formatting, checked by prettier/prettier.
      'comment-empty-line-before': null,
      'comment-no-empty': null,
      'comment-pattern': null,
      // Off: formatting, checked by prettier/prettier.
      'comment-whitespace-inside': null,
      'comment-word-disallowed-list': null,
    },
  };
}
