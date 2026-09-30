import { clamp, roundToFractionDigits } from '../math';
import { toByte } from './internal';
import type { Rgb } from './rgb';
import type { Rgba } from './rgba';

/** Decimals kept for the alpha channel. */
const ALPHA_FRACTION_DIGITS = 3;

/**
 * Formats a color as a CSS `rgb()` or `rgba()` string. Channels are rounded and clamped to [0, 255], the
 * alpha to three decimals in [0, 1].
 *
 * @param color - The color; `rgba()` is used when its alpha is below 1.
 * @returns `rgb(r, g, b)` or `rgba(r, g, b, a)`.
 * @example
 * toRgbString({ r: 255, g: 128, b: 0 }); // 'rgb(255, 128, 0)'
 * toRgbString({ r: 255, g: 0, b: 0, a: 0.5 }); // 'rgba(255, 0, 0, 0.5)'
 */
export function toRgbString(color: Rgb | Rgba): string {
  const channels = `${toByte(color.r)}, ${toByte(color.g)}, ${toByte(color.b)}`;
  return 'a' in color && color.a < 1
    ? `rgba(${channels}, ${roundToFractionDigits(clamp(color.a, 0, 1), ALPHA_FRACTION_DIGITS)})`
    : `rgb(${channels})`;
}
