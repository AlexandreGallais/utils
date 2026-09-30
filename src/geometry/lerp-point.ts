import { lerp } from '../math';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Interpolates linearly between two points: the point at a fraction of the way from one to the other.
 * `t = 0.5` gives the midpoint.
 *
 * @param from - Point at `t = 0`. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param to - Point at `t = 1`. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param t - Interpolation factor; extrapolates outside [0, 1]. Defaults to `0`.
 * @returns The interpolated point.
 * @example
 * lerpPoint({ x: 0, y: 0 }, { x: 10, y: 20 }, 0.5); // { x: 5, y: 10 }
 */
export function lerpPoint(from?: Point | null, to?: Point | null, t?: number | null): Point {
  const resolvedFrom = from ?? ORIGIN;
  const resolvedTo = to ?? ORIGIN;
  const resolvedT = t ?? 0;
  return { x: lerp(resolvedFrom.x, resolvedTo.x, resolvedT), y: lerp(resolvedFrom.y, resolvedTo.y, resolvedT) };
}
