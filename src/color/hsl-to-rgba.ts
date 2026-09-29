import type { Hsl } from './hsl.ts';
import { hslToRgb } from './internal/hsl-to-rgb.ts';
import type { Rgba } from './rgba.ts';

/** Degrees in a full turn of the hue wheel. */
const FULL_TURN = 360;

/**
 * Converts a hue, saturation and lightness color back to RGB, to render a shade derived with `toHsl`.
 *
 * @param hsl - The color; any hue is wrapped into [0, 360[, saturation and lightness are clamped to [0, 1].
 * @returns The color, with channels rounded to integers in [0, 255].
 * @example
 * hslToRgba({ h: 210, s: 0.5, l: 0.4, a: 1 }); // { r: 51, g: 102, b: 153, a: 1 }
 */
export function hslToRgba(hsl: Hsl): Rgba {
  const hue = ((hsl.h % FULL_TURN) + FULL_TURN) % FULL_TURN;
  const rgb = hslToRgb(hue, Math.min(Math.max(hsl.s, 0), 1), Math.min(Math.max(hsl.l, 0), 1));
  return { ...rgb, a: hsl.a };
}
