import type { Anchor } from './anchor';
import { getAnchorPoint } from './get-anchor-point';
import type { Rect } from './rect';
import type { Size } from './size';

/**
 * Changes the size of a rectangle while one of its anchors stays in place: a bar shrinking towards its base,
 * a box growing from its center, a panel collapsing to its top edge.
 *
 * @param rect - The rectangle at its current size.
 * @param size - The new size.
 * @param anchor - The point that does not move, such as `'top-left'` or `'center'`. Defaults to `'center'`.
 * @returns The resized rectangle.
 * @example
 * // a 100 px high bar anchored at its bottom, shrunk to 30 px
 * resizeRect({ x: 0, y: 0, width: 20, height: 100 }, { width: 20, height: 30 }, 'bottom'); // { x: 0, y: 70, width: 20,
 * height: 30 }
 */
export function resizeRect(rect: Rect, size: Size, anchor?: Anchor | null): Rect {
  const resolvedAnchor = anchor ?? 'center';
  const fixed = getAnchorPoint(rect, resolvedAnchor);
  const offset = getAnchorPoint({ x: 0, y: 0, width: size.width, height: size.height }, resolvedAnchor);
  return { x: fixed.x - offset.x, y: fixed.y - offset.y, width: size.width, height: size.height };
}
