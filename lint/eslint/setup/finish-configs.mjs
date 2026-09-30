// The end of every preset: specs and stories relaxed (setup/relax-tests-and-stories), the project's own configs,
// the `info` severity resolved, and the severities mirrored for the disable-comment policy.

import { defineConfig } from 'eslint/config';
import resolveInfoRules from './info-rules.mjs';
import relaxTestsAndStories from './relax-tests-and-stories.mjs';
import withRuleSeverities from './rule-severities.mjs';

/**
 * @typedef {object} FinishOptions
 * @property {import('eslint').Linter.Config[]} overrides - The project's own configs, spread last: through this
 *   option, the disable-comment policy knows their severities.
 */

/**
 * Finishes the configs of a preset.
 *
 * @param {import('eslint').Linter.Config[]} configs - The configs of the preset.
 * @param {FinishOptions} options - The choices of the project.
 * @returns {import('eslint').Linter.Config[]} The final configs, to export with `defineConfig(…)`.
 */
export default function finishConfigs(configs, options) {
  const flattened = defineConfig(configs);
  const all = defineConfig([...flattened, ...relaxTestsAndStories(flattened), ...options.overrides]);
  return withRuleSeverities(resolveInfoRules(all));
}
