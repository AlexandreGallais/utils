import type { Point } from '../geometry/point.ts';
import { formatCoordinate } from './internal/format-coordinate.ts';

/**
 * Builds a `transform` attribute that rotates an element around a point, such as a gauge needle updated at
 * every frame: `rotate(angle cx cy)`, positive clockwise like the library angles.
 *
 * @param angleDegrees - The rotation, in degrees, clockwise.
 * @param center - The point the element turns around, in its local coordinates.
 * @returns The attribute value, such as `'rotate(45 50 50)'`.
 * @example
 * needle.setAttribute('transform', formatRotation(valueToAngle(speed, 0, 40, -135, 135, true), { x: 50, y: 50 }));
 */
export function formatRotation(angleDegrees: number, center: Point): string {
  return `rotate(${formatCoordinate(angleDegrees)} ${formatCoordinate(center.x)} ${formatCoordinate(center.y)})`;
}
