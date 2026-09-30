// Preset: the SCSS of an Angular project (a library, an application). The only import of its
// stylelint.config.mjs (see lint/examples/). Every rule listed, by concept, with the same levels as ESLint: an
// error is a real mistake or a style fixed on save, a warning is a style without autofix.

import postcssScss from 'postcss-scss';
import atRulesBlock from '../rules/at-rules.mjs';
import colorsBlock from '../rules/colors.mjs';
import commentsBlock from '../rules/comments.mjs';
import declarationsBlock from '../rules/declarations.mjs';
import disableCommentsBlock from '../rules/disable-comments.mjs';
import fontsBlock from '../rules/fonts.mjs';
import generalBlock from '../rules/general.mjs';
import orderBlock from '../rules/order.mjs';
import scssBlock from '../rules/scss.mjs';
import selectorsBlock from '../rules/selectors.mjs';
import valuesAndUnitsBlock from '../rules/values-and-units.mjs';
import composeStylelint from '../setup/compose.mjs';

/**
 * @typedef {object} ScssOptions
 * @property {NonNullable<import('stylelint').Config['overrides']>} overrides - The project's own settings, by files,
 *   such as `[{ files: ['src/legacy/**'], rules: { 'selector-max-id': null } }]`, or `[]`.
 */

/**
 * Lints the SCSS of an Angular project.
 *
 * @param {ScssOptions} options - The choices of the project.
 * @returns {import('stylelint').Config} The config, to export from stylelint.config.mjs.
 */
export default function scssPreset(options) {
  return composeStylelint([
    // SCSS only: the Sass syntax, `//` comments included.
    { customSyntax: postcssScss },
    generalBlock(),
    atRulesBlock(),
    colorsBlock(),
    commentsBlock(),
    declarationsBlock(),
    fontsBlock(),
    selectorsBlock(),
    valuesAndUnitsBlock(),
    scssBlock(),
    orderBlock(),
    disableCommentsBlock(),
    { overrides: options.overrides },
  ]);
}
