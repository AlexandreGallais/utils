// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Names: @typescript-eslint/naming-convention selectors (used by the typescript block) and file and folder
// names (eslint-plugin-check-file): kebab-case, no `index` barrel except the entry points.

import checkFile from 'eslint-plugin-check-file';
import { CODE_FILES } from './files.mjs';

// @typescript-eslint/naming-convention selectors.
export const namingConventionSelectors = [
  // camelCase; `_` prefix = intentionally unused.
  { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
  { selector: 'import', format: ['camelCase', 'PascalCase'] },
  // UPPER_CASE: module-level constants.
  { selector: 'variable', format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
  // Names come from external APIs.
  { selector: 'variable', modifiers: ['destructured'], format: null },
  { selector: 'function', format: ['camelCase'] },
  { selector: 'typeLike', format: ['PascalCase'] },
  // No `I` prefix (TypeScript convention).
  { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } },
  { selector: 'enumMember', format: ['PascalCase'] },
  // Quoted keys: HTTP headers, external APIs.
  {
    selector: [
      'classProperty',
      'objectLiteralProperty',
      'typeProperty',
      'classMethod',
      'objectLiteralMethod',
      'typeMethod',
      'accessor',
      'enumMember',
    ],
    modifiers: ['requiresQuotes'],
    format: null,
  },
];

/**
 * File and folder naming rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function namingBlock() {
  return [
    {
      name: 'naming/files',
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
