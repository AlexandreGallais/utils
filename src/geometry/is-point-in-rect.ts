import type { Point } from './point';
import type { Rect } from './rect';

/**
 * Checks whether a point lies inside a rectangle, edges included: a hit test for a click or a hover.
 *
 * @param point - The point to test.
 * @param rect - The rectangle, such as the box of a symbol.
 * @returns `true` when the point is inside or on an edge.
 * @example
 * isPointInRect({ x: 10, y: 5 }, { x: 0, y: 0, width: 10, height: 10 }); // true
 */
export function isPointInRect(point: Point, rect: Rect): boolean {
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}
