import { getAnchorPoint } from './get-anchor-point.ts';
import type { PlaceRectOptions } from './place-rect-options.ts';
import type { Rect } from './rect.ts';
import type { Size } from './size.ts';

/**
 * Places a box of a given size relative to a target box: a badge on the top-right corner of a symbol, a
 * label under a gauge, a tooltip beside a point. Combined with `transformRect`, a decoration stays at the same
 * visual spot whatever the rotation or flip of the symbol it belongs to.
 *
 * @param size - Size of the box to place.
 * @param target - The box to place it against, in the same coordinate system.
 * @param options - Anchor of the target, anchor of the placed box, offset.
 * @returns Position and size of the placed box.
 * @example
 * const box = transformRect(symbol.getBBox(), symbolMatrix); // on-screen box of the symbol
 * // badge centered on the top-right corner, 4 px up and right
 * placeRect({ width: 12, height: 12 }, box, { targetAnchor: 'top-right', selfAnchor: 'center', offset: { x: 4, y: -4 } });
 * // badge inside the top-right corner, with a 2 px padding
 * placeRect({ width: 12, height: 12 }, box, { targetAnchor: 'top-right', offset: { x: -2, y: 2 } });
 */
export function placeRect(size: Size, target: Rect, options: PlaceRectOptions): Rect {
  const { targetAnchor, selfAnchor = targetAnchor, offset } = options;
  const anchor = getAnchorPoint(target, targetAnchor);
  const selfPoint = getAnchorPoint({ x: 0, y: 0, width: size.width, height: size.height }, selfAnchor);
  return {
    x: anchor.x - selfPoint.x + (offset?.x ?? 0),
    y: anchor.y - selfPoint.y + (offset?.y ?? 0),
    width: size.width,
    height: size.height,
  };
}
