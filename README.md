# utils

Strict, dependency-free TypeScript utilities, copied into the simulation UIs (Angular) that refresh values up to ~1 000 times per second: numbers, SVG elements as seen on screen and gauges drawn around them, colors, enums, guards, strings and types.

- **One function or class per file**, with the types that belong to it, in a folder per theme with its `index.ts` and its specs. Copy a folder into another project; [`docs/FUNCTIONS.md`](docs/FUNCTIONS.md) lists the files each function needs.
- **Simple and fast**: trusted inputs, no allocation in hot paths, caches only where they always pay, every optimisation measured in [`benchmarks/`](benchmarks).
- **Strict**: TypeScript strict mode, an exhaustive ESLint configuration, 100 % test coverage (the SVG specs run in Chromium), every export documented with an example.

The requirements and design decisions are in [`docs/SPEC.md`](docs/SPEC.md); the coding rules in [`AGENTS.md`](AGENTS.md); the signatures of the functions removed until a project needs them in [`docs/REMOVED.md`](docs/REMOVED.md). The **wiki** (one searchable page per function, with its tests and source) is published on GitHub Pages at each push to `main`: https://alexandregallais.github.io/utils/.

## Conventions

- **Angles** are in degrees, 0° up and clockwise (SVG coordinates, compass headings), everywhere.
- **Defaults in the signature** for the settings (`formatNumber(value)`, `svgRotateBy(15)`); no `null`: pass `value ?? undefined` to get a default.
- **Inputs are trusted**: no argument validation; a `parse…` function throws a single `TypeError` when its text does not match the expected format.
- **Arguments are never mutated**: functions return new arrays and objects.

## Examples

```ts
import { formatNumber, remap, roundToStep } from 'utils';

label.textContent = formatNumber(speed, '1.1-1'); // '12.5'
const angle = remap(speed, 0, 40, -135, 135, true); // a needle angle, stopped at the ends
const setpoint = roundToStep(dragged, 0.5); // 12.5, without float noise
```

```ts
import { applySvgTransforms, createSvgArcPath, createSvgArcTicksPath, svgFlipTo, svgPlaceOn, svgRotateBy, svgRotateTo } from 'utils';

// a round gauge drawn around its hub, whatever the groups of each element
const arc = { center: hub, radius: 40, startAngle: -135, sweepAngle: 270 };
track.setAttribute('d', createSvgArcPath(track, arc));
majorTicks.setAttribute('d', createSvgArcTicksPath(majorTicks, arc, 4, 8));

// the needle: unmirrored, upright, its foot on the hub, then turned at each frame
const rotation = svgRotateBy(0, 'center', hub);
applySvgTransforms(needle, [svgFlipTo(false), svgRotateTo(0), svgPlaceOn(hub, 'center', 'bottom'), rotation]);
rotation.set(angle, 'center', hub);
```

## Functions

Generated from the JSDoc of the sources (`pnpm docs:catalog`); each name links to its file, where the full documentation and examples are.

<!-- functions:start -->

### async

Async: waiting, cancellable with an abort signal.

| Export                        | What it does                                                                |
| ----------------------------- | --------------------------------------------------------------------------- |
| [`sleep`](src/async/sleep.ts) | Waits for a delay, cancellable with an `AbortSignal` that clears the timer. |

### color

Colors: the fill of an SVG element, and the black or white text that reads best on it.

| Export                                                               | What it does                                                                                             |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`getContrastingTextColor`](src/color/get-contrasting-text-color.ts) | Picks the text color, pure black or pure white, that reads best on a background.                         |
| [`getSvgFillColor`](src/color/get-svg-fill-color.ts)                 | Reads the fill color of an SVG element as rendered, whatever sets it: attribute, class, inherited style. |
| [`Rgb`](src/color/rgb.ts) _(type)_                                   | An sRGB color, each channel from 0 to 255.                                                               |

### duration

Durations: parsing a .NET TimeSpan into milliseconds.

| Export                                             | What it does                                                                                                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`parseTimeSpan`](src/duration/parse-time-span.ts) | Parses a .NET `TimeSpan` into milliseconds: the constant format `c` (`1.02:03:04.5670000`, the JSON one) or the general formats `g` / `G` (`1:02:03:04.567`). |

