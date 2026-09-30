import { getContrastWithBlack } from './get-contrast-with-black';
import { getContrastWithWhite } from './get-contrast-with-white';
import { parseColorOrThrowCached } from './parse-color-or-throw-cached';
import type { Rgb } from './rgb';

/**
 * Picks black or white, whichever contrasts most with a background, like `getReadableTextColor`, with color
 * strings parsed through the cache of `parseColorCached` (~13× faster on repeated strings).
 *
 * @param background - The background color, as channels or as a CSS color string.
 * @returns `'#000000'` or `'#ffffff'`.
 * @throws {TypeError} When `background` is a string that is not a valid color.
 * @cached Color strings go through the cache of `parseColorCached`; channel objects are not cached.
 * @example
 * getReadableTextColorCached('#ffeb3b'); // '#000000'
 */
export function getReadableTextColorCached(background: Rgb | string): '#000000' | '#ffffff' {
  const color = typeof background === 'string' ? parseColorOrThrowCached(background) : background;
  return getContrastWithBlack(color) >= getContrastWithWhite(color) ? '#000000' : '#ffffff';
}
