import { lerp } from '../math/lerp.ts';
import { angleDifference } from './angle-difference.ts';
import { normalizeAngle } from './normalize-angle.ts';

/**
 * Interpolates between two angles along the shortest path: a heading going from 350° to 10° passes
 * through 0°, not through 180°.
 *
 * @param from - Angle at `t = 0`, in degrees.
 * @param to - Angle at `t = 1`, in degrees.
 * @param t - Interpolation factor, usually in [0, 1].
 * @returns The interpolated angle, in [0, 360[.
 * @example
 * lerpAngle(350, 10, 0.5); // 0
 * lerpAngle(0, 90, 0.5); // 45
 */
export function lerpAngle(from: number, to: number, t: number): number {
  return normalizeAngle(lerp(from, from + angleDifference(from, to), t));
}
