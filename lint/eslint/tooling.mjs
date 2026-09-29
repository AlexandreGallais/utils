// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Tool configs and scripts run in Node and export a default config.

import { NODE_FILES } from './files.mjs';

/**
 * Relaxations for Node tool configs and scripts.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function toolingBlock() {
  return [
    {
      name: 'tooling',
      files: NODE_FILES,
      rules: {
        'import-x/no-anonymous-default-export': ['off'],
        'import-x/no-default-export': ['off'],
        'import-x/no-nodejs-modules': ['off'],
      },
    },
  ];
}
