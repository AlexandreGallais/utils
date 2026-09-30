// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Set-up of TypeScript files: the typescript-eslint parser with type information (projectService). The heaviest
// part of the lint: it builds the TypeScript program once per run.

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
