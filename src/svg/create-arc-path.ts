import { polarToCartesian } from '../geometry';
import type { Point } from '../geometry';
import { formatCoordinate } from './internal';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

const FULL_TURN = 360;
const HALF_TURN = 180;

/**
 * Builds the `d` attribute of a circular arc, the track or the value bar of a round gauge. Angles follow the
 * library convention: 0° up, clockwise. The arc goes clockwise when `endAngle > startAngle`, counterclockwise
 * otherwise; a sweep of 360° or more draws a full circle (as two half arcs, since one SVG arc cannot close).
 *
 * @param center - Center of the circle. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param radius - Distance from the center, in user units. Defaults to `0`.
 * @param startAngle - Angle where the arc starts, in degrees. Defaults to `0`.
 * @param endAngle - Angle where the arc ends, in degrees. Defaults to `360`.
 * @returns The path data, such as `'M 50 10 A 40 40 0 0 1 90 50'`.
 * @example
 * // 270° gauge track, from bottom-left to bottom-right
 * track.setAttribute('d', createArcPath({ x: 50, y: 50 }, 40, -135, 135));
 */
export function createArcPath(
  center?: Point | null,
  radius?: number | null,
  startAngle?: number | null,
  endAngle?: number | null,
): string {
  const resolvedCenter = center ?? ORIGIN;
  const resolvedRadius = radius ?? 0;
  const resolvedStartAngle = startAngle ?? 0;
  const resolvedEndAngle = endAngle ?? FULL_TURN;
  const sweep = resolvedEndAngle - resolvedStartAngle;
  const r = formatCoordinate(resolvedRadius);
  if (Math.abs(sweep) >= FULL_TURN) {
    const top = polarToCartesian(resolvedCenter, resolvedRadius, resolvedStartAngle);
    const bottom = polarToCartesian(resolvedCenter, resolvedRadius, resolvedStartAngle + HALF_TURN);
    const direction = sweep > 0 ? 1 : 0;
    return [
      `M ${formatCoordinate(top.x)} ${formatCoordinate(top.y)}`,
      `A ${r} ${r} 0 1 ${direction} ${formatCoordinate(bottom.x)} ${formatCoordinate(bottom.y)}`,
      `A ${r} ${r} 0 1 ${direction} ${formatCoordinate(top.x)} ${formatCoordinate(top.y)}`,
    ].join(' ');
  }
  const start = polarToCartesian(resolvedCenter, resolvedRadius, resolvedStartAngle);
  const end = polarToCartesian(resolvedCenter, resolvedRadius, resolvedEndAngle);
  const largeArc = Math.abs(sweep) > HALF_TURN ? 1 : 0;
  const direction = sweep > 0 ? 1 : 0;
  return `M ${formatCoordinate(start.x)} ${formatCoordinate(start.y)} A ${r} ${r} 0 ${largeArc} ${direction} ${formatCoordinate(end.x)} ${formatCoordinate(end.y)}`;
}
