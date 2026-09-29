// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Regular expressions (core rules): The regular expression rules of ESLint, SonarJS and Unicorn; the regexp plugin has its own block.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
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
      name: 'code/regular-expressions',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
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
        // Off: duplicate of regexp/prefer-named-capture-group.
        'prefer-named-capture-group': ['off'],
        'prefer-regex-literals': ['off'],
        // Off: regexp/require-unicode-sets-regexp requires the stricter `v` flag.
        'require-unicode-regexp': ['off'],
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
        'sonarjs/comment-regex': ['off'],
        'sonarjs/concise-regex': ['error'],
        'sonarjs/duplicates-in-character-class': ['error'],
        'sonarjs/existing-groups': ['error'],
        'sonarjs/no-empty-after-reluctant': ['error'],
        'sonarjs/no-empty-alternatives': ['error'],
        'sonarjs/no-empty-group': ['error'],
        'sonarjs/regex-complexity': ['error'],
        'sonarjs/shorthand-property-grouping': ['off'],
        'sonarjs/single-char-in-character-classes': ['error'],
        'sonarjs/stateful-regex': ['error'],
        'sonarjs/super-linear-regex': ['error'],
        'sonarjs/unicode-aware-regex': ['off'],
        'sonarjs/unused-named-groups': ['error'],
        // ---- Unicorn ----
        // Deprecated: replaced by eslint-plugin-regexp.
        'unicorn/better-regex': ['off'],
        'unicorn/no-useless-error-capture-stack-trace': ['error'],
        'unicorn/prefer-group-by': ['error'],
        'unicorn/prefer-regexp-escape': ['off'],
      },
    },
    {
      name: 'code/regular-expressions/typescript',
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
