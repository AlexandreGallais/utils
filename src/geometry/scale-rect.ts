import type { Anchor } from './anchor';
import type { Rect } from './rect';
import { resizeRect } from './resize-rect';

/**
 * Scales a rectangle while one of its anchors stays in place: a fill level (`scaleRect(bar, 1, value / max,
 * 'bottom')`), a highlight growing around an element.
 *
 * @param rect - The rectangle at full size.
 * @param scaleX - Horizontal factor (1 keeps the width). Defaults to `1`.
 * @param scaleY - Vertical factor. Defaults to `scaleX` (a uniform scale).
 * @param anchor - The point that does not move, such as `'center'` or `'bottom-left'`. Defaults to `'center'`.
 * @returns The scaled rectangle.
 * @example
 * scaleRect({ x: 0, y: 0, width: 20, height: 100 }, 1, 0.3, 'bottom'); // { x: 0, y: 70, width: 20, height: 30 }
 */
export function scaleRect(rect: Rect, scaleX?: number | null, scaleY?: number | null, anchor?: Anchor | null): Rect {
  const resolvedScaleX = scaleX ?? 1;
  const resolvedScaleY = scaleY ?? scaleX ?? 1;
  const resolvedAnchor = anchor ?? 'center';
  return resizeRect(rect, { width: rect.width * resolvedScaleX, height: rect.height * resolvedScaleY }, resolvedAnchor);
}
