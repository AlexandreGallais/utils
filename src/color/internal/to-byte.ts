import { clamp } from '../../math/clamp.ts';

/** Highest value of an 8-bit color channel. */
const MAX_CHANNEL = 255;

/**
 * Rounds a channel value and clamps it to an 8-bit integer.
 *
 * @internal
 * @param value - A channel value, possibly fractional or out of range.
 * @returns An integer in [0, 255].
 */
export function toByte(value: number): number {
  return clamp(Math.round(value), 0, MAX_CHANNEL);
}
