import { normalizeAngle, radiansToDegrees } from '../angle';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Computes the heading from one point to another, in the library's angle convention (0° up, clockwise), the
 * inverse of `polarToCartesian`. Use it to orient an arrow, or to turn a click on a round gauge into an angle.
 *
 * @param from - Starting point, such as the center of a gauge. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param to - Target point. Defaults to the origin `{ x: 0, y: 0 }`.
 * @returns The heading in degrees, in [0, 360[; `0` when both points are equal.
 * @example
 * getHeadingBetween({ x: 50, y: 50 }, { x: 50, y: 10 }); // 0 (up)
 * getHeadingBetween({ x: 50, y: 50 }, { x: 10, y: 50 }); // 270 (left)
 */
export function getHeadingBetween(from?: Point | null, to?: Point | null): number {
  const resolvedFrom = from ?? ORIGIN;
  const resolvedTo = to ?? ORIGIN;
  return normalizeAngle(radiansToDegrees(Math.atan2(resolvedTo.x - resolvedFrom.x, resolvedFrom.y - resolvedTo.y)));
}
