import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { createMatrix, createOrder, isMirrored } from './internal';
import type { SvgTransformOrder } from './svg-transform-order';

/**
 * An order of `applySvgTransforms` that makes the element mirrored or not, as seen on screen, around one of
 * its anchors: `svgFlip(false)` makes a mirrored text readable again.
 *
 * @param isFlipped - Whether the element must look mirrored. Defaults to `true`.
 * @param axis - The mirror used when the state changes: `'horizontal'` swaps left and right, `'vertical'` top
 * and bottom. Defaults to `'horizontal'`.
 * @param anchor - The point of the element that stays in place. Defaults to `'center'`.
 * @returns The order, to change with `set(isFlipped, axis, anchor)`.
 * @example
 * const flip = svgFlip(false);
 * applySvgTransforms(valve, [flip]);
 * flip.set(true); // facing the other way, same place
 */
export function svgFlip(
  isFlipped = true,
  axis: 'horizontal' | 'vertical' = 'horizontal',
  anchor: Anchor = 'center',
): SvgTransformOrder<[isFlipped?: boolean, axis?: 'horizontal' | 'vertical', anchor?: Anchor]> {
  return createOrder(
    [isFlipped, axis, anchor],
    (element, screen, flipped = true, mirror = 'horizontal', point = 'center') => {
      if (isMirrored(screen) === flipped) {
        return createMatrix(element);
      }
      const { x, y } = getSvgAnchorPoint(element, point);
      return createMatrix(element, mirror === 'horizontal' ? [-1, 0, 0, 1, 2 * x, 0] : [1, 0, 0, -1, 0, 2 * y]);
    },
  );
}
