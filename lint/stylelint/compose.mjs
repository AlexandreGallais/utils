// Stylelint has no flat config: this merges the blocks of lint/stylelint/ into one config. Later blocks win:
// their rules replace the earlier ones; `extends`, `plugins` and `overrides` add up.

/**
 * Merges Stylelint config blocks.
 *
 * @param {import('stylelint').Config[]} blocks - The blocks, in order.
 * @returns {import('stylelint').Config} One config.
 */
export default function composeStylelint(blocks) {
  /** @type {import('stylelint').Config} */
  const config = { extends: [], plugins: [], rules: {}, overrides: [] };
  for (const block of blocks) {
    const { extends: extended = [], plugins = [], rules = {}, overrides = [], ...options } = block;
    config.extends = [...new Set([...[config.extends].flat(), ...[extended].flat()])];
    config.plugins = [...new Set([...[config.plugins].flat(), ...[plugins].flat()])];
    config.rules = { ...config.rules, ...rules };
    config.overrides = [...(config.overrides ?? []), ...overrides];
    Object.assign(config, options);
  }
  return config;
}