### enum

Enums: listing members, checking and reading untyped values, literal types.

| Export                                             | What it does                                                                                                                                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`EnumLiteral`](src/enum/enum-literal.ts) _(type)_ | Turns an enum type into the union of its literal values, so plain literals are accepted where the enum is expected: `'idle' \| 'running'` for a string enum, `0 \| 1` for a numeric one. |
| [`EnumObject`](src/enum/enum-object.ts) _(type)_   | Any TypeScript enum, or a `const` object used as one.                                                                                                                                    |
| [`getEnumEntries`](src/enum/get-enum-entries.ts)   | Lists the members of an enum as `[name, value]` pairs, without the reverse mapping of numeric enums.                                                                                     |
| [`getEnumKey`](src/enum/get-enum-key.ts)           | Finds the member name of an enum value, string enums included: a readable name for a log or a translation key.                                                                           |
| [`getEnumKeys`](src/enum/get-enum-keys.ts)         | Lists the member names of an enum, without the reverse mapping of numeric enums.                                                                                                         |
| [`getEnumValues`](src/enum/get-enum-values.ts)     | Lists the values of an enum, without the names of the reverse mapping of numeric enums.                                                                                                  |
| [`isEnumValue`](src/enum/is-enum-value.ts)         | Checks whether a value is one of the values of an enum, in O(1): the values of each enum are read once.                                                                                  |
| [`parseEnumValue`](src/enum/parse-enum-value.ts)   | Reads an enum member from a text, such as a query parameter: `'1'` gives the member of value `1`.                                                                                        |
| [`toEnumValue`](src/enum/to-enum-value.ts)         | Returns a value typed as an enum member: the value itself when it belongs to the enum, the fallback otherwise.                                                                           |

### format

Formatting: numbers as display text.

| Export                                          | What it does                                                                                          |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`formatDecimal`](src/format/format-decimal.ts) | Formats a number with `.` before the decimals, no trailing zeros, no scientific notation and no `-0`. |
| [`formatNumber`](src/format/format-number.ts)   | Formats a number like Angular's `DecimalPipe`: digits driven by `digitsInfo`, separators of a locale. |

### guard

Guards: type guards and assertions that narrow values (the enum guards are in `enum`).

| Export                                               | What it does                                                                                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`assert`](src/guard/assert.ts)                      | Throws when a condition is falsy, and narrows its type otherwise.                                                                                                         |
| [`assertNever`](src/guard/assert-never.ts)           | Marks a code path as unreachable: in the `default` of a `switch` over a union, TypeScript fails when a member is not handled, and an unexpected value throws at run time. |
| [`isArray`](src/guard/is-array.ts)                   | Checks whether a value is an array, whatever its items.                                                                                                                   |
| [`isArrayOf`](src/guard/is-array-of.ts)              | Checks whether a value is an array whose every item passes a type guard.                                                                                                  |
| [`isBoolean`](src/guard/is-boolean.ts)               | Checks whether a value is a boolean.                                                                                                                                      |
| [`isDefined`](src/guard/is-defined.ts)               | Checks whether a value is neither `null` nor `undefined`: the opposite of `isNullish`.                                                                                    |
| [`isFiniteNumber`](src/guard/is-finite-number.ts)    | Checks whether a value is a finite number: neither `NaN` nor an infinity.                                                                                                 |
| [`isFunction`](src/guard/is-function.ts)             |                                                                                                                                                                           |
| [`isNonEmptyArray`](src/guard/is-non-empty-array.ts) | Checks whether an array has an item, and narrows it so that its first item is defined.                                                                                    |
| [`isNotUndefined`](src/guard/is-not-undefined.ts)    | Checks whether a value is not `undefined`; `null` passes, unlike with `isDefined`.                                                                                        |
| [`isNull`](src/guard/is-null.ts)                     | Checks whether a value is `null`; `undefined` does not pass.                                                                                                              |
| [`isNullish`](src/guard/is-nullish.ts)               | Checks whether a value is `null` or `undefined`: the opposite of `isDefined`.                                                                                             |
| [`isNumber`](src/guard/is-number.ts)                 | Checks whether a value is a number other than `NaN`.                                                                                                                      |
| [`isObject`](src/guard/is-object.ts)                 | Checks whether a value is a non-null object: plain object, array, class instance, date… `isRecord` accepts plain objects only.                                            |
| [`isRecord`](src/guard/is-record.ts)                 | Checks whether a value is a plain object: an object literal or `Object.create(null)`.                                                                                     |
| [`isString`](src/guard/is-string.ts)                 | Checks whether a value is a string primitive.                                                                                                                             |
| [`isUndefined`](src/guard/is-undefined.ts)           | Checks whether a value is `undefined`; `null` does not pass.                                                                                                              |

