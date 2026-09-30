import { lerp } from '../math';
import { angleDifference } from './angle-difference';
import { normalizeAngle } from './normalize-angle';

/**
 * Interpolates between two angles along the shortest path: a heading going from 350° to 10° passes
 * through 0°, not through 180°.
 *
 * @param from - Angle at `t = 0`, in degrees. Defaults to `0`.
 * @param to - Angle at `t = 1`, in degrees. Defaults to `0`.
 * @param t - Interpolation factor, usually in [0, 1]. Defaults to `0`.
 * @returns The interpolated angle, in [0, 360[.
 * @example
 * lerpAngle(350, 10, 0.5); // 0
 * lerpAngle(0, 90, 0.5); // 45
 */
export function lerpAngle(from?: number | null, to?: number | null, t?: number | null): number {
  const resolvedFrom = from ?? 0;
  const resolvedTo = to ?? 0;
  const resolvedT = t ?? 0;
  return normalizeAngle(lerp(resolvedFrom, resolvedFrom + angleDifference(resolvedFrom, resolvedTo), resolvedT));
}
