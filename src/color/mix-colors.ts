import { lerp } from '../math';
import type { Rgb } from './rgb';
import type { Rgba } from './rgba';

/**
 * Interpolates linearly between two colors, opacity included: use it for a color gradient along a gauge.
 * Channels are not rounded.
 *
 * @param from - Color at `t = 0`; opaque when it has no alpha channel.
 * @param to - Color at `t = 1`; opaque when it has no alpha channel.
 * @param t - Interpolation factor, usually in [0, 1].
 * @returns The interpolated color.
 * @example
 * mixColors({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, 0.5); // { r: 127.5, g: 127.5, b: 127.5, a: 1 }
 */
export function mixColors(from: Rgb | Rgba, to: Rgb | Rgba, t: number): Rgba {
  return {
    r: lerp(from.r, to.r, t),
    g: lerp(from.g, to.g, t),
    b: lerp(from.b, to.b, t),
    a: lerp(alphaOf(from), alphaOf(to), t),
  };
}

/**
 * Reads the opacity of a color.
 *
 * @param color - A color, with or without an alpha channel.
 * @returns Its alpha, `1` when it has none.
 */
function alphaOf(color: Rgb | Rgba): number {
  return 'a' in color ? color.a : 1;
}
