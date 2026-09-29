import type { Anchor } from './anchor.ts';
import type { Rect } from './rect.ts';
import { resizeRect } from './resize-rect.ts';

/**
 * Scales a rectangle while one of its anchors stays in place: a fill level (`scaleRect(bar, 1, value / max,
 * 'bottom')`), a highlight growing around an element.
 *
 * @param rect - The rectangle at full size.
 * @param scaleX - Horizontal factor (1 keeps the width).
 * @param scaleY - Vertical factor; the same as `scaleX` when omitted.
 * @param anchor - The point that does not move; the center when omitted.
 * @returns The scaled rectangle.
 * @example
 * scaleRect({ x: 0, y: 0, width: 20, height: 100 }, 1, 0.3, 'bottom'); // { x: 0, y: 70, width: 20, height: 30 }
 */
export function scaleRect(rect: Rect, scaleX: number, scaleY: number = scaleX, anchor: Anchor = 'center'): Rect {
  return resizeRect(rect, { width: rect.width * scaleX, height: rect.height * scaleY }, anchor);
}
