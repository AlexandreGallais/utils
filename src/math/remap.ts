import { clamp } from './clamp';
import { inverseLerp } from './inverse-lerp';
import { lerp } from './lerp';

/**
 * Maps a value from an input range to an output range, such as a sensor reading to a gauge angle. Inverted
 * ranges work.
 *
 * @param value - The value to map.
 * @param inMin - The input mapped to `outMin`.
 * @param inMax - The input mapped to `outMax`.
 * @param outMin - The output for `inMin`.
 * @param outMax - The output for `inMax`.
 * @param shouldClamp - Whether to keep the result within the output range. Defaults to `false`.
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
  return lerp(outMin, outMax, shouldClamp ? clamp(t) : t);
}
