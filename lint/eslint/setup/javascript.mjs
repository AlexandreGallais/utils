// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Set-up of every JavaScript and TypeScript file: stale `eslint-disable` comments and inline configs are
// errors, Node and modern globals are known. No rule here: the rules live in the blocks of code/.

import globals from 'globals';
import { CODE_FILES } from './files.mjs';

/**
 * Linter options and globals for every code file.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread first in `defineConfig([…])`.
 */
export default function javascriptSetupBlock() {
  return [
    {
      name: 'setup/linter-options',
      linterOptions: {
        reportUnusedDisableDirectives: 'error',
        reportUnusedInlineConfigs: 'error',
      },
    },
    {
      name: 'setup/javascript',
      files: CODE_FILES,
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.es2027,
        },
      },
      settings: {
        // SonarJS reads the React version to adapt some rules; there is no React here.
        react: { version: '999.999.999' },
      },
    },
  ];
}
