// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// Cascade layers: every `@layer` comes from the order declared by the design system. The order decides which
// rule wins, before specificity: `@layer reset, tokens, base, layout, components, utilities, overrides;`.

/** The rule checking the layer names, a plugin of this folder. */
const LAYER_RULE_URL = new URL('rules/layer-name-allowed-list.mjs', import.meta.url);

/**
 * Cascade layer rules.
 *
 * @param {string[]} layerNames - The layers of the design system, in cascade order.
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function layersBlock(layerNames) {
  return {
    plugins: [LAYER_RULE_URL.pathname],
    rules: {
      // An array primary option is wrapped in an array (Stylelint reads `[a, b]` as option and secondary options).
      'design-system/layer-name-allowed-list': [layerNames],
    },
  };
}
