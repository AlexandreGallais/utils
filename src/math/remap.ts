import { clamp } from './clamp';
import { inverseLerp } from './inverse-lerp';
import { lerp } from './lerp';

/**
 * Maps a value from an input range to an output range, such as a sensor reading to a gauge angle. Inverted
 * ranges are supported.
 *
 * @param value - The value to map.
 * @param inMin - Input value mapped to `outMin`. Defaults to `0`.
 * @param inMax - Input value mapped to `outMax`. Defaults to `1`.
 * @param outMin - Output for `inMin`. Defaults to `0`.
 * @param outMax - Output for `inMax`. Defaults to `1`.
 * @param shouldClamp - Whether to keep the result within [outMin, outMax] instead of extrapolating. Defaults to
 * `false`.
 * @returns The mapped value; `outMin` when the input range is empty.
 * @example
 * remap(5, 0, 10, 0, 100, false); // 50
 * remap(15, 0, 10, 0, 100, true); // 100
 */
export function remap(
  value: number,
  inMin?: number | null,
  inMax?: number | null,
  outMin?: number | null,
  outMax?: number | null,
  shouldClamp?: boolean | null,
): number {
  const resolvedInMin = inMin ?? 0;
  const resolvedInMax = inMax ?? 1;
  const resolvedOutMin = outMin ?? 0;
  const resolvedOutMax = outMax ?? 1;
  const resolvedShouldClamp = shouldClamp ?? false;
  const t = inverseLerp(resolvedInMin, resolvedInMax, value);
  return lerp(resolvedOutMin, resolvedOutMax, resolvedShouldClamp ? clamp(t, 0, 1) : t);
}
