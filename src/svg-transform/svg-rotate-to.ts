import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { createMatrix, createOrder, isMirrored } from './internal';
import type { SvgTransformOrder } from './svg-transform-order';

const HALF_TURN = 180;
const DEGREES_PER_RADIAN = HALF_TURN / Math.PI;

/**
 * An order of `applySvgTransforms` that turns the element to an absolute angle on screen, clockwise from
 * upright, around an anchor of itself or of another element: `svgRotateTo(0)` straightens it.
 *
 * @param angleDegrees - The angle on screen, in degrees.
 * @param anchor - The point that stays in place. Defaults to `'center'`.
 * @param reference - The element giving the anchor, in any group. Defaults to the element itself.
 * @returns The order, to change with `set(angleDegrees, anchor, reference)`.
 * @example
 * applySvgTransforms(label, [svgRotateTo(0)]); // upright, whatever its groups
 */
export function svgRotateTo(
  angleDegrees: number,
  anchor: Anchor = 'center',
  reference?: SVGGraphicsElement,
): SvgTransformOrder<[angleDegrees: number, anchor?: Anchor, reference?: SVGGraphicsElement]> {
  return createOrder([angleDegrees, anchor, reference], (element, screen, angle, point = 'center', other) => {
    const sign = isMirrored(screen) ? -1 : 1;
    const current = Math.atan2(sign * screen.b, sign * screen.a) * DEGREES_PER_RADIAN;
    const { x, y } = getSvgAnchorPoint(other ?? element, point);
    return createMatrix(element)
      .translate(x, y)
      .rotate(angle - current)
      .translate(-x, -y);
  });
}
