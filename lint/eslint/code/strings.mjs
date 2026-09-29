// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Strings: String methods, templates, quotes and character handling.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
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
      name: 'code/strings',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-multi-str': ['error'],
        'no-nonoctal-decimal-escape': ['error'],
        'no-octal-escape': ['error'],
        'no-useless-escape': ['error'],
        'prefer-template': ['error'],
        // Off: formatting is Prettier's job.
        'unicode-bom': ['off'],
        // ---- SonarJS ----
        'sonarjs/no-duplicate-string': ['error'],
        'sonarjs/useless-string-operation': ['error'],
        'sonarjs/dynamically-constructed-templates': ['error'],
        'sonarjs/empty-string-repetition': ['error'],
        'sonarjs/no-nested-template-literals': ['error'],
        'sonarjs/single-character-alternation': ['error'],
        // ---- Unicorn ----
        'unicorn/consistent-template-literal-escape': ['error'],
        'unicorn/escape-case': ['error'],
        'unicorn/name-replacements': ['error'],
        // Deprecated: replaced by unicorn/prefer-unicode-code-point-escapes.
        'unicorn/no-hex-escape': ['off'],
        'unicorn/no-incorrect-template-string-interpolation': ['error'],
        'unicorn/no-invalid-character-comparison': ['error'],
        'unicorn/no-unnecessary-string-trim': ['error'],
        'unicorn/no-unsafe-string-replacement': ['error'],
        'unicorn/no-useless-template-literals': ['error'],
        'unicorn/no-using-resource-escape': ['error'],
        'unicorn/prefer-code-point': ['error'],
        'unicorn/prefer-dom-node-replace-children': ['error'],
        'unicorn/prefer-dom-node-text-content': ['error'],
        'unicorn/prefer-single-replace': ['error'],
        'unicorn/prefer-split-limit': ['error'],
        'unicorn/prefer-string-match-all': ['error'],
        'unicorn/prefer-string-pad-start-end': ['error'],
        'unicorn/prefer-string-raw': ['error'],
        'unicorn/prefer-string-repeat': ['error'],
        'unicorn/prefer-string-replace-all': ['error'],
        // Off: duplicate of @typescript-eslint/prefer-string-starts-ends-with (type-aware).
        'unicorn/prefer-string-starts-ends-with': ['off'],
        'unicorn/prefer-string-trim-start-end': ['error'],
        'unicorn/prefer-unicode-code-point-escapes': ['error'],
        'unicorn/string-content': ['off'],
        // Off: formatting is Prettier's job.
        'unicorn/template-indent': ['off'],
        'unicorn/text-encoding-identifier-case': ['error'],
      },
    },
    {
      name: 'code/strings/typescript',
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
