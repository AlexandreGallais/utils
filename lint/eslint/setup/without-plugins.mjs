// Turns plugins off by keyword, after a profile: `withoutPlugins(angularAppProfile({…}), ['unicorn'])`. Removes
// the plugin and all its rules from every config, and turns back on the rules that were off only because
// the removed plugin covered them (`// Off: duplicate of unicorn/…`), so nothing is left unchecked.

import fs from 'node:fs';
import path from 'node:path';

/** Plugins that cannot be removed: the TypeScript parser and its type-aware rules hold the others. */
const REQUIRED_PLUGINS = new Set(['@typescript-eslint']);
/** The prefix of a reason for a rule turned off, such as `// Off: duplicate of unicorn/no-null.`. */
const OFF_PREFIX = '// Off: ';
/** Punctuation around a rule name in a reason. */
const PUNCTUATION_PATTERN = /[\(\),.:;`]/gv;
const RULE_KEY_PATTERN = /^\s*'(?<rule>[^']+)':/v;

/**
 * Lists the rules turned off because a rule of another plugin covers them.
 *
 * @returns {Map<string, string[]>} The covered rules, by covering plugin.
 */
function readDuplicates() {
  const directory = path.join(import.meta.dirname, '..');
  const covered = new Map();
  const files = fs.readdirSync(directory, { recursive: true }).filter((file) => String(file).endsWith('.mjs'));
  for (const file of files) {
    const lines = fs.readFileSync(path.join(directory, String(file)), 'utf8').split('\n');
    let target;
    for (const line of lines) {
      const rule = RULE_KEY_PATTERN.exec(line)?.groups?.rule;
      if (rule !== undefined && target !== undefined) {
        const plugin = target.slice(0, target.lastIndexOf('/'));
        covered.set(plugin, [...(covered.get(plugin) ?? []), rule]);
      }
      const text = line.trim();
      target = text.startsWith(OFF_PREFIX)
        ? text
            .slice(OFF_PREFIX.length)
            .split(' ')
            .map((word) => word.replaceAll(PUNCTUATION_PATTERN, ''))
            .find((word) => word.includes('/'))
        : undefined;
    }
  }
  return covered;
}

/**
 * Removes plugins from a profile.
 *
 * @param {import('eslint').Linter.Config[]} configs - The configs of a profile.
 * @param {string[]} plugins - The plugin keys to remove, as written before the `/` of their rules, such as
 *   `unicorn`, `sonarjs`, `regexp`, `jsdoc`, `vitest`, `import-x`, `check-file`, `rxjs-x`, `boundaries`.
 * @returns {import('eslint').Linter.Config[]} The configs without these plugins.
 */
export default function withoutPlugins(configs, plugins) {
  const known = new Set(configs.flatMap((config) => Object.keys(config.plugins ?? {})));
  for (const plugin of plugins) {
    if (!known.has(plugin) || REQUIRED_PLUGINS.has(plugin)) {
      throw new TypeError(`cannot remove the plugin "${plugin}"; removable: ${[...known].join(', ')}`);
    }
  }
  const removed = new Set(plugins);
  const duplicates = readDuplicates();
  const restored = new Set(plugins.flatMap((plugin) => duplicates.get(plugin) ?? []));
  /**
   * Tells whether a rule belongs to a removed plugin.
   *
   * @param {string} rule - The rule name.
   * @returns {boolean} Whether it is removed.
   */
  function isRemoved(rule) {
    return rule.includes('/') && removed.has(rule.slice(0, rule.lastIndexOf('/')));
  }
  return configs.map((config) => {
    if (config.rules === undefined && config.plugins === undefined) {
      return config;
    }
    const rules = Object.fromEntries(
      Object.entries(config.rules ?? {})
        .filter(([rule]) => !isRemoved(rule))
        .map(([rule, value]) => [rule, restored.has(rule) && !isRemoved(rule) ? ['error'] : value]),
    );
    const kept = Object.entries(config.plugins ?? {}).filter(([plugin]) => !removed.has(plugin));
    return { ...config, rules, plugins: Object.fromEntries(kept) };
  });
}
