// Mirrors the severity of every rule in `settings.local.ruleSeverities`, config by config: ESLint merges the
// settings of the configs that match a file like it merges their rules, so a rule reads the resolved severity
// of any other rule for that file. local/disable-only-warnings uses it to refuse disabling an `error`.

import { defineConfig } from 'eslint/config';

const SEVERITIES = new Map([
  ['off', 0],
  ['warn', 1],
  ['error', 2],
]);

/**
 * Reads the severity of a rule setting.
 *
 * @param {unknown} value - The setting, such as `'error'`, `2` or `['warn', { max: 3 }]`.
 * @returns {number} 0 (off), 1 (warn) or 2 (error).
 */
function severityOf(value) {
  const [severity] = [value].flat();
  return typeof severity === 'number' ? severity : (SEVERITIES.get(String(severity)) ?? 0);
}

/**
 * Adds the severities of its rules to each config. Apply it to the whole config, last.
 *
 * @param {import('eslint').Linter.Config[]} configs - Every config of the project.
 * @returns {import('eslint').Linter.Config[]} The same configs, flattened, with the severities in their settings.
 */
export default function withRuleSeverities(configs) {
  return defineConfig(configs).map((config) => {
    if (config.rules === undefined) {
      return config;
    }
    const ruleSeverities = Object.fromEntries(
      Object.entries(config.rules).map(([rule, value]) => [rule, severityOf(value)]),
    );
    const local = { ...config.settings?.local, ruleSeverities };
    return { ...config, settings: { ...config.settings, local } };
  });
}
