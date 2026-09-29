import { getRelativeLuminance } from './get-relative-luminance.ts';
import { toByte } from './internal/to-byte.ts';
import type { Rgb } from './rgb.ts';
import type { Rgba } from './rgba.ts';

/** Highest value of an 8-bit color channel. */
const MAX_CHANNEL = 255;
/** Constants of the inverse sRGB transfer function (IEC 61966-2-1). */
const LINEAR_THRESHOLD = 0.0031308;
const LINEAR_SLOPE = 12.92;
const GAMMA_OFFSET = 0.055;
const GAMMA_SCALE = 1.055;
const GAMMA = 2.4;

/**
 * Converts a color to the gray of the same perceived brightness (same WCAG relative luminance), for a
 * disabled or out-of-service symbol that keeps the contrast of the original.
 *
 * @param color - The color to desaturate.
 * @returns The gray, opacity kept, channels rounded.
 * @example
 * toGrayscale({ r: 255, g: 0, b: 0 }); // { r: 127, g: 127, b: 127, a: 1 }
 */
export function toGrayscale(color: Rgb | Rgba): Rgba {
  const luminance = getRelativeLuminance(color);
  const encoded =
    luminance <= LINEAR_THRESHOLD ? luminance * LINEAR_SLOPE : GAMMA_SCALE * luminance ** (1 / GAMMA) - GAMMA_OFFSET;
  const gray = toByte(encoded * MAX_CHANNEL);
  return { r: gray, g: gray, b: gray, a: 'a' in color ? color.a : 1 };
}
