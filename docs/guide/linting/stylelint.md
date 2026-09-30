# Stylelint

The SCSS of the Angular projects is linted with the same principle as the TypeScript: **trust, and inform**.
An error is a real mistake (an invalid color, an unknown property, a duplicate selector) or a style the autofix
applies on save (the order of the properties, the notation of a color); it cannot be disabled. A warning is a
style that is not clean without being a bug (a `1.5rem`, an `!important`, an `#id`): it can be set aside for one
line, with a reason. Stylelint has no info level.

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
| postcss-scss                  | The SCSS syntax, `//` comments included.                             |

Formatting is Prettier's job (`prettier --write` formats `.scss` too); Stylelint no longer has layout rules, so
the two never disagree.

## The levels

Every rule of the core, of stylelint-scss and of stylelint-order is listed, like the ESLint rules. The
starting point is `stylelint-config-standard-scss`: a rule of its "recommended" part (the possible mistakes) is
an error, a rule the autofix applies is an error, the other standard rules are warnings, the rest is off. Then
the project choices, each with its comment:

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
pnpm add -D stylelint stylelint-scss stylelint-order stylelint-config-recess-order postcss-scss
```

<<< @/../lint/examples/scss.stylelint.config.mjs

`overrides` takes the project's own settings, by files: `[{ files: ['src/legacy/**'], rules: { 'selector-max-id': null } }]`.
