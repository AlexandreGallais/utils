import { clamp, wrap } from '../math';
import { hslToRgb, parseAlpha, parseArguments, parseFunctionArguments, parseNumberOrPercentage } from './internal';
import type { Rgba } from './rgba';

/** Divisor turning a CSS percentage into a fraction. */
const PERCENT = 100;

/** A full turn, in degrees. */
const FULL_TURN = 360;
const HALF_TURN = 180;
/** Degrees in a gradian (400 per turn). */
const DEGREES_PER_GRADIAN = 0.9;

const HSL_FUNCTION_PATTERN = /^hsla?\((?<args>[^\)]*)\)$/iv;

/** A number followed by an optional unit; `Number()` then validates the number. */
const HUE_PATTERN = /^(?<value>[\d+\-.]+)(?<unit>[a-z]*)$/iv;

/** Degrees per unit of a CSS `<angle>` (no unit means degrees). */
const DEGREES_PER_UNIT: ReadonlyMap<string, number> = new Map([
  ['', 1],
  ['deg', 1],
  ['grad', DEGREES_PER_GRADIAN],
  ['rad', HALF_TURN / Math.PI],
  ['turn', FULL_TURN],
]);

/**
 * Parses a CSS `hsl()` or `hsla()` color, in comma or space syntax, any case.
 *
 * @param input - An HSL color: hue as a number of degrees or an angle (`deg`, `rad`, `grad`, `turn`),
 * saturation and lightness as percentages, optional alpha (`hsl(120 100% 25% / 0.5)`).
 * @returns The color with channels rounded to integers, or `undefined` when the string is not an HSL color.
 * @example
 * parseHsl('hsl(120, 100%, 25%)'); // { r: 0, g: 128, b: 0, a: 1 }
 * parseHsl('hsl(0.5turn 100% 50% / 0.2)'); // { r: 0, g: 255, b: 255, a: 0.2 }
 */
export function parseHsl(input: string): Rgba | undefined {
  const parts = parseFunctionArguments(HSL_FUNCTION_PATTERN, input);
  const values = parts && parseArguments(parts, [parseHue, parsePercentage, parsePercentage, parseAlpha]);
  if (!values) {
    return undefined;
  }
  const [hue = 0, saturation = 0, lightness = 0, a = 1] = values;
  return { ...hslToRgb(hue, clamp(saturation, 0, 1), clamp(lightness, 0, 1)), a };
}

/**
 * Parses a saturation or a lightness: `50%`, or a bare `50` (CSS Color 4).
 *
 * @param text - A trimmed argument.
 * @returns The value as a fraction (not clamped), or `undefined` when the text is not a number.
 */
function parsePercentage(text: string): number | undefined {
  const parsed = parseNumberOrPercentage(text);
  if (!parsed) {
    return undefined;
  }
  return parsed.isPercentage ? parsed.value : parsed.value / PERCENT;
}

/**
 * Parses a CSS hue: a number of degrees or an `<angle>`.
 *
 * @param text - A trimmed argument, such as `'120'`, `'-0.5turn'` or `'3.14rad'`.
 * @returns The hue in degrees in [0, 360[, or `undefined` for an invalid number or an unknown unit.
 */
function parseHue(text: string): number | undefined {
  const groups = HUE_PATTERN.exec(text)?.groups;
  if (!groups) {
    return undefined;
  }
  // The pattern always captures a unit, possibly empty.
  const degreesPerUnit = DEGREES_PER_UNIT.get(String(groups['unit']).toLowerCase());
  const value = Number(groups['value']);
  return degreesPerUnit === undefined || !Number.isFinite(value)
    ? undefined
    : wrap(value * degreesPerUnit, 0, FULL_TURN);
}
