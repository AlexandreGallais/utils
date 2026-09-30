// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Modern syntax: Modern JavaScript: spread, at(), operator assignment, standard built-ins.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Modern syntax rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function modernSyntaxBlock() {
  return [
    {
      name: 'rules/modern-syntax',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-restricted-syntax': ['off'],
        'no-sequences': ['warn'],
        'operator-assignment': ['error'],
        'prefer-spread': ['error'],
        'symbol-description': ['error'],
        // ---- SonarJS ----
        'sonarjs/no-forced-browser-interaction': ['warn'],
        'sonarjs/prefer-default-last': ['warn'],
      },
    },
    {
      name: 'rules/modern-syntax/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/no-misused-new': ['error'],
        '@typescript-eslint/no-misused-spread': ['error'],
      },
    },
  ];
}
