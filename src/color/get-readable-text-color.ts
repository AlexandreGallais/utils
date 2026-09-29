import { getContrastWithBlack } from './get-contrast-with-black.ts';
import { getContrastWithWhite } from './get-contrast-with-white.ts';
import { parseColorOrThrow } from './parse-color-or-throw.ts';
import type { Rgb } from './rgb.ts';

/**
 * Picks black or white, whichever contrasts most with a background: the readable text color over it.
 * The background may be a color string, parsed at each call (see `getReadableTextColorCached`); its alpha
 * channel is ignored.
 *
 * @param background - The background color, as channels or as a CSS color string.
 * @returns `'#000000'` or `'#ffffff'`.
 * @throws {TypeError} When `background` is a string that is not a valid color.
 * @example
 * getReadableTextColor('#ffeb3b'); // '#000000'
 * getReadableTextColor({ r: 0, g: 0, b: 128 }); // '#ffffff'
 */
export function getReadableTextColor(background: Rgb | string): '#000000' | '#ffffff' {
  const color = typeof background === 'string' ? parseColorOrThrow(background) : background;
  return getContrastWithBlack(color) >= getContrastWithWhite(color) ? '#000000' : '#ffffff';
}
