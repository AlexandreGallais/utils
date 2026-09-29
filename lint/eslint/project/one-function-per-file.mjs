// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Project rules (lint/eslint/project/rules/): the one-function-per-file layout.

import exportMatchesFilename from './rules/export-matches-filename.mjs';
import requireSpecFile from './rules/require-spec-file.mjs';

/**
 * Project rules of a one-function-per-file library: one export named like its file, a spec next to it.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function oneFunctionPerFileBlock() {
  return [
    {
      name: 'project/one-function-per-file',
      files: ['src/**/*.ts'],
      ignores: ['src/index.ts', 'src/*/index.ts', 'src/**/*.spec.ts', 'src/**/testing/**'],
      plugins: {
        local: {
          rules: {
            'export-matches-filename': exportMatchesFilename,
            'require-spec-file': requireSpecFile,
          },
        },
      },
      rules: {
        // Custom: one export per file, named like the file.
        'local/export-matches-filename': ['error'],
        // Custom: a spec next to every file exporting runtime code.
        'local/require-spec-file': ['error'],
      },
    },
    // internal/ helpers are covered through the public functions that use them.
    {
      name: 'project/one-function-per-file/internal',
      files: ['src/**/internal/*.ts'],
      rules: {
        'local/require-spec-file': ['off'],
      },
    },
  ];
}
