// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// File and folder names (eslint-plugin-check-file): kebab-case, no `index` barrel except the entry points.

import checkFile from 'eslint-plugin-check-file';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * File and folder naming rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function fileNamesBlock() {
  return [
    {
      name: 'code/file-names',
      files: CODE_FILES,
      plugins: {
        'check-file': checkFile,
      },
      rules: {
        // Off: local/export-matches-filename names every file after its export (no `utils.ts`).
        'check-file/filename-blocklist': ['off'],
        'check-file/filename-naming-convention': [
          'error',
          { '**/*.{js,mjs,ts,mts}': 'KEBAB_CASE' },
          { ignoreMiddleExtensions: true },
        ],
        // Off: files are grouped by feature, not by type.
        'check-file/folder-match-with-fex': ['off'],
        'check-file/folder-naming-convention': ['error', { '**/': 'KEBAB_CASE' }],
        // No `index.ts` barrels besides the entry points (see below).
        'check-file/no-index': ['error'],
      },
    },
  ];
}
