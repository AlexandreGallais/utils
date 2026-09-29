import type { Insets } from './insets.ts';
import type { Rect } from './rect.ts';

/**
 * Shrinks a rectangle by a margin on each side, like CSS padding: the drawing area of a gauge inside its
 * frame. A negative margin grows it. The size never becomes negative: an over-shrunk side collapses to
 * zero at its center.
 *
 * @param rect - The rectangle.
 * @param insets - The same margin on every side, or a margin per side.
 * @returns The inner rectangle.
 * @example
 * insetRect({ x: 0, y: 0, width: 100, height: 50 }, 10); // { x: 10, y: 10, width: 80, height: 30 }
 * insetRect({ x: 0, y: 0, width: 100, height: 50 }, { top: 5, right: 0, bottom: 15, left: 20 });
 * // { x: 20, y: 5, width: 80, height: 30 }
 */
export function insetRect(rect: Rect, insets: number | Insets): Rect {
  const { top, right, bottom, left } =
    typeof insets === 'number' ? { top: insets, right: insets, bottom: insets, left: insets } : insets;
  const width = rect.width - left - right;
  const height = rect.height - top - bottom;
  return {
    x: width < 0 ? rect.x + left + width / 2 : rect.x + left,
    y: height < 0 ? rect.y + top + height / 2 : rect.y + top,
    width: Math.max(0, width),
    height: Math.max(0, height),
  };
}
