import type { Anchor } from './anchor.ts';
import { getAnchorPoint } from './get-anchor-point.ts';
import type { Rect } from './rect.ts';
import type { Size } from './size.ts';

/**
 * Changes the size of a rectangle while one of its anchors stays in place: a bar shrinking towards its base,
 * a box growing from its center, a panel collapsing to its top edge.
 *
 * @param rect - The rectangle at its current size.
 * @param size - The new size.
 * @param anchor - The point that does not move; the top-left corner when omitted.
 * @returns The resized rectangle.
 * @example
 * // a 100 px high bar anchored at its bottom, shrunk to 30 px
 * resizeRect({ x: 0, y: 0, width: 20, height: 100 }, { width: 20, height: 30 }, 'bottom'); // { x: 0, y: 70, width: 20, height: 30 }
 */
export function resizeRect(rect: Rect, size: Size, anchor: Anchor = 'top-left'): Rect {
  const fixed = getAnchorPoint(rect, anchor);
  const offset = getAnchorPoint({ x: 0, y: 0, width: size.width, height: size.height }, anchor);
  return { x: fixed.x - offset.x, y: fixed.y - offset.y, width: size.width, height: size.height };
}
