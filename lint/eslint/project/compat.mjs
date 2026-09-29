// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Browser compatibility (eslint-plugin-compat): a Web API or JavaScript feature the supported browsers lack is
// an error, unless it is polyfilled. For applications with a browser support policy.

import compat from 'eslint-plugin-compat';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Compatibility rule for the browsers of the project.
 *
 * @param {string[]} browsers - The supported browsers, as a browserslist query, such as `['last 2 Chrome versions']`.
 * @param {string[]} polyfills - The APIs polyfilled by the project, such as `['fetch']`.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function compatBlock(browsers, polyfills) {
  return [
    {
      name: 'project/compat',
      files: CODE_FILES,
      plugins: {
        compat,
      },
      settings: {
        browsers,
        polyfills,
      },
      rules: {
        'compat/compat': ['error'],
      },
    },
  ];
}