### math

Math: clamping, interpolation, wrapping, rounding without float noise, smoothing.

| Export                                                                | What it does                                                                                                                                                            |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`applyHysteresis`](src/math/apply-hysteresis.ts)                     | Updates an on/off state with hysteresis: on at or above `highThreshold`, off at or below `lowThreshold`, unchanged in between.                                          |
| [`ceilToStep`](src/math/ceil-to-step.ts)                              | Rounds a number up to a multiple of a step, without float noise.                                                                                                        |
| [`clamp`](src/math/clamp.ts)                                          | Restricts a number to an interval.                                                                                                                                      |
| [`floorToStep`](src/math/floor-to-step.ts)                            | Rounds a number down to a multiple of a step, without float noise.                                                                                                      |
| [`hasSignificantChange`](src/math/has-significant-change.ts)          | Checks whether a value moved enough since the displayed one to be worth a render (a deadband).                                                                          |
| [`interpolateTable`](src/math/interpolate-table.ts)                   | Reads a lookup table with linear interpolation between its points, such as a calibration curve or a tank gauging table.                                                 |
| [`inverseLerp`](src/math/inverse-lerp.ts)                             | Computes where a value sits between two numbers: the inverse of `lerp`.                                                                                                 |
| [`isBetween`](src/math/is-between.ts)                                 | Checks whether a number lies between two bounds.                                                                                                                        |
| [`isNearlyEqual`](src/math/is-nearly-equal.ts)                        | Checks whether two numbers are equal within a tolerance, relative for large numbers and absolute near zero.                                                             |
| [`lerp`](src/math/lerp.ts)                                            | Interpolates linearly between two numbers, exact at both ends and extrapolated outside [0, 1].                                                                          |
| [`moveTowards`](src/math/move-towards.ts)                             | Moves a value towards a target at a limited rate (a slew-rate limiter), whatever the frame rate: a needle or a rudder that cannot jump.                                 |
| [`ratio`](src/math/ratio.ts)                                          | Divides a value by a total, without `NaN` or `Infinity`.                                                                                                                |
| [`remap`](src/math/remap.ts)                                          | Maps a value from an input range to an output range, such as a sensor reading to a gauge angle.                                                                         |
| [`roundToFractionDigits`](src/math/round-to-fraction-digits.ts)       | Rounds a number to a number of decimals, half away from zero, with plain arithmetic: the same result as `Number(formatDecimal(value, maxFractionDigits))`, much faster. |
| [`roundToSignificantDigits`](src/math/round-to-significant-digits.ts) | Rounds a number to a number of significant digits, whatever its magnitude.                                                                                              |
| [`roundToStep`](src/math/round-to-step.ts)                            | Rounds a number to the nearest multiple of a step, without float noise: `roundToStep(0.3, 0.1)` is `0.3`.                                                               |
| [`smoothTowards`](src/math/smooth-towards.ts)                         | Moves a value towards a target with exponential smoothing, whatever the frame rate: about 63 % of the distance is covered every `timeConstantMs`.                       |
| [`wrap`](src/math/wrap.ts)                                            | Wraps a number into [min, max[ with an always-positive modulo, like a heading wrapping at 360°.                                                                         |

### object

Objects: picking, omitting, mapping values, emptiness and equality.

| Export                                             | What it does                                                                                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`deepMerge`](src/object/deep-merge.ts)            | Applies a partial patch to nested settings, such as saved preferences over the defaults: plain objects are merged at every depth, other values replace, `undefined` keeps.     |
| [`isDeepEqual`](src/object/is-deep-equal.ts)       | Checks whether two values are equal at every depth: primitives (`NaN` equals `NaN`), arrays, objects with the same prototype, `Date`, `RegExp`, `Map`, `Set` and typed arrays. |
| [`isEmpty`](src/object/is-empty.ts)                | Checks whether a container holds nothing: an empty string, array, `Map`, `Set` or object.                                                                                      |
| [`isShallowEqual`](src/object/is-shallow-equal.ts) | Checks whether two values are equal at the first level, with `Object.is`: skips an update when a new object carries the same values as the previous one.                       |
| [`mapValues`](src/object/map-values.ts)            | Transforms every value of an object, keeping its keys.                                                                                                                         |
| [`omit`](src/object/omit.ts)                       | Copies an object without some of its properties, without `delete`, which slows down V8.                                                                                        |
| [`pick`](src/object/pick.ts)                       | Copies some properties of an object into a new one.                                                                                                                            |

### path

Paths: joining URL segments.

| Export                              | What it does                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [`joinPath`](src/path/join-path.ts) | Joins URL path segments with `/`, ignoring empty segments and collapsing repeated slashes, except the `//` of a protocol. |

### string

Strings: case conversion, word splitting, truncation, escaping, templating, number extraction.

| Export                                                   | What it does                                                                                                                           |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`camelCase`](src/string/camel-case.ts)                  | Converts a string to camelCase; acronyms are words (`XMLHttpRequest` → `xmlHttpRequest`).                                              |
| [`capitalize`](src/string/capitalize.ts)                 | Upper-cases the first character of a string, even outside the basic Unicode plane.                                                     |
| [`constantCase`](src/string/constant-case.ts)            | Converts a string to CONSTANT_CASE: uppercase words joined with `_`, as in constants and environment variables.                        |
| [`createIdGenerator`](src/string/create-id-generator.ts) | Creates a generator of readable unique ids: `gauge-1`, `gauge-2`… for SVG gradients, clip paths or markers.                            |
| [`dotCase`](src/string/dot-case.ts)                      | Converts a string to dot.case: lower-case words joined with `.`, as in translation keys and property paths.                            |
| [`escapeHtml`](src/string/escape-html.ts)                | Escapes the characters that have a meaning in HTML (`& < > " '`), to insert a text in markup.                                          |
| [`escapeRegExp`](src/string/escape-reg-exp.ts)           | Escapes a text so that it matches literally in a regular expression, `v` flag included.                                                |
| [`extractNumber`](src/string/extract-number.ts)          | Extracts the first number of a text, with `.` or `,` before the decimals: `1,234` is `1.234`.                                          |
| [`extractNumbers`](src/string/extract-numbers.ts)        | Extracts every number of a text, with the rules of `extractNumber`.                                                                    |
| [`formatTemplate`](src/string/format-template.ts)        | Replaces the `{key}` placeholders of a template with values.                                                                           |
| [`isBlank`](src/string/is-blank.ts)                      | Checks whether a text is missing or holds only whitespace: a required field left empty.                                                |
| [`kebabCase`](src/string/kebab-case.ts)                  | Converts a string to kebab-case: lowercase words joined with `-`, as in file names, CSS classes and URLs.                              |
| [`lowerCase`](src/string/lower-case.ts)                  | Converts a string to lower-case words separated by spaces, splitting identifiers such as `camelCase`.                                  |
| [`pascalCase`](src/string/pascal-case.ts)                | Converts a string to PascalCase: words joined, each capitalized, the rest in lower case.                                               |
| [`pluralize`](src/string/pluralize.ts)                   | Picks the singular or plural form of a word for a count.                                                                               |
| [`removeDiacritics`](src/string/remove-diacritics.ts)    | Removes the accents of a text (`Été` → `Ete`), to search or sort without them.                                                         |
| [`sentenceCase`](src/string/sentence-case.ts)            | Converts an identifier to a sentence, to turn a key into a label: the first word capitalized, the others in lower case, acronyms kept. |
| [`slugify`](src/string/slugify.ts)                       | Turns a text into a URL- and id-friendly slug: accents removed, lower-case words joined with `-`.                                      |
| [`snakeCase`](src/string/snake-case.ts)                  | Converts a string to snake_case: lowercase words joined with `_`, as in database columns and JSON keys.                                |
| [`splitWords`](src/string/split-words.ts)                | Splits a string into words, whatever its case style (camelCase, kebab-case, snake_case, spaces…), in one pass.                         |
| [`squish`](src/string/squish.ts)                         | Trims a text and collapses every run of whitespace, line breaks included, into a single space.                                         |
| [`titleCase`](src/string/title-case.ts)                  | Converts a string to Title Case: words separated by spaces, each capitalized, acronyms kept.                                           |
| [`toCsv`](src/string/to-csv.ts)                          | Builds CSV text (RFC 4180): fields are quoted when needed, lines end with CRLF.                                                        |
| [`trainCase`](src/string/train-case.ts)                  | Converts a string to Train-Case: capitalized words joined with `-`, as in HTTP header names.                                           |
| [`truncate`](src/string/truncate.ts)                     | Shortens a string to a maximum length, with an ellipsis when it is cut.                                                                |
| [`uncapitalize`](src/string/uncapitalize.ts)             | Lower-cases the first character of a string and leaves the rest unchanged: the reverse of `capitalize`.                                |
| [`upperCase`](src/string/upper-case.ts)                  | Converts a string to upper-case words separated by spaces, splitting identifiers such as `camelCase`.                                  |

