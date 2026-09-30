import { polarToCartesian } from '../geometry';
import type { Point } from '../geometry';
import { createArcPath } from './create-arc-path';
import { formatCoordinate } from './internal';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

const FULL_TURN = 360;
const HALF_TURN = 180;

/**
 * Builds the `d` attribute of a filled ring sector (a band between two radii): the colored zones of a round
 * gauge. Angles follow the library convention (0° up, clockwise); a sweep of 360° or more gives a full ring,
 * drawn with the `evenodd` hole of two circles.
 *
 * @param center - Center of the gauge. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param innerRadius - Radius of the inner edge.
 * @param outerRadius - Radius of the outer edge.
 * @param startAngle - Angle where the band starts, in degrees. Defaults to `0`.
 * @param endAngle - Angle where the band ends, in degrees. Defaults to `360`.
 * @returns The closed path data; fill it (with `fill-rule="evenodd"` for a full ring).
 * @example
 * // red zone of a 270° gauge, between 80 % and 100 % of the scale
 * zone.setAttribute('d', createRingSectorPath({ x: 50, y: 50 }, 34, 40, 81, 135));
 */
export function createRingSectorPath(
  center: Point | null | undefined,
  innerRadius: number,
  outerRadius: number,
  startAngle?: number | null,
  endAngle?: number | null,
): string {
  const resolvedCenter = center ?? ORIGIN;
  const resolvedStartAngle = startAngle ?? 0;
  const resolvedEndAngle = endAngle ?? FULL_TURN;
  const sweep = resolvedEndAngle - resolvedStartAngle;
  if (Math.abs(sweep) >= FULL_TURN) {
    return `${createArcPath(resolvedCenter, outerRadius, 0, FULL_TURN)} Z ${createArcPath(resolvedCenter, innerRadius, 0, FULL_TURN)} Z`;
  }
  const innerEnd = polarToCartesian(resolvedCenter, innerRadius, resolvedEndAngle);
  const innerStart = polarToCartesian(resolvedCenter, innerRadius, resolvedStartAngle);
  const largeArc = Math.abs(sweep) > HALF_TURN ? 1 : 0;
  const backDirection = sweep > 0 ? 0 : 1;
  const r = formatCoordinate(innerRadius);
  return [
    createArcPath(resolvedCenter, outerRadius, resolvedStartAngle, resolvedEndAngle),
    `L ${formatCoordinate(innerEnd.x)} ${formatCoordinate(innerEnd.y)}`,
    `A ${r} ${r} 0 ${largeArc} ${backDirection} ${formatCoordinate(innerStart.x)} ${formatCoordinate(innerStart.y)}`,
    'Z',
  ].join(' ');
}
