// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Errors: throw, try / catch and Error objects.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Errors rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function errorsBlock() {
  return [
    {
      name: 'rules/errors',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-ex-assign': ['error'],
        'no-unsafe-finally': ['error'],
        'no-throw-literal': ['error'],
        'no-useless-catch': ['warn'],
        'preserve-caught-error': ['warn'],
        // ---- SonarJS ----
        // Off: duplicate of no-new (which reports any `new` used for side effects).
        'sonarjs/no-unthrown-error': ['off'],
        // Off: duplicate of no-useless-catch.
        'sonarjs/no-useless-catch': ['off'],
        'sonarjs/in-operator-type-error': ['error'],
        'sonarjs/no-ignored-exceptions': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-reference-error': ['off'],
      },
    },
    {
      name: 'rules/errors/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        // Replaced by the TS version.
        'no-throw-literal': ['off'],
        '@typescript-eslint/only-throw-error': ['error'],
        '@typescript-eslint/use-unknown-in-catch-callback-variable': ['warn'],
      },
    },
  ];
}
