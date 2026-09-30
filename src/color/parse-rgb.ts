import { parseAlpha, parseArguments, parseFunctionArguments, parseNumberOrPercentage, toByte } from './internal';
import type { Rgba } from './rgba';

/** Highest value of an 8-bit color channel. */
const MAX_CHANNEL = 255;

const RGB_FUNCTION_PATTERN = /^rgba?\((?<args>[^\)]*)\)$/iv;

/**
 * Parses a CSS `rgb()` or `rgba()` color, in comma or space syntax, any case. Out-of-range channels are
 * clamped and rounded to integers.
 *
 * @param input - An RGB color: channels as numbers or percentages, optional alpha
 * (`rgb(255, 0, 0)`, `rgb(100% 0% 0% / 50%)`).
 * @returns The color, or `undefined` when the string is not an RGB color.
 * @example
 * parseRgb('rgb(100%, 0%, 0%)'); // { r: 255, g: 0, b: 0, a: 1 }
 * parseRgb('rgb(255 0 0 / 50%)'); // { r: 255, g: 0, b: 0, a: 0.5 }
 */
export function parseRgb(input: string): Rgba | undefined {
  const parts = parseFunctionArguments(RGB_FUNCTION_PATTERN, input);
  const values = parts && parseArguments(parts, [parseChannel, parseChannel, parseChannel, parseAlpha]);
  if (!values) {
    return undefined;
  }
  const [r = 0, g = 0, b = 0, a = 1] = values;
  return { r, g, b, a };
}

/**
 * Parses an RGB channel: a number in [0, 255] or a percentage.
 *
 * @param text - A trimmed argument, such as `'128'` or `'50%'`.
 * @returns The channel rounded and clamped to [0, 255], or `undefined` when the text is not a number.
 */
function parseChannel(text: string): number | undefined {
  const parsed = parseNumberOrPercentage(text);
  if (!parsed) {
    return undefined;
  }
  return toByte(parsed.isPercentage ? parsed.value * MAX_CHANNEL : parsed.value);
}
