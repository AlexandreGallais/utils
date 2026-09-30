// Preset: an Angular library (a product: design system, features, stores, back-end access), with or without
// Storybook. Its eslint.config.mjs imports the root config and adds this: the sources switch to the browser mode
// and get the Angular rules.

import angularComponentsBlock from '../rules/angular-components.mjs';
import angularTemplatesBlock from '../rules/angular-templates.mjs';
import storybookBlock from '../rules/storybook.mjs';
import finishConfigs from '../setup/finish-configs.mjs';
import projectRules from '../setup/project-rules.mjs';

/**
 * @typedef {object} AngularOptions
 * @property {string} prefix - Selector prefix of the project, such as `ds` or `app`.
 * @property {string | undefined} storybookPackageDirectory - Folder of the package.json that lists the Storybook
 *   addons (checked by storybook/no-uninstalled-addons, and where stories find their devDependencies), usually
 *   `import.meta.dirname`, or `undefined` without Storybook.
 */

/**
 * Lints an Angular library (a product: design system, features, stores, back-end access), with or without Storybook.
 *
 * @param {import('../setup/project-rules.mjs').ProjectOptions & AngularOptions & import('../setup/finish-configs.mjs').FinishOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs, to export with `defineConfig(…)`.
 */
export default function angularLibraryPreset(options) {
  const { prefix, storybookPackageDirectory } = options;
  return finishConfigs(
    [
      ...projectRules(options, true),
      ...angularComponentsBlock(prefix),
      ...angularTemplatesBlock(),
      ...(storybookPackageDirectory === undefined ? [] : storybookBlock(storybookPackageDirectory)),
    ],
    options,
  );
}
