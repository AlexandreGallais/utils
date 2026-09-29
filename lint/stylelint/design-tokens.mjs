// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// Design tokens: colors, spacing, radii, shadows, fonts and z-indexes come from the design system custom
// properties (`var(--color-text)`), never raw values; only the token files define raw values. Custom property
// names are kebab-case and start with their category (`--color-…`, `--space-…`).

/** Properties whose values must be tokens (strings, or regular expressions as strings). */
const TOKEN_PROPERTIES = [
  '/color$/',
  'fill',
  'stroke',
  '/^(margin|padding|gap|row-gap|column-gap|inset)/',
  'border-radius',
  'box-shadow',
  'font-family',
  'font-size',
  'z-index',
];

/** Values allowed without a token. */
const KEYWORDS = ['0', 'auto', 'currentcolor', 'inherit', 'initial', 'none', 'transparent', 'unset'];

/**
 * Design token rules.
 *
 * @param {string[]} tokenFiles - Globs of the files that define the tokens, where raw values are allowed.
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function designTokensBlock(tokenFiles) {
  return {
    plugins: ['stylelint-declaration-strict-value'],
    rules: {
      'scale-unlimited/declaration-strict-value': [
        TOKEN_PROPERTIES,
        {
          ignoreValues: KEYWORDS,
          // `margin: 0 var(--space-2)` is checked part by part.
          expandShorthand: true,
          // Colors are tokens even through a function (`rgb()`, `color-mix()`); sizes may use `calc()`.
          ignoreFunctions: { '/color$/': false, fill: false, stroke: false },
          disableFix: true,
          // eslint-disable-next-line no-template-curly-in-string -- placeholders filled by the plugin.
          message: 'Use a design token (var(--…)) for "${property}", not "${value}".',
        },
      ],
      'color-no-hex': true,
      // Tokens are kebab-case and start with their category: `--color-text-muted`, `--space-4`.
      'custom-property-pattern': [
        '^(color|space|size|radius|shadow|font|line-height|z|duration|easing|breakpoint|layer)(-[a-z0-9]+)*$',
        { message: 'Name a token "--<category>-<name>", such as --color-text-muted or --space-4.' },
      ],
    },
    overrides: [
      {
        files: tokenFiles,
        rules: {
          // Token files define the raw values.
          'scale-unlimited/declaration-strict-value': null,
          'color-no-hex': null,
        },
      },
    ],
  };
}
