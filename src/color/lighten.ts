import { hslToRgba } from './hsl-to-rgba.ts';
import type { Rgb } from './rgb.ts';
import type { Rgba } from './rgba.ts';
import { toHsl } from './to-hsl.ts';

/**
 * Makes a color lighter by raising its HSL lightness, keeping its hue and saturation (Sass `lighten`): the
 * hover state of a button, the light variant of a series color.
 *
 * @param color - The color to lighten.
 * @param amount - Lightness to add, in [0, 1]: `0.1` adds 10 points; a negative amount darkens.
 * @returns The lighter color, opacity kept, channels rounded; white at most.
 * @example
 * lighten({ r: 51, g: 102, b: 153 }, 0.1); // { r: 64, g: 128, b: 191, a: 1 }
 */
export function lighten(color: Rgb | Rgba, amount: number): Rgba {
  const hsl = toHsl(color);
  return hslToRgba({ ...hsl, l: hsl.l + amount });
}
