import { degreesToRadians } from '../angle/degrees-to-radians.ts';
import type { Point } from './point.ts';

/**
 * Computes the point at a given distance and angle from a center. Angle convention of the library for SVG:
 * 0° points up (12 o'clock) and angles grow clockwise, like a compass heading (the y axis points down).
 *
 * @param center - Center of the circle.
 * @param radius - Distance from the center.
 * @param angleDegrees - Heading of the point, in degrees: 0 up, 90 right, 180 down, 270 left.
 * @returns The point on the circle.
 * @example
 * polarToCartesian({ x: 50, y: 50 }, 40, 0); // { x: 50, y: 10 } (top)
 * polarToCartesian({ x: 50, y: 50 }, 40, 90); // { x: 90, y: 50 } (right)
 */
export function polarToCartesian(center: Point, radius: number, angleDegrees: number): Point {
  const radians = degreesToRadians(angleDegrees);
  return { x: center.x + radius * Math.sin(radians), y: center.y - radius * Math.cos(radians) };
}
