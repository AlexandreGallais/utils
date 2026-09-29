import { degreesToRadians } from '../angle/degrees-to-radians.ts';
import type { Point } from './point.ts';

/**
 * Rotates a point around a center, clockwise on screen for a positive angle (the y axis points down), like
 * an SVG `rotate()` transform.
 *
 * @param point - The point to rotate.
 * @param angleDegrees - Rotation in degrees, clockwise when positive.
 * @param center - Center of the rotation, such as `{ x: 0, y: 0 }`.
 * @returns The rotated point.
 * @example
 * rotatePoint({ x: 10, y: 0 }, 90, { x: 0, y: 0 }); // { x: 0, y: 10 } (a quarter turn clockwise)
 * rotatePoint({ x: 60, y: 50 }, 180, { x: 50, y: 50 }); // { x: 40, y: 50 }
 */
export function rotatePoint(point: Point, angleDegrees: number, center: Point): Point {
  const radians = degreesToRadians(angleDegrees);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  return { x: center.x + dx * cos - dy * sin, y: center.y + dx * sin + dy * cos };
}
