// Stylelint profiles: the styles of a design system library and of the applications built on it. Both get the
// base, SCSS, order, strictness, design tokens, cascade layers, animation performance and Prettier blocks;
// accessibility and logical properties are chosen per project.

import accessibilityBlock from '../stylelint/accessibility.mjs';
import baseBlock from '../stylelint/base.mjs';
import composeStylelint from '../stylelint/compose.mjs';
import designTokensBlock from '../stylelint/design-tokens.mjs';
import layersBlock from '../stylelint/layers.mjs';
import logicalPropertiesBlock from '../stylelint/logical-properties.mjs';
import orderBlock from '../stylelint/order.mjs';
import performanceBlock from '../stylelint/performance.mjs';
import prettierBlock from '../stylelint/prettier.mjs';
import scssBlock from '../stylelint/scss.mjs';
import strictnessBlock from '../stylelint/strictness.mjs';

/** The cascade layers of the design system, in order: a later layer wins, whatever the specificity. */
export const DESIGN_SYSTEM_LAYERS = ['reset', 'tokens', 'base', 'layout', 'components', 'utilities', 'overrides'];

/**
 * @typedef {object} StylelintOptions
 * @property {string[]} tokenFiles - Globs of the files defining the tokens (raw values allowed there).
 * @property {string[]} layerNames - The cascade layers allowed, such as DESIGN_SYSTEM_LAYERS.
 * @property {boolean} isAccessible - Whether the styles must meet the accessibility rules.
 * @property {boolean} usesLogicalProperties - Whether the layout must mirror for right-to-left languages.
 */

/**
 * Lints the SCSS of a design system library or of an application.
 *
 * @param {StylelintOptions} options - The project and its choices.
 * @returns {import('stylelint').Config} The config, to export from stylelint.config.mjs.
 */
export default function stylelintProfile(options) {
  return composeStylelint([
    baseBlock(),
    scssBlock(),
    orderBlock(),
    strictnessBlock(),
    designTokensBlock(options.tokenFiles),
    layersBlock(options.layerNames),
    performanceBlock(),
    ...(options.isAccessible ? [accessibilityBlock()] : []),
    ...(options.usesLogicalProperties ? [logicalPropertiesBlock()] : []),
    prettierBlock(),
  ]);
}
