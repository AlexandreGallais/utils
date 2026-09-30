// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Regular expressions (core rules): The regular expression rules of ESLint, SonarJS and Unicorn; the regexp plugin has its own block.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Regular expressions (core rules) rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function regularExpressionsBlock() {
  return [
    {
      name: 'rules/regular-expressions',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-control-regex': ['error'],
        'no-empty-character-class': ['error'],
        'no-invalid-regexp': ['error'],
        'no-misleading-character-class': ['error'],
        'no-useless-backreference': ['error'],
        'no-div-regex': ['error'],
        'no-regex-spaces': ['error'],
        'prefer-named-capture-group': ['info'],
        'prefer-regex-literals': ['info', { disallowRedundantWrapping: true }],
        'require-unicode-regexp': ['info', { requireFlag: 'v' }],
        // ---- SonarJS ----
        // Off: duplicate of no-control-regex.
        'sonarjs/no-control-regex': ['off'],
        // Off: duplicate of no-empty-character-class.
        'sonarjs/no-empty-character-class': ['off'],
        // Off: duplicate of no-invalid-regexp.
        'sonarjs/no-invalid-regexp': ['off'],
        // Off: duplicate of no-misleading-character-class.
        'sonarjs/no-misleading-character-class': ['off'],
        // Off: duplicate of no-regex-spaces.
        'sonarjs/no-regex-spaces': ['off'],
        // Off: duplicate of @typescript-eslint/prefer-regexp-exec.
        'sonarjs/prefer-regexp-exec': ['off'],
        'sonarjs/anchor-precedence': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/comment-regex': ['off'],
        'sonarjs/concise-regex': ['warn'],
        'sonarjs/duplicates-in-character-class': ['warn'],
        'sonarjs/existing-groups': ['error'],
        'sonarjs/no-empty-after-reluctant': ['warn'],
        'sonarjs/no-empty-alternatives': ['error'],
        'sonarjs/no-empty-group': ['warn'],
        'sonarjs/regex-complexity': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/shorthand-property-grouping': ['off'],
        'sonarjs/single-char-in-character-classes': ['warn'],
        'sonarjs/stateful-regex': ['error'],
        'sonarjs/super-linear-regex': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/unicode-aware-regex': ['off'],
        'sonarjs/unused-named-groups': ['warn'],
      },
    },
    {
      name: 'rules/regular-expressions/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/prefer-regexp-exec': ['error'],
      },
    },
  ];
}
