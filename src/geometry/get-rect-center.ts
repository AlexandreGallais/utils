import type { Point } from './point';
import type { Rect } from './rect';

/**
 * Computes the center of a rectangle, such as the rotation center of an SVG element from its bounding box.
 *
 * @param rect - The rectangle.
 * @returns Its center point.
 * @example
 * getRectCenter({ x: 10, y: 20, width: 100, height: 50 }); // { x: 60, y: 45 }
 */
export function getRectCenter(rect: Rect): Point {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}
