import type { Rect } from './rect.ts';

/**
 * Computes the smallest rectangle enclosing two rectangles, such as the area to redraw after an element
 * moved from one place to another.
 *
 * @param a - A rectangle.
 * @param b - Another rectangle.
 * @returns The enclosing rectangle.
 * @example
 * rectUnion({ x: 0, y: 0, width: 10, height: 10 }, { x: 20, y: 5, width: 10, height: 10 });
 * // { x: 0, y: 0, width: 30, height: 15 }
 */
export function rectUnion(a: Rect, b: Rect): Rect {
  const left = Math.min(a.x, b.x);
  const top = Math.min(a.y, b.y);
  const right = Math.max(a.x + a.width, b.x + b.width);
  const bottom = Math.max(a.y + a.height, b.y + b.height);
  return { x: left, y: top, width: right - left, height: bottom - top };
}
