// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Node: the mode of a workspace root and of everything around the projects (tool configs, scripts, specs run
// by Node): Node globals and modules, default exports for the tools, imports by path with their extension (Node
// ESM needs it), devDependencies, console output. rules/browser turns a project's sources back to the browser.

import globals from 'globals';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Node mode for every file.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function nodeBlock() {
  return [
    {
      name: 'rules/node',
      files: CODE_FILES,
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
      rules: {
        // Off: tools load their config from a default export.
        'import-x/no-anonymous-default-export': ['off'],
        'import-x/no-default-export': ['off'],
        // Custom: Node ESM needs the extension of a relative import (`./lint/eslint/presets/typescript-node.mjs`).
        'import-x/extensions': ['error', 'always', { ignorePackages: true, checkTypeImports: true }],
        // Custom: tools and scripts are never shipped: they may import devDependencies.
        'import-x/no-extraneous-dependencies': [
          'error',
          { devDependencies: true, optionalDependencies: false, peerDependencies: true, bundledDependencies: false },
        ],
        // Off: tool configs and scripts run in Node.
        'import-x/no-nodejs-modules': ['off'],
        // Custom: a path an index re-exports is simplified on save (`./lint/index.mjs`); a deep path stays allowed.
        'local/import-folders': ['error', { mode: 'simplify' }],
        // Off: tools and scripts report on the console.
        'no-console': ['off'],
      },
    },
  ];
}
