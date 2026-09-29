import type { Point } from './point.ts';
import type { Rect } from './rect.ts';

/**
 * Checks whether a point lies inside a rectangle, edges included: a hit test for a click or a hover.
 *
 * @param rect - The rectangle.
 * @param point - The point to test.
 * @returns `true` when the point is inside or on an edge.
 * @example
 * rectContainsPoint({ x: 0, y: 0, width: 10, height: 10 }, { x: 10, y: 5 }); // true
 */
export function rectContainsPoint(rect: Rect, point: Point): boolean {
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}
