// Stylelint has no flat config: this merges the blocks of lint/stylelint/rules/ into one config. Later blocks win:
// their rules replace the earlier ones; `plugins` and `overrides` add up.

/**
 * Merges Stylelint config blocks.
 *
 * @param {import('stylelint').Config[]} blocks - The blocks, in order.
 * @returns {import('stylelint').Config} One config.
 */
export default function composeStylelint(blocks) {
  /** @type {import('stylelint').Config} */
  let config = { plugins: [], rules: {}, overrides: [] };
  for (const block of blocks) {
    const { plugins = [], rules = {}, overrides = [], ...options } = block;
    config = {
      ...config,
      ...options,
      plugins: [...new Set([...[config.plugins ?? []].flat(), ...[plugins].flat()])],
      rules: { ...config.rules, ...rules },
      overrides: [...(config.overrides ?? []), ...overrides],
    };
  }
  return config;
}
