import { lighten } from './lighten.ts';
import type { Rgb } from './rgb.ts';
import type { Rgba } from './rgba.ts';

/**
 * Makes a color darker by lowering its HSL lightness, keeping its hue and saturation (Sass `darken`): the
 * pressed state of a button, the border of a filled shape.
 *
 * @param color - The color to darken.
 * @param amount - Lightness to remove, in [0, 1]: `0.1` removes 10 points.
 * @returns The darker color, opacity kept, channels rounded; black at least.
 * @example
 * darken({ r: 255, g: 0, b: 0 }, 0.25); // { r: 128, g: 0, b: 0, a: 1 }
 */
export function darken(color: Rgb | Rgba, amount: number): Rgba {
  return lighten(color, -amount);
}
