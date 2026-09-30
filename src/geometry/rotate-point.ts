import { degreesToRadians } from '../angle';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Rotates a point around a center, clockwise on screen for a positive angle (the y axis points down), like
 * an SVG `rotate()` transform.
 *
 * @param point - The point to rotate. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param angleDegrees - Rotation in degrees, clockwise when positive. Defaults to `0`.
 * @param center - Center of the rotation, such as `{ x: 0, y: 0 }`. Defaults to the origin `{ x: 0, y: 0 }`.
 * @returns The rotated point.
 * @example
 * rotatePoint({ x: 10, y: 0 }, 90, { x: 0, y: 0 }); // { x: 0, y: 10 } (a quarter turn clockwise)
 * rotatePoint({ x: 60, y: 50 }, 180, { x: 50, y: 50 }); // { x: 40, y: 50 }
 */
export function rotatePoint(point?: Point | null, angleDegrees?: number | null, center?: Point | null): Point {
  const resolvedPoint = point ?? ORIGIN;
  const resolvedAngleDegrees = angleDegrees ?? 0;
  const resolvedCenter = center ?? ORIGIN;
  const radians = degreesToRadians(resolvedAngleDegrees);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const dx = resolvedPoint.x - resolvedCenter.x;
  const dy = resolvedPoint.y - resolvedCenter.y;
  return { x: resolvedCenter.x + dx * cos - dy * sin, y: resolvedCenter.y + dx * sin + dy * cos };
}
