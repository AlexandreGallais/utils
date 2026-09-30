// Preset: an Angular application (a program), the shell of a workspace. Its eslint.config.mjs imports the root
// config and adds this: the sources switch to the browser mode and get the Angular rules.

import angularComponentsBlock from '../rules/angular-components.mjs';
import angularTemplatesBlock from '../rules/angular-templates.mjs';
import finishConfigs from '../setup/finish-configs.mjs';
import projectRules from '../setup/project-rules.mjs';

/**
 * @typedef {object} AngularOptions
 * @property {string} prefix - Selector prefix of the project, such as `ds` or `app`.
 */

/**
 * Lints an Angular application (a program), the shell of a workspace.
 *
 * @param {import('../setup/project-rules.mjs').ProjectOptions & AngularOptions & import('../setup/finish-configs.mjs').FinishOptions} options - The project and its choices.
 * @returns {import('eslint').Linter.Config[]} The configs, to export with `defineConfig(…)`.
 */
export default function angularAppPreset(options) {
  return finishConfigs(
    [...projectRules(options, false), ...angularComponentsBlock(options.prefix), ...angularTemplatesBlock()],
    options,
  );
}
