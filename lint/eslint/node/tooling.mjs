// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Tool configs and scripts run in Node and export a default config.

import { NODE_FILES } from '../setup/files.mjs';

/**
 * Relaxations for Node tool configs and scripts.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function toolingBlock() {
  return [
    {
      name: 'node/tooling',
      files: NODE_FILES,
      rules: {
        'import-x/no-anonymous-default-export': ['off'],
        'import-x/no-default-export': ['off'],
        'import-x/no-nodejs-modules': ['off'],
      },
    },
    {
      name: 'node/unicorn-relaxations',
      files: ['**/*.spec.ts', '**/testing/**', '**/*.bench.ts', '**/*.mjs', '**/*.mts'],
      rules: {
        'unicorn/no-null': ['off'],
        'unicorn/no-top-level-assignment-in-function': ['off'],
        // Off: `expect(…).rejects.toThrow(expect.objectContaining(…))` is idiomatic.
        'unicorn/max-nested-calls': ['off'],
      },
    },
  ];
}
