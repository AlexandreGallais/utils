# Stylelint

The SCSS of the Angular projects is linted with the same principle as the TypeScript: **trust, and inform**.
An error is a real mistake (an invalid color, an unknown property, a duplicate, deprecated syntax) or a style fixed
on save (the order of the properties, the Prettier formatting); it cannot be disabled. A warning is a choice to justify (a `1.5rem`, an
`!important`, an `#id`): it can be set aside for one line, with a reason. Notations (`#fff` or `#ffffff`,
`rgb()` or `rgba()`, quotes, case), vendor prefixes (added by the Angular build) and the font
fallbacks (the UIs run offline with their fonts) are free: they are off. Stylelint has no info level.

```
lint/stylelint/
  rules/       one file per concept: colors, fonts, selectors, at-rules, declarations, values and units,
               comments, general, SCSS, order, disable comments; local/ holds the rule written here
  setup/       compose.mjs merges the blocks (Stylelint has no flat config)
  presets/     scss.mjs: the one import of a project's stylelint.config.mjs
  index.mjs    `import { scssPreset } from './lint/stylelint/index.mjs'`
```

## Plugins

| Plugin                        | Why                                                                  |
| ----------------------------- | -------------------------------------------------------------------- |
| Stylelint core                | Invalid or unknown CSS, and the conventions of the standard config.  |
| stylelint-scss                | Sass: `@use`, variables, mixins, placeholders, operators.            |
| stylelint-order               | Custom properties, variables, declarations, then nested rules.       |
| stylelint-config-recess-order | The order of the properties, grouped by role (position, box, text…). |
| stylelint-prettier            | Prettier as a rule: badly formatted SCSS is an error, fixed on save. |
| postcss-scss                  | The SCSS syntax, `//` comments included.                             |

Formatting is Prettier's job, run inside Stylelint by `stylelint-prettier` (`prettier/prettier`, like
`eslint-plugin-prettier` for the TypeScript): it reads `.prettierrc.json`, and `pnpm lint:css:fix` formats the files.
Stylelint has no layout rules left, so the two never disagree.

## Error or warning

Every rule of the core, of stylelint-scss and of stylelint-order is listed, like the ESLint rules. The
possible mistakes of `stylelint-config-standard-scss` are errors; its notation, naming and formatting rules are
off, so that the lint never gets in the way. Then the project choices, each with its comment:

| Rule                                         | Level   | Why                                                                    |
| -------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| `declaration-property-value-disallowed-list` | warning | `rem` values are whole steps (`1rem`, `2rem`): `1.25rem` is not clean. |
| `color-named`                                | warning | Colors come from variables or custom properties, not `red`.            |
| `declaration-no-important`                   | warning | `!important` wins over everything; justify it.                         |
| `selector-max-id`                            | warning | An `#id` is too specific to override.                                  |
| `max-nesting-depth` (3)                      | warning | Deeper SCSS gives long, over-specific selectors.                       |
| `selector-max-compound-selectors` (4)        | warning | A long selector is fragile.                                            |
| `selector-pseudo-element-disallowed-list`    | warning | `::ng-deep` is deprecated by Angular.                                  |
| `selector-type-no-unknown`                   | error   | Angular component selectors (`app-user-list`) are allowed.             |
| `no-descending-specificity`                  | warning | Often a false alarm with nesting.                                      |
| `order/order`, `order/properties-order`      | error   | Fixed on save.                                                         |

The [rule reference](/lint-rules/) lists every rule, by concept.

## Disabling a rule

The same policy as ESLint: `// stylelint-disable-next-line <rule> -- <reason>`, one line, named rules, only a
rule set to `warning` (`local/disable-only-warnings`), a reason expected (a warning otherwise), and a disable that
is no longer needed is an error.

```scss
.dialog {
  // stylelint-disable-next-line declaration-no-important -- overrides the inline style of a third-party widget.
  z-index: 10 !important;
}
```

## Set up a project

```sh
pnpm add -D stylelint stylelint-scss stylelint-order stylelint-config-recess-order stylelint-prettier postcss-scss
```

<<< @/../lint/examples/scss.stylelint.config.mjs

`overrides` takes the project's own settings, by files: `[{ files: ['src/legacy/**'], rules: { 'selector-max-id': null } }]`.
