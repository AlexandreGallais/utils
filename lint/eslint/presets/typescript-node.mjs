// Preset: the root of a workspace, in Node mode: every rule, for the tool configs and scripts around the
// projects. It is the root eslint.config.mjs. Each project (a library, an application) has its own
// eslint.config.mjs, which imports this one and adds its preset (typescript-browser, angular-library,
// angular-app): its sources switch to the browser mode.

import nodeBlock from '../rules/node.mjs';
import coreRules from '../setup/core-rules.mjs';
import finishConfigs from '../setup/finish-configs.mjs';

/**
 * @typedef {object} TypescriptNodeOptions
 * @property {string} tsconfigRootDirectory - Folder of the root `tsconfig.json`, usually `import.meta.dirname`.
 */

/**
 * Lints the root of a workspace, in Node mode.
 *
 * @param {TypescriptNodeOptions & import('../setup/finish-configs.mjs').FinishOptions} options - The workspace.
 * @returns {import('eslint').Linter.Config[]} The configs, to export with `defineConfig(…)`.
 */
export default function typescriptNodePreset(options) {
  return finishConfigs([...coreRules(options.tsconfigRootDirectory), ...nodeBlock()], options);
}
