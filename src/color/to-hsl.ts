import type { Hsl } from './hsl';
import type { Rgb } from './rgb';
import type { Rgba } from './rgba';

/** Highest value of an 8-bit color channel. */
const MAX_CHANNEL = 255;
/** Degrees per sixth of the hue wheel, between two primary and secondary colors. */
const DEGREES_PER_SEXTANT = 60;
/** Sextants of the hue wheel. */
const SEXTANTS = 6;
/** Hue offsets, in sextants, when green or blue is the dominant channel. */
const GREEN_OFFSET = 2;
const BLUE_OFFSET = 4;

/**
 * Converts a color to hue, saturation and lightness, to derive shades that keep the same hue.
 *
 * @param color - The color, such as the result of `parseColor`; opaque without alpha channel.
 * @returns The HSL color; hue and saturation are `0` for a gray.
 * @example
 * toHsl({ r: 255, g: 0, b: 0 }); // { h: 0, s: 1, l: 0.5, a: 1 }
 * toHsl({ r: 0, g: 128, b: 255, a: 0.5 }); // { h: 209.88…, s: 1, l: 0.5, a: 0.5 }
 */
export function toHsl(color: Rgb | Rgba): Hsl {
  const r = color.r / MAX_CHANNEL;
  const g = color.g / MAX_CHANNEL;
  const b = color.b / MAX_CHANNEL;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  const l = (max + min) / 2;
  const a = 'a' in color ? color.a : 1;
  if (chroma === 0) {
    return { h: 0, s: 0, l, a };
  }
  const s = chroma / (1 - Math.abs(2 * l - 1));
  let sextant: number;
  if (max === r) {
    sextant = ((g - b) / chroma + SEXTANTS) % SEXTANTS;
  } else if (max === g) {
    sextant = (b - r) / chroma + GREEN_OFFSET;
  } else {
    sextant = (r - g) / chroma + BLUE_OFFSET;
  }
  return { h: sextant * DEGREES_PER_SEXTANT, s, l, a };
}
