// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Dead code: Unused, unreachable, useless, empty or duplicated code.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Dead code rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function deadCodeBlock() {
  return [
    {
      name: 'rules/dead-code',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-debugger': ['error'],
        'no-empty-pattern': ['error'],
        'no-self-assign': ['error'],
        'no-unreachable': ['error'],
        'no-useless-assignment': ['error'],
        'no-empty': ['warn'],
        'no-lone-blocks': ['info'],
        'no-unused-expressions': ['error'],
        // ---- SonarJS ----
        // Off: duplicate of no-useless-assignment.
        'sonarjs/no-dead-store': ['off'],
        // Off: duplicate of @typescript-eslint/no-duplicate-type-constituents.
        'sonarjs/no-duplicate-in-composite': ['off'],
        // Sonar way; replaces the core no-useless-return, like SonarQube.
        'sonarjs/no-redundant-jump': ['warn'],
        'sonarjs/no-redundant-optional': ['warn'],
      },
    },
    {
      name: 'rules/dead-code/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        // Kept: TypeScript only greys out dead code, `allowUnreachableCode: false` would also block the dev loop.
        'no-unreachable': ['error'],
        '@typescript-eslint/no-unnecessary-qualifier': ['error'],
        // Replaced by the TS version.
        'no-unused-expressions': ['off'],
        '@typescript-eslint/no-unused-expressions': ['error'],
      },
    },
  ];
}
