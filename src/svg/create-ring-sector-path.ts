import { polarToCartesian } from '../geometry/polar-to-cartesian.ts';
import type { Point } from '../geometry/point.ts';
import { createArcPath } from './create-arc-path.ts';
import { formatCoordinate } from './internal/format-coordinate.ts';

const FULL_TURN = 360;
const HALF_TURN = 180;

/**
 * Builds the `d` attribute of a filled ring sector (a band between two radii): the colored zones of a round
 * gauge. Angles follow the library convention (0° up, clockwise); a sweep of 360° or more gives a full ring,
 * drawn with the `evenodd` hole of two circles.
 *
 * @param center - Center of the gauge.
 * @param innerRadius - Radius of the inner edge.
 * @param outerRadius - Radius of the outer edge.
 * @param startAngle - Angle where the band starts, in degrees.
 * @param endAngle - Angle where the band ends, in degrees.
 * @returns The closed path data; fill it (with `fill-rule="evenodd"` for a full ring).
 * @example
 * // red zone of a 270° gauge, between 80 % and 100 % of the scale
 * zone.setAttribute('d', createRingSectorPath({ x: 50, y: 50 }, 34, 40, 81, 135));
 */
export function createRingSectorPath(
  center: Point,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const sweep = endAngle - startAngle;
  if (Math.abs(sweep) >= FULL_TURN) {
    return `${createArcPath(center, outerRadius, 0, FULL_TURN)} Z ${createArcPath(center, innerRadius, 0, FULL_TURN)} Z`;
  }
  const innerEnd = polarToCartesian(center, innerRadius, endAngle);
  const innerStart = polarToCartesian(center, innerRadius, startAngle);
  const largeArc = Math.abs(sweep) > HALF_TURN ? 1 : 0;
  const backDirection = sweep > 0 ? 0 : 1;
  const r = formatCoordinate(innerRadius);
  return [
    createArcPath(center, outerRadius, startAngle, endAngle),
    `L ${formatCoordinate(innerEnd.x)} ${formatCoordinate(innerEnd.y)}`,
    `A ${r} ${r} 0 ${largeArc} ${backDirection} ${formatCoordinate(innerStart.x)} ${formatCoordinate(innerStart.y)}`,
    'Z',
  ].join(' ');
}
