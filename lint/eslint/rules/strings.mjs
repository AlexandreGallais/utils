// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Strings: String methods, templates, quotes and character handling.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Strings rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function stringsBlock() {
  return [
    {
      name: 'rules/strings',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-multi-str': ['info'],
        'no-nonoctal-decimal-escape': ['error'],
        'no-octal-escape': ['error'],
        'no-useless-escape': ['info'],
        'prefer-template': ['error'],
        // Off: formatting is Prettier's job.
        'unicode-bom': ['off'],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-duplicate-string': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/useless-string-operation': ['off'],
        'sonarjs/dynamically-constructed-templates': ['error'],
        'sonarjs/empty-string-repetition': ['error'],
        'sonarjs/no-nested-template-literals': ['warn'],
        'sonarjs/single-character-alternation': ['warn'],
      },
    },
    {
      name: 'rules/strings/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        'no-octal-escape': ['off'],
        '@typescript-eslint/no-base-to-string': ['error'],
        '@typescript-eslint/no-unnecessary-template-expression': ['error'],
        '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
        '@typescript-eslint/restrict-template-expressions': ['error'],
      },
    },
  ];
}
