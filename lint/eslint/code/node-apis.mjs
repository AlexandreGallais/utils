// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Node: Node-only APIs: process, Buffer, globalThis, JSON files.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Node rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function nodeApisBlock() {
  return [
    {
      name: 'code/node-apis',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- SonarJS ----
        'sonarjs/no-global-this': ['error'],
        // ---- Unicorn ----
        'unicorn/consistent-json-file-read': ['error'],
        'unicorn/no-new-buffer': ['error'],
        'unicorn/no-process-exit': ['error'],
        'unicorn/no-unnecessary-global-this': ['error'],
        'unicorn/prefer-global-this': ['error'],
        // Deprecated: replaced by unicorn/consistent-json-file-read.
        'unicorn/prefer-json-parse-buffer': ['off'],
      },
    },
  ];
}
