import { parseHex } from './parse-hex.ts';
import { parseHsl } from './parse-hsl.ts';
import { parseNamedColor } from './parse-named-color.ts';
import { parseRgb } from './parse-rgb.ts';
import type { Rgba } from './rgba.ts';

/**
 * Parses any CSS color string: hex with or without `#`, `rgb()`, `rgba()`, `hsl()`, `hsla()` or a named
 * color, ignoring surrounding spaces and case. Each call parses again: for strings parsed at every refresh,
 * use `parseColorCached`.
 *
 * @param input - A color string, such as `' #FFF '`, `'rgb(255 0 0 / 50%)'` or `'navy'`.
 * @returns A new color object, or `undefined` when the string is not a color (never throws).
 * @example
 * parseColor(' #FFF '); // { r: 255, g: 255, b: 255, a: 1 }
 * parseColor('not a color'); // undefined
 */
export function parseColor(input: string): Rgba | undefined {
  const text = input.trim().toLowerCase();
  if (text.startsWith('#')) {
    return parseHex(text);
  }
  if (text.startsWith('rgb')) {
    return parseRgb(text);
  }
  if (text.startsWith('hsl')) {
    return parseHsl(text);
  }
  // A bare hex (`fff`) is tried last: `bad` or `add` are valid hex, but no color name is valid hex.
  return parseNamedColor(text) ?? parseHex(text);
}
