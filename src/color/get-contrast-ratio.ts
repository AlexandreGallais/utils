import { getRelativeLuminance } from './get-relative-luminance.ts';
import { luminanceContrast } from './internal/luminance-contrast.ts';
import type { Rgb } from './rgb.ts';

/**
 * Computes the WCAG contrast ratio between two colors; their order does not matter.
 *
 * @param a - A color.
 * @param b - Another color.
 * @returns The ratio, from 1 (identical luminance) to 21 (black on white).
 * @example
 * getContrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }); // 21
 */
export function getContrastRatio(a: Rgb, b: Rgb): number {
  return luminanceContrast(getRelativeLuminance(a), getRelativeLuminance(b));
}
