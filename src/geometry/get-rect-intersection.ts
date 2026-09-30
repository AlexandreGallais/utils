import type { Rect } from './rect';

/**
 * Computes the overlapping area of two rectangles; use it as a collision or visibility test too.
 *
 * @param a - A rectangle.
 * @param b - Another rectangle.
 * @returns The common rectangle (of zero width or height when they only touch), or `undefined` when they do
 * not overlap.
 * @example
 * getRectIntersection({ x: 0, y: 0, width: 10, height: 10 }, { x: 5, y: 5, width: 10, height: 10 });
 * // { x: 5, y: 5, width: 5, height: 5 }
 */
export function getRectIntersection(a: Rect, b: Rect): Rect | undefined {
  const left = Math.max(a.x, b.x);
  const top = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.width, b.x + b.width);
  const bottom = Math.min(a.y + a.height, b.y + b.height);
  return right < left || bottom < top ? undefined : { x: left, y: top, width: right - left, height: bottom - top };
}
