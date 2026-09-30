// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Exports: a source file exports one function or class, named after the file (`format-count.ts` exports
// `formatCount`, `button.component.ts` exports `ButtonComponent`); small exported types and constants may
// sit next to it. Entry points, stories and test code are left out.

import { TEST_CODE_FILES } from '../setup/files.mjs';
import local from './local/plugin.mjs';

/** Files that gather exports by design: entry points and barrels. */
const ENTRY_POINTS = ['**/index.ts', '**/public-api.ts'];

/** Stories export their meta and several stories. */
const STORIES = ['**/*.stories.ts'];

/**
 * One export per source file.
 *
 * @param {string[]} sourceFiles - Globs of the sources, such as `['src/**\/*.ts']`.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function exportsBlock(sourceFiles) {
  return [
    {
      name: 'rules/exports',
      files: sourceFiles,
      ignores: [...ENTRY_POINTS, ...STORIES, ...TEST_CODE_FILES],
      plugins: {
        local,
      },
      rules: {
        // Custom: one exported function or class per file, named after the file; types and constants may sit
        // next to it.
        // Warn: two exported functions in one file, or a name that differs from the file, is to justify.
        'local/export-matches-filename': ['warn', { exports: 'functions-and-classes' }],
      },
    },
  ];
}
