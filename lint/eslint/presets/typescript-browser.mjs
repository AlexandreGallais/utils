// Preset: a TypeScript project whose sources run in the browser, without framework: a library (an SVG library
// built by Vite), with or without Storybook. Its eslint.config.mjs imports the root config and adds this.

import storybookBlock from '../rules/storybook.mjs';
import finishConfigs from '../setup/finish-configs.mjs';
import projectRules from '../setup/project-rules.mjs';

/**
 * @typedef {object} TypescriptBrowserOptions
 * @property {boolean} isLibrary - Whether the project is a library: its generic API may write `any` and `void`.
 * @property {string | undefined} storybookPackageDirectory - Folder of the package.json that lists the Storybook
 *   addons (checked by storybook/no-uninstalled-addons, and where stories find their devDependencies), usually
 *   `import.meta.dirname`, or `undefined` without Storybook.
 */

/**
 * Lints a TypeScript project for the browser.
 *
 * @param {import('../setup/project-rules.mjs').ProjectOptions & TypescriptBrowserOptions & import('../setup/finish-configs.mjs').FinishOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs, to export with `defineConfig(…)`.
 */
export default function typescriptBrowserPreset(options) {
  const { isLibrary, storybookPackageDirectory } = options;
  return finishConfigs(
    [
      ...projectRules(options, isLibrary),
      ...(storybookPackageDirectory === undefined ? [] : storybookBlock(storybookPackageDirectory)),
    ],
    options,
  );
}
