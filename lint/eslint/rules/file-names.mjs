// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// File names: kebab-case files and folders (local/kebab-case-path). The one export per file is in rules/exports.

import { CODE_FILES } from '../setup/files.mjs';
import local from './local/plugin.mjs';

/**
 * File name rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function fileNamesBlock() {
  return [
    {
      name: 'rules/file-names',
      files: CODE_FILES,
      plugins: {
        local,
      },
      rules: {
        // Custom: kebab-case files and folders; dot folders (`.storybook/`) are imposed by tools and skipped.
        'local/kebab-case-path': ['error'],
      },
    },
  ];
}
