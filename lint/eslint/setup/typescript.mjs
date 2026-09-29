// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Set-up of TypeScript files: the typescript-eslint parser with type information (projectService) and browser
// globals. The heaviest part of the lint: it builds the TypeScript program once per run.

import globals from 'globals';
import tsEslint from 'typescript-eslint';
import { TYPESCRIPT_FILES } from './files.mjs';

/**
 * Parser and type information for TypeScript files.
 *
 * @param {string} tsconfigRootDirectory - Folder of the tsconfig files, usually `import.meta.dirname` of the ESLint config.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function typescriptSetupBlock(tsconfigRootDirectory) {
  return [
    {
      name: 'setup/typescript',
      files: TYPESCRIPT_FILES,
      languageOptions: {
        // TS files run in the browser (and in Node: no DOM-only API in the sources).
        globals: {
          ...globals.browser,
          ...globals.es2027,
        },
        parser: tsEslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: tsconfigRootDirectory,
        },
      },
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
    },
  ];
}
