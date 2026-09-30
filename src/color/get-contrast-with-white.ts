import { getRelativeLuminance } from './get-relative-luminance';
import { luminanceContrast } from './internal';
import type { Rgb } from './rgb';

/** Relative luminance of white. */
const WHITE_LUMINANCE = 1;

/**
 * Computes the WCAG contrast ratio between a color and white text.
 *
 * @param color - The background color.
 * @returns The ratio, in [1, 21].
 * @example
 * getContrastWithWhite({ r: 0, g: 0, b: 0 }); // 21
 */
export function getContrastWithWhite(color: Rgb): number {
  return luminanceContrast(getRelativeLuminance(color), WHITE_LUMINANCE);
}
