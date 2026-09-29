import type { Anchor } from './anchor.ts';
import { placeRect } from './place-rect.ts';
import type { Rect } from './rect.ts';
import type { Size } from './size.ts';

/**
 * Places a box inside a corner or on a side of a target box, like `placeRect`: the top-right corner of the
 * box on the top-right corner of the target, and so on.
 *
 * @param size - Size of the box to place.
 * @param target - The box to place it in, such as the screen box of a symbol.
 * @param anchor - The anchor of both boxes, such as `'top-right'`.
 * @returns The placed box.
 * @simple The box uses the same anchor as the target, without offset.
 * @example
 * placeRectSimple({ width: 10, height: 10 }, { x: 0, y: 0, width: 100, height: 50 }, 'top-right'); // { x: 90, y: 0, width: 10, height: 10 }
 */
export function placeRectSimple(size: Size, target: Rect, anchor: Anchor): Rect {
  return placeRect(size, target, { targetAnchor: anchor });
}
