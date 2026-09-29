// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Formatting is Prettier's job: its recommended config turns off the conflicting rules and reports unformatted code.

import prettier from 'eslint-plugin-prettier/recommended';
import { CODE_FILES } from './files.mjs';

/**
 * Prettier, run as a lint rule.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function prettierBlock() {
  return [
    {
      name: 'prettier',
      files: CODE_FILES,
      extends: [prettier],
      rules: {
        'prettier/prettier': ['error'],
      },
    },
  ];
}
