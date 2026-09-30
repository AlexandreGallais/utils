import { getAnchorPoint } from './get-anchor-point';
import type { Rect } from './rect';
import type { Size } from './size';
import type { Anchor } from './anchor';
import type { Point } from './point';

/** Where `placeRect` puts a box relative to a target box. */
export interface PlaceRectOptions {
  /** Point of the target box to attach to, such as `'top-right'`. */
  readonly targetAnchor?: Anchor | null;

  /**
   * Point of the placed box that lands on the target anchor; the same as `targetAnchor` when omitted, which
   * places the box inside the target's corner. `'center'` centers it on the anchor, the opposite corner
   * (`'bottom-left'` for `'top-right'`) puts it outside.
   */
  readonly selfAnchor?: Anchor | null;
  /** Shift applied last, in screen directions (`y` grows downwards): a padding or a gap. */
  readonly offset?: Point | null;
}

/**
 * Places a box of a given size relative to a target box: a badge on the top-right corner of a symbol, a
 * label under a gauge, a tooltip beside a point. Combined with `transformRect`, a decoration stays at the same
 * visual spot whatever the rotation or flip of the symbol it belongs to.
 *
 * @param size - Size of the box to place.
 * @param target - The box to place it against, in the same coordinate system.
 * @param options - Anchor of the target (`'center'` by default), anchor of the placed box (the target's by
 * default), offset. Defaults to `{}`.
 * @returns Position and size of the placed box.
 * @example
 * const box = transformRect(symbol.getBBox(), symbolMatrix); // on-screen box of the symbol
 * // badge centered on the top-right corner, 4 px up and right
 * placeRect({ width: 12, height: 12 }, box, { targetAnchor: 'top-right', selfAnchor: 'center', offset: { x: 4, y: -4 }
 * });
 * // badge inside the top-right corner, with a 2 px padding
 * placeRect({ width: 12, height: 12 }, box, { targetAnchor: 'top-right', offset: { x: -2, y: 2 } });
 */
export function placeRect(size: Size, target: Rect, options?: PlaceRectOptions | null): Rect {
  const resolvedOptions = options ?? {};
  const targetAnchor = resolvedOptions.targetAnchor ?? 'center';
  const selfAnchor = resolvedOptions.selfAnchor ?? targetAnchor;
  const { offset } = resolvedOptions;
  const anchor = getAnchorPoint(target, targetAnchor);
  const selfPoint = getAnchorPoint({ x: 0, y: 0, width: size.width, height: size.height }, selfAnchor);
  return {
    x: anchor.x - selfPoint.x + (offset?.x ?? 0),
    y: anchor.y - selfPoint.y + (offset?.y ?? 0),
    width: size.width,
    height: size.height,
  };
}
