// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Set-up of every JavaScript and TypeScript file: stale `eslint-disable` comments and inline configs are
// errors, the modern JavaScript globals are known. No rule here: the rules live in the blocks of rules/.

import globals from 'globals';
import { CODE_FILES } from './files.mjs';

/**
 * Linter options and globals for every code file.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread first in `defineConfig([…])`.
 */
export default function javascriptSetupBlock() {
  return [
    {
      name: 'setup/linter-options',
      linterOptions: {
        reportUnusedDisableDirectives: 'error',
        reportUnusedInlineConfigs: 'error',
      },
    },
    {
      name: 'setup/javascript',
      files: CODE_FILES,
      languageOptions: {
        // Node or browser globals come with the mode: rules/node, rules/browser.
        globals: {
          ...globals.es2027,
        },
      },
      settings: {
        // SonarJS reads the React version to adapt some rules; there is no React here.
        react: { version: '999.999.999' },
      },
    },
  ];
}