### svg-shape

SVG shapes: the `d` of arcs, ticks and pies around an element, and of ranges and ticks along a bar, in any group.

| Export                                                                | What it does                                                                                                                                                           |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`createSvgArcPath`](src/svg-shape/create-svg-arc-path.ts)            | Creates the `d` of an arc around the center of an element, in any group: the track of a gauge around its hub.                                                          |
| [`createSvgArcTicksPath`](src/svg-shape/create-svg-arc-ticks-path.ts) | Creates the `d` of evenly spaced graduations along an arc, around the center of an element in any group: `count` intervals give `count + 1` ticks.                     |
| [`createSvgBarRangePath`](src/svg-shape/create-svg-bar-range-path.ts) | Creates the `d` of the part of a bar between two ratios, across its whole thickness, in any group: the fill level of a bar graph (0 to the value) or a threshold zone. |
| [`createSvgBarTicksPath`](src/svg-shape/create-svg-bar-ticks-path.ts) | Creates the `d` of evenly spaced graduations along a bar, in any group: `count` intervals give `count + 1` ticks, across the bar from one of its sides.                |
| [`createSvgPiePath`](src/svg-shape/create-svg-pie-path.ts)            | Creates the `d` of a pie slice joined to the center of an element, in any group: a radar sector, a remaining-time disk, to fill.                                       |
| [`getSvgArcPoint`](src/svg-shape/get-svg-arc-point.ts)                | Finds a point along an arc, in the coordinates of an element of any group: where to put the label of a graduation or a marker.                                         |
| [`SvgArc`](src/svg-shape/svg-arc.ts) _(type)_                         | An arc around the center of an element, for `createSvgArcPath` and its siblings (0° up, clockwise).                                                                    |
| [`SvgBar`](src/svg-shape/svg-bar.ts) _(type)_                         | A bar gauge laid on the box of an element, for `createSvgBarRangePath` and `createSvgBarTicksPath`.                                                                    |

