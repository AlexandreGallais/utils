import type { Rgb } from './rgb';
import { toLinear } from './to-linear';

/** Contribution of each linear channel to the luminance (ITU-R BT.709 primaries, used by WCAG). */
const RED_WEIGHT = 0.2126;
const GREEN_WEIGHT = 0.7152;
const BLUE_WEIGHT = 0.0722;

/**
 * Computes the WCAG relative luminance of a color: its perceived brightness, from 0 (black) to 1 (white).
 * The alpha channel, if any, is ignored.
 *
 * @param color - The color, channels in [0, 255].
 * @returns The relative luminance, in [0, 1].
 * @example
 * getRelativeLuminance({ r: 255, g: 255, b: 255 }); // 1
 * getRelativeLuminance({ r: 255, g: 0, b: 0 }); // 0.2126
 */
export function getRelativeLuminance(color: Rgb): number {
  return RED_WEIGHT * toLinear(color.r) + GREEN_WEIGHT * toLinear(color.g) + BLUE_WEIGHT * toLinear(color.b);
}
