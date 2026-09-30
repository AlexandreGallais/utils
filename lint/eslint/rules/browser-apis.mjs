// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Browser: DOM, events, CSS-in-JS, web APIs and the console.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Browser rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function browserApisBlock() {
  return [
    {
      name: 'rules/browser-apis',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-alert': ['warn'],
        // Warn: scripts and command-line tools report on the console.
        'no-console': ['warn'],
        // ---- SonarJS ----
        'sonarjs/no-table-as-layout': ['warn'],
        'sonarjs/object-alt-content': ['warn'],
        'sonarjs/table-header': ['error'],
        'sonarjs/table-header-reference': ['error'],
      },
    },
  ];
}
