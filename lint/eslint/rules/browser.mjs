// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Browser: the mode of a project's sources (a library, an application), after rules/node: browser globals, no
// Node module, imports of a neighbour or a folder without extension, devDependencies only in the files never
// shipped (specs, stories), no console output left behind.

import globals from 'globals';

/** Node globals the browser does not have: `process`, `__dirname`, `require`… */
const NODE_ONLY_GLOBALS = Object.fromEntries(
  Object.keys(globals.node)
    .filter((name) => !(name in globals.browser))
    .map((name) => [name, 'off']),
);

/**
 * Browser mode for the sources of a project.
 *
 * @param {string[]} sourceFiles - Globs of the sources, such as `['src/**\/*.ts']`.
 * @param {string[]} developmentDependencyFiles - Globs of the sources never shipped, which may import
 *   devDependencies: specs, test helpers, stories.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function browserBlock(sourceFiles, developmentDependencyFiles) {
  return [
    {
      name: 'rules/browser',
      files: sourceFiles,
      languageOptions: {
        globals: {
          ...NODE_ONLY_GLOBALS,
          ...globals.browser,
        },
      },
      rules: {
        // Warn: an anonymous default export has no name to search for; a tool may still require it.
        'import-x/no-anonymous-default-export': ['warn'],
        // Warn: named exports are easier to search and rename; a framework may still require a default export.
        'import-x/no-default-export': ['warn'],
        // Custom: no extension in relative imports (`./format-count`): the bundler resolves it.
        'import-x/extensions': ['error', 'never', { ignorePackages: true, checkTypeImports: true }],
        // Custom: devDependencies only in the files never shipped.
        'import-x/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: developmentDependencyFiles,
            optionalDependencies: false,
            peerDependencies: true,
            bundledDependencies: false,
          },
        ],
        // Custom: the sources run in the browser.
        'import-x/no-nodejs-modules': ['error'],
        // Custom: a relative import names a neighbour file or a folder (its index.ts), never a file of another folder.
        'local/import-folders': ['error', { mode: 'require' }],
        // Warn: a debug trace left behind; a justified log (an error report) may stay.
        'no-console': ['warn'],
      },
    },
  ];
}
