import { clamp } from './clamp.ts';
import { inverseLerp } from './inverse-lerp.ts';
import { lerp } from './lerp.ts';

/**
 * Maps a value from an input range to an output range, such as a sensor reading to a gauge angle. Inverted
 * ranges are supported.
 *
 * @param value - The value to map.
 * @param inMin - Input value mapped to `outMin`.
 * @param inMax - Input value mapped to `outMax`.
 * @param outMin - Output for `inMin`.
 * @param outMax - Output for `inMax`.
 * @param shouldClamp - Whether to keep the result within [outMin, outMax] instead of extrapolating.
 * @returns The mapped value; `outMin` when the input range is empty.
 * @example
 * remap(5, 0, 10, 0, 100); // 50
 * remap(15, 0, 10, 0, 100, true); // 100
 */
export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  shouldClamp = false,
): number {
  const t = inverseLerp(inMin, inMax, value);
  return lerp(outMin, outMax, shouldClamp ? clamp(t, 0, 1) : t);
}
