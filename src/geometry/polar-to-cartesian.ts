import { degreesToRadians } from '../angle';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Computes the point at a given distance and angle from a center. Angle convention of the library for SVG:
 * 0° points up (12 o'clock) and angles grow clockwise, like a compass heading (the y axis points down).
 *
 * @param center - Center of the circle. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param radius - Distance from the center. Defaults to `0`.
 * @param angleDegrees - Heading of the point, in degrees: 0 up, 90 right, 180 down, 270 left. Defaults to `0`.
 * @returns The point on the circle.
 * @example
 * polarToCartesian({ x: 50, y: 50 }, 40, 0); // { x: 50, y: 10 } (top)
 * polarToCartesian({ x: 50, y: 50 }, 40, 90); // { x: 90, y: 50 } (right)
 */
export function polarToCartesian(center?: Point | null, radius?: number | null, angleDegrees?: number | null): Point {
  const resolvedCenter = center ?? ORIGIN;
  const resolvedRadius = radius ?? 0;
  const resolvedAngleDegrees = angleDegrees ?? 0;
  const radians = degreesToRadians(resolvedAngleDegrees);
  return {
    x: resolvedCenter.x + resolvedRadius * Math.sin(radians),
    y: resolvedCenter.y - resolvedRadius * Math.cos(radians),
  };
}
