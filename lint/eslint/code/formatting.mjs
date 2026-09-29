// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Formatting (rules): The few layout rules outside Prettier.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Formatting (rules) rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function formattingBlock() {
  return [
    {
      name: 'code/formatting',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-irregular-whitespace': ['error'],
        'no-unexpected-multiline': ['error'],
        // ---- SonarJS ----
        // Off: duplicate of curly.
        'sonarjs/no-unenclosed-multiline-block': ['off'],
        'sonarjs/no-redundant-parentheses': ['off'],
        'sonarjs/no-tab': ['off'],
        // ---- Unicorn ----
        // Off: formatting is Prettier's job.
        'unicorn/empty-brace-spaces': ['off'],
      },
    },
  ];
}
