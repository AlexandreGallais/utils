import { polarToCartesian } from '../geometry/polar-to-cartesian.ts';
import type { Point } from '../geometry/point.ts';
import { formatCoordinate } from './internal/format-coordinate.ts';

const FULL_TURN = 360;
const HALF_TURN = 180;

/**
 * Builds the `d` attribute of a circular arc, the track or the value bar of a round gauge. Angles follow the
 * library convention: 0° up, clockwise. The arc goes clockwise when `endAngle > startAngle`, counterclockwise
 * otherwise; a sweep of 360° or more draws a full circle (as two half arcs, since one SVG arc cannot close).
 *
 * @param center - Center of the circle.
 * @param radius - Distance from the center, in user units.
 * @param startAngle - Angle where the arc starts, in degrees.
 * @param endAngle - Angle where the arc ends, in degrees.
 * @returns The path data, such as `'M 50 10 A 40 40 0 0 1 90 50'`.
 * @example
 * // 270° gauge track, from bottom-left to bottom-right
 * track.setAttribute('d', createArcPath({ x: 50, y: 50 }, 40, -135, 135));
 */
export function createArcPath(center: Point, radius: number, startAngle: number, endAngle: number): string {
  const sweep = endAngle - startAngle;
  const r = formatCoordinate(radius);
  if (Math.abs(sweep) >= FULL_TURN) {
    const top = polarToCartesian(center, radius, startAngle);
    const bottom = polarToCartesian(center, radius, startAngle + HALF_TURN);
    const direction = sweep > 0 ? 1 : 0;
    return [
      `M ${formatCoordinate(top.x)} ${formatCoordinate(top.y)}`,
      `A ${r} ${r} 0 1 ${direction} ${formatCoordinate(bottom.x)} ${formatCoordinate(bottom.y)}`,
      `A ${r} ${r} 0 1 ${direction} ${formatCoordinate(top.x)} ${formatCoordinate(top.y)}`,
    ].join(' ');
  }
  const start = polarToCartesian(center, radius, startAngle);
  const end = polarToCartesian(center, radius, endAngle);
  const largeArc = Math.abs(sweep) > HALF_TURN ? 1 : 0;
  const direction = sweep > 0 ? 1 : 0;
  return `M ${formatCoordinate(start.x)} ${formatCoordinate(start.y)} A ${r} ${r} 0 ${largeArc} ${direction} ${formatCoordinate(end.x)} ${formatCoordinate(end.y)}`;
}
