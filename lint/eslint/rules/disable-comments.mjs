// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Disable comments (`// eslint-disable-next-line <rule> -- <reason>`): a rule set to `warn` may be disabled for
// one line, with a reason; a rule set to `error` cannot be disabled at all. A disable that is no longer needed
// is an error too (linterOptions, setup/javascript).

import { CODE_FILES } from '../setup/files.mjs';
import local from './local/plugin.mjs';

/**
 * Policy of the `eslint-disable` comments.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function disableCommentsBlock() {
  return [
    {
      name: 'rules/disable-comments',
      files: CODE_FILES,
      plugins: {
        local,
      },
      rules: {
        // Custom: `// eslint-disable-next-line <rule> -- <reason>` only; no block or file disable, no inline config.
        'local/disable-next-line-only': ['error'],
        // Custom: only a `warn` rule may be disabled; an `error` is fixed.
        'local/disable-only-warnings': ['error'],
        // Warn: the reason after `--` is expected; a missing one is a warning.
        'local/disable-reason': ['warn'],
      },
    },
  ];
}
