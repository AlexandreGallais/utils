import type { Point } from '../geometry';
import { formatCoordinate } from './internal';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Builds a `transform` attribute that rotates an element around a point, such as a gauge needle updated at
 * every frame: `rotate(angle cx cy)`, positive clockwise like the library angles.
 *
 * @param angleDegrees - The rotation, in degrees, clockwise. Defaults to `0`.
 * @param center - The point the element turns around, in its local coordinates. Defaults to the origin `{ x: 0, y: 0
 * }`.
 * @returns The attribute value, such as `'rotate(45 50 50)'`.
 * @example
 * needle.setAttribute('transform', formatRotation(valueToAngle(speed, 0, 40, -135, 135, true), { x: 50, y: 50 }));
 */
export function formatRotation(angleDegrees?: number | null, center?: Point | null): string {
  const resolvedAngleDegrees = angleDegrees ?? 0;
  const resolvedCenter = center ?? ORIGIN;
  return `rotate(${formatCoordinate(resolvedAngleDegrees)} ${formatCoordinate(resolvedCenter.x)} ${formatCoordinate(resolvedCenter.y)})`;
}
