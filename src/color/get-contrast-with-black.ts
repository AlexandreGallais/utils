import { getRelativeLuminance } from './get-relative-luminance.ts';
import { luminanceContrast } from './internal/luminance-contrast.ts';
import type { Rgb } from './rgb.ts';

/** Relative luminance of black. */
const BLACK_LUMINANCE = 0;

/**
 * Computes the WCAG contrast ratio between a color and black text.
 *
 * @param color - The background color.
 * @returns The ratio, in [1, 21].
 * @example
 * getContrastWithBlack({ r: 255, g: 255, b: 255 }); // 21
 */
export function getContrastWithBlack(color: Rgb): number {
  return luminanceContrast(getRelativeLuminance(color), BLACK_LUMINANCE);
}
