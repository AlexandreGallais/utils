// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warning` = a style without autofix (disabled for one line, with a reason).
// Comments: empty comments, patterns.

/**
 * Comments rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function commentsBlock() {
  return {
    rules: {
      'comment-empty-line-before': ['always', { except: ['first-nested'], ignore: ['stylelint-commands'] }],
      'comment-no-empty': null,
      'comment-pattern': null,
      'comment-whitespace-inside': 'always',
      'comment-word-disallowed-list': null,
    },
  };
}
