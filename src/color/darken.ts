import { lighten } from './lighten';
import type { Rgb } from './rgb';
import type { Rgba } from './rgba';

/**
 * Makes a color darker by lowering its HSL lightness, keeping its hue and saturation (Sass `darken`): the
 * pressed state of a button, the border of a filled shape.
 *
 * @param color - The color to darken.
 * @param amount - Lightness to remove, in [0, 1]: `0.1` removes 10 points. Defaults to `0`.
 * @returns The darker color, opacity kept, channels rounded; black at least.
 * @example
 * darken({ r: 255, g: 0, b: 0 }, 0.25); // { r: 128, g: 0, b: 0, a: 1 }
 */
export function darken(color: Rgb | Rgba, amount?: number | null): Rgba {
  const resolvedAmount = amount ?? 0;
  return lighten(color, -resolvedAmount);
}
