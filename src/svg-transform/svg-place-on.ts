import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { createMatrix, createOrder } from './internal';
import type { SvgTransformOrder } from './svg-transform-order';

/**
 * An order of `applySvgTransforms` that moves the element so that one of its anchors lands on an anchor of
 * another element, as seen on screen, whatever groups each one is in.
 *
 * @param reference - The element to go to.
 * @param referenceAnchor - The point of `reference` to reach. Defaults to `'center'`.
 * @param anchor - The point of the element that lands on it. Defaults to `'center'`.
 * @returns The order, to change with `set(reference, referenceAnchor, anchor)`.
 * @example
 * applySvgTransforms(badge, [svgPlaceOn(symbol, 'bottom-left', 'top-right')]); // the badge corner on the symbol corner
 */
export function svgPlaceOn(
  reference: SVGGraphicsElement,
  referenceAnchor: Anchor = 'center',
  anchor: Anchor = 'center',
): SvgTransformOrder<[reference: SVGGraphicsElement, referenceAnchor?: Anchor, anchor?: Anchor]> {
  return createOrder(
    [reference, referenceAnchor, anchor],
    (element, _screen, other, otherPoint = 'center', point = 'center') => {
      const to = getSvgAnchorPoint(other, otherPoint);
      const from = getSvgAnchorPoint(element, point);
      return createMatrix(element).translate(to.x - from.x, to.y - from.y);
    },
  );
}
