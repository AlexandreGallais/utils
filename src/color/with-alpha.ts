import { clamp } from '../math/clamp.ts';
import type { Rgb } from './rgb.ts';
import type { Rgba } from './rgba.ts';

/**
 * Gives a color another opacity, for a translucent fill or a disabled state built from a theme color.
 *
 * @param color - The color; its own opacity, if any, is replaced.
 * @param alpha - The new opacity, clamped to [0, 1].
 * @returns The same channels with the new opacity.
 * @example
 * toRgbString(withAlpha(parseColorOrThrow('#3366cc'), 0.2)); // 'rgb(51 102 204 / 0.2)'
 */
export function withAlpha(color: Rgb | Rgba, alpha: number): Rgba {
  return { r: color.r, g: color.g, b: color.b, a: clamp(alpha, 0, 1) };
}
