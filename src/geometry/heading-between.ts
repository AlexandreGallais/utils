import { normalizeAngle } from '../angle/normalize-angle.ts';
import { radiansToDegrees } from '../angle/radians-to-degrees.ts';
import type { Point } from './point.ts';

/**
 * Computes the heading from one point to another, in the library's angle convention (0° up, clockwise), the
 * inverse of `polarToCartesian`. Use it to orient an arrow, or to turn a click on a round gauge into an angle.
 *
 * @param from - Starting point, such as the center of a gauge.
 * @param to - Target point.
 * @returns The heading in degrees, in [0, 360[; `0` when both points are equal.
 * @example
 * headingBetween({ x: 50, y: 50 }, { x: 50, y: 10 }); // 0 (up)
 * headingBetween({ x: 50, y: 50 }, { x: 10, y: 50 }); // 270 (left)
 */
export function headingBetween(from: Point, to: Point): number {
  return normalizeAngle(radiansToDegrees(Math.atan2(to.x - from.x, from.y - to.y)));
}
