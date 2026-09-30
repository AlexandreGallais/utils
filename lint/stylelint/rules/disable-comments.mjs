// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warning` = a style without autofix (disabled for one line, with a reason).
// Disable comments (`// stylelint-disable-next-line <rule> -- <reason>`): a rule set to `warning` may be disabled
// for one line, with a reason; a rule set to `error` cannot be disabled at all. A disable that is no longer needed
// is an error too.

import local from './local/plugin.mjs';

/**
 * Policy of the disable comments.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function disableCommentsBlock() {
  return {
    plugins: local,
    // Custom: a disable names its rules, applies where it is written, and is still needed.
    reportInvalidScopeDisables: true,
    reportNeedlessDisables: true,
    reportUnscopedDisables: true,
    // Warn: the reason after `--` is expected; a missing one is a warning.
    reportDescriptionlessDisables: [true, { severity: 'warning' }],
    rules: {
      // Custom: one line at a time, and only a `warning` rule.
      'local/disable-only-warnings': true,
    },
  };
}