### svg-transform

SVG transforms: orders applied one after the other and changed later, and anchors across groups.

| Export                                                                   | What it does                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Anchor`](src/svg-transform/anchor.ts) _(type)_                         | One of the 9 points of a box: its corners, the middles of its sides, its center.                                                                                                                                                            |
| [`applySvgTransforms`](src/svg-transform/apply-svg-transforms.ts)        | Applies orders to an SVG element, in order, each on what the previous ones give: one transform per order is added at the end of its `transform` list.                                                                                       |
| [`clearSvgTransforms`](src/svg-transform/clear-svg-transforms.ts)        | Empties the `transform` list of an SVG element: it is drawn without any transform.                                                                                                                                                          |
| [`getSvgAnchorPoint`](src/svg-transform/get-svg-anchor-point.ts)         | Finds an anchor of the box an SVG element takes on screen: a corner, the middle of a side or the center.                                                                                                                                    |
| [`getSvgAnchorPointIn`](src/svg-transform/get-svg-anchor-point-in.ts)    | Finds an anchor of an element as seen on screen, in the coordinates of another element, whatever groups lie between: the center of a hub for the `setRotate` of a needle drawn in another group.                                            |
| [`svgFlipTo`](src/svg-transform/svg-flip-to.ts)                          | An order of `applySvgTransforms` that makes the element mirrored or not, as seen on screen, around one of its anchors: `svgFlipTo(false)` makes a mirrored text readable again.                                                             |
| [`svgPlaceOn`](src/svg-transform/svg-place-on.ts)                        | An order of `applySvgTransforms` that moves the element so that one of its anchors lands on an anchor of another element, as seen on screen, whatever groups each one is in.                                                                |
| [`svgRotateBy`](src/svg-transform/svg-rotate-by.ts)                      | An order of `applySvgTransforms` that turns the element by an angle from its position before this order, clockwise on screen, around an anchor of itself or of another element: `set(90)` after `set(3)` gives 90° from the start, not 93°. |
| [`svgRotateTo`](src/svg-transform/svg-rotate-to.ts)                      | An order of `applySvgTransforms` that turns the element to an absolute angle on screen, clockwise from upright, around an anchor of itself or of another element: `svgRotateTo(0)` straightens it.                                          |
| [`svgScaleBy`](src/svg-transform/svg-scale-by.ts)                        | An order of `applySvgTransforms` that enlarges or shrinks the element in its own axes, around an anchor of its drawing, which gives the direction: with `'left'`, it grows to the right; with `'bottom'`, upwards.                          |
| [`SvgTransformOrder`](src/svg-transform/svg-transform-order.ts) _(type)_ | An order of `applySvgTransforms`, created by `svgRotateBy`, `svgRotateTo`, `svgFlipTo`, `svgScaleBy`, `svgTranslateBy` or `svgPlaceOn`: keep it to change its values later with `set`.                                                      |
| [`svgTranslateBy`](src/svg-transform/svg-translate-by.ts)                | An order of `applySvgTransforms` that moves the element along its own axes, in its own units: turned by 90°, "to the right" goes down on screen.                                                                                            |

### types

Types: TypeScript utility types.

| Export                                                               | What it does                                                                                                                                                                                        |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AnyFunction`](src/types/any-function.ts) _(type)_                  | A type for any function, for generic constraints such as `F extends AnyFunction` (safer than `Function`, which also accepts classes and has an untyped call).                                       |
| [`Awaitable`](src/types/awaitable.ts) _(type)_                       | A value that is returned directly or through a promise: the result of a callback that may be sync or async.                                                                                         |
| [`Brand`](src/types/brand.ts) _(type)_                               | A nominal type: a `T` that cannot be mixed up with another `T` of a different brand.                                                                                                                |
| [`Constructor`](src/types/constructor.ts) _(type)_                   | A type for any class producing a `T`: mixins, dependency injection tokens, `instanceof` helpers.                                                                                                    |
| [`DeepPartial`](src/types/deep-partial.ts) _(type)_                  | Makes every property optional, at every depth: a patch of a nested settings object, read-only since a patch is only read.                                                                           |
| [`DeepReadonly`](src/types/deep-readonly.ts) _(type)_                | Makes every property and array read-only, at every depth: a frozen configuration, a state snapshot that must not be changed in place.                                                               |
| [`ElementOf`](src/types/element-of.ts) _(type)_                      | Reads the item type of an array or tuple, such as the type of a `const` list of options.                                                                                                            |
| [`Entries`](src/types/entries.ts) _(type)_                           | The `[key, value]` pairs of an object type, each key with its own value type: the precise type of `Object.entries`, which widens keys to `string`.                                                  |
| [`FirstParameter`](src/types/first-parameter.ts) _(type)_            | Reads the type of the first parameter of a function, such as the event of a handler.                                                                                                                |
| [`KeysOfType`](src/types/pick-by-type.ts) _(type)_                   | Lists the keys of the properties whose type matches: the numeric fields of a record to chart, the boolean flags of a settings object.                                                               |
| [`LiteralUnion`](src/types/literal-union.ts) _(type)_                | A union of known literals that still accepts any value of the base type, without losing autocompletion of the literals (a plain `'a' \| 'b' \| string` collapses to `string`).                      |
| [`Merge`](src/types/merge.ts) _(type)_                               | Combines two object types, the properties of the second replacing those of the first (like an object spread `{ ...a, ...b }`), where an intersection would give `never` for conflicting properties. |
| [`Mutable`](src/types/mutable.ts) _(type)_                           | Removes `readonly` from the properties of a type, one level deep: a builder filling an object before handing it out as read-only.                                                                   |
| [`NonEmptyArray`](src/types/non-empty-array.ts) _(type)_             | An array with at least one item, so that its first item is never `undefined`.                                                                                                                       |
| [`Nullable`](src/types/nullable.ts) _(type)_                         | A `T` that may be `null`.                                                                                                                                                                           |
| [`Nullish`](src/types/nullish.ts) _(type)_                           | A `T` that may be `null` or `undefined`.                                                                                                                                                            |
| [`Optional`](src/types/optional.ts) _(type)_                         | A `T` that may be `undefined`.                                                                                                                                                                      |
| [`PartialKeys`](src/types/partial-keys.ts) _(type)_                  | Makes some properties optional: the input of a factory that fills them with defaults.                                                                                                               |
| [`PickByType`](src/types/pick-by-type.ts) _(type)_                   | Keeps the properties whose type matches.                                                                                                                                                            |
| [`RequireKeys`](src/types/require-keys.ts) _(type)_                  | Makes some optional properties required: the result of filling in defaults.                                                                                                                         |
| [`Simplify`](src/types/simplify.ts) _(type)_                         | Flattens intersections and mapped types into a plain object type, so that editor tooltips show the properties instead of `A & Omit<B, 'c'>`.                                                        |
| [`UnionToIntersection`](src/types/union-to-intersection.ts) _(type)_ | Turns a union into the intersection of its members: `A \| B` gives `A & B`, to merge the types of a list of mixins or handlers.                                                                     |
| [`ValueOf`](src/types/value-of.ts) _(type)_                          | The union of the value types of an object type, such as a `const` object used as an enum.                                                                                                           |

