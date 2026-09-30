// The third severity, `info`: a suggestion ("this could also be written…"), shown in the editor and never
// blocking. ESLint knows `off`, `warn` and `error` only, so a block writes `['info']` and this turns it into:
// - `off` on the command line (`pnpm lint`, the CI), where `ESLINT_INFO_RULES=off` is set;
// - `warn` in the editor, which shows it in blue: lint/eslint/editor-settings.mjs writes the list of info rules
//   into the `eslint.rules.customizations` of `.vscode/settings.json`.
// The names of the info rules are kept in `settings.local.infoRules` for that script.

/**
 * Turns the `info` severity into `warn` (editor) or `off` (command line), and records the info rules.
 *
 * @param {import('eslint').Linter.Config[]} configs - The configs, flattened.
 * @returns {import('eslint').Linter.Config[]} The configs, valid for ESLint.
 */
export default function resolveInfoRules(configs) {
  // Read at each call: a script may set the variable after importing the presets.
  const severity = process.env.ESLINT_INFO_RULES === 'off' ? 'off' : 'warn';
  return configs.map((config) => {
    const infoRules = Object.entries(config.rules ?? {}).filter(([, value]) => [value].flat()[0] === 'info');
    if (infoRules.length === 0) {
      return config;
    }
    const rules = { ...config.rules };
    for (const [rule, value] of infoRules) {
      rules[rule] = [severity, ...[value].flat().slice(1)];
    }
    const recorded = Object.fromEntries(infoRules.map(([rule]) => [rule, true]));
    const local = { ...config.settings?.local, infoRules: { ...config.settings?.local?.infoRules, ...recorded } };
    return { ...config, rules, settings: { ...config.settings, local } };
  });
}
