// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Async code: Promises, async / await, timers and generators: nothing floating, nothing forgotten.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Async code rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function asyncBlock() {
  return [
    {
      name: 'rules/async',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-async-promise-executor': ['error'],
        // Warn: some awaits must run one after the other (ordered writes, rate limits).
        'no-await-in-loop': ['warn'],
        'no-promise-executor-return': ['error'],
        // Off: false positives with async/await (removed from eslint:recommended).
        'require-atomic-updates': ['off'],
        'prefer-promise-reject-errors': ['error'],
        'require-await': ['warn'],
        'require-yield': ['warn'],
        // ---- SonarJS ----
        // Off: duplicate of require-yield.
        'sonarjs/generator-without-yield': ['off'],
        'sonarjs/disabled-timeout': ['error'],
        'sonarjs/no-async-constructor': ['error'],
        'sonarjs/no-floating-point-equality': ['error'],
        'sonarjs/no-try-promise': ['error'],
        'sonarjs/prefer-promise-shorthand': ['warn'],
      },
    },
    {
      name: 'rules/async/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/await-thenable': ['error'],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-misused-promises': ['error'],
        // Replaced by the TS version.
        'prefer-promise-reject-errors': ['off'],
        '@typescript-eslint/prefer-promise-reject-errors': ['error'],
        '@typescript-eslint/promise-function-async': ['error'],
        // Replaced by the TS version.
        'require-await': ['off'],
        '@typescript-eslint/require-await': ['warn'],
        '@typescript-eslint/return-await': ['error'],
      },
    },
  ];
}
