import { lerp } from '../math/lerp.ts';
import type { Point } from './point.ts';

/**
 * Interpolates linearly between two points: the point at a fraction of the way from one to the other.
 * `t = 0.5` gives the midpoint.
 *
 * @param from - Point at `t = 0`.
 * @param to - Point at `t = 1`.
 * @param t - Interpolation factor; extrapolates outside [0, 1].
 * @returns The interpolated point.
 * @example
 * lerpPoint({ x: 0, y: 0 }, { x: 10, y: 20 }, 0.5); // { x: 5, y: 10 }
 */
export function lerpPoint(from: Point, to: Point, t: number): Point {
  return { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
}
