import type { Anchor } from './anchor';
import { createMatrix, createOrder, getAnchorPoint, inOwnAxes } from './internal';
import type { SvgTransformOrder } from './svg-transform-order';

/**
 * An order of `applySvgTransforms` that enlarges or shrinks the element in its own axes, around an anchor of
 * its drawing, which gives the direction: with `'left'`, it grows to the right; with `'bottom'`, upwards.
 *
 * @param scaleX - The factor along its width: `2` doubles it.
 * @param scaleY - The factor along its height. Defaults to `scaleX`.
 * @param anchor - The point of its drawing that stays in place. Defaults to `'center'`.
 * @returns The order, to change with `set(scaleX, scaleY, anchor)`.
 * @example
 * const level = svgScale(1, 0, 'bottom');
 * applySvgTransforms(tankLevel, [level]);
 * level.set(1, 0.75, 'bottom'); // filled to 75 %, from the bottom
 */
export function svgScale(
  scaleX: number,
  scaleY = scaleX,
  anchor: Anchor = 'center',
): SvgTransformOrder<[scaleX: number, scaleY?: number, anchor?: Anchor]> {
  return createOrder([scaleX, scaleY, anchor], (element, screen, sx, sy = sx, point = 'center') => {
    const { x, y } = getAnchorPoint(element.getBBox(), point);
    return inOwnAxes(screen, createMatrix(element, [sx, 0, 0, sy, x * (1 - sx), y * (1 - sy)]));
  });
}
