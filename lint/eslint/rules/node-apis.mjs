// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Node apis: Node-only APIs: process, Buffer, globalThis, JSON files.
// Rules of SonarJS on this subject (the Sonar way profile of SonarQube), every rule listed.

import sonarjs from 'eslint-plugin-sonarjs';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Node apis rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function nodeApisBlock() {
  return [
    {
      name: 'rules/node-apis',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        'sonarjs/no-global-this': ['warn'],
      },
    },
  ];
}