<!-- functions:end -->

## Performance

Measured with `pnpm bench` in Chromium (Playwright, cross-origin isolated for precise timers), Apple Silicon,
1 000 calls per sample unless stated:

| Operation               | Library                 | Baseline                              | Gain |
| ----------------------- | ----------------------- | ------------------------------------- | ---- |
| `roundToFractionDigits` | arithmetic              | `Number(formatDecimal())`             | ~41× |
| `formatNumber`          | cached `Intl` formatter | `new Intl.NumberFormat()` per call    | ~40× |
| `formatDecimal`         | cached `Intl` formatter | `new Intl.NumberFormat()` per call    | ~38× |
| `roundToStep`           | no float noise          | `Math.round(v / step) * step` (noisy) | 0.5× |

`roundToStep` is slower on purpose: it pays ~7 ns per call for exact results.

## Development

pnpm only (`corepack enable` makes the pinned version available).

```sh
pnpm install
pnpm exec playwright install chromium   # once, for the SVG specs and the benchmarks
pnpm test          # unit tests (watch: pnpm test:watch)
pnpm coverage      # tests + coverage report (coverage/), 100 % required
pnpm lint          # ESLint (in parallel), info rules off: errors fail (lint:strict: warnings too)
pnpm lint:css      # Stylelint on every .scss file (lint:css:strict: warnings fail too)
pnpm lint:css:fix  # Stylelint autofix: property order and Prettier formatting
pnpm lint:fix      # ESLint autofix, imports rewritten through the folders' index.ts included
pnpm lint:editor   # info rules shown in blue in VS Code
pnpm lint:presets  # the lint presets of lint/ on the example design system
pnpm typecheck     # every tsconfig project
pnpm knip          # unused files, exports and dependencies
pnpm bench         # benchmarks in Chromium
pnpm transfer lint # one text file that recreates lint/ elsewhere (transfer/)
pnpm docs:catalog  # regenerate the function lists of README.md and docs/FUNCTIONS.md
pnpm wiki:dev      # wiki (VitePress) with live reload: one page per export, search with Ctrl K
pnpm wiki:build    # wiki with test results and coverage, in docs/.vitepress/dist
pnpm check         # catalog, wiki pages, typecheck, ESLint, Stylelint, presets, format, knip, tests with coverage
```

Commit messages follow Conventional Commits. To add a function, follow `AGENTS.md` → "Writing a function".
