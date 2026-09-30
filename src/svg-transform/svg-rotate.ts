import type { Anchor } from './anchor';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { createMatrix, createOrder } from './internal';
import type { SvgTransformOrder } from './svg-transform-order';

/**
 * An order of `applySvgTransforms` that turns the element by an angle from its position before this order,
 * clockwise on screen, around an anchor of itself or of another element: `set(90)` after `set(3)` gives 90°
 * from the start, not 93°.
 *
 * @param angleDegrees - The rotation, in degrees.
 * @param anchor - The point that stays in place. Defaults to `'center'`.
 * @param reference - The element giving the anchor, in any group. Defaults to the element itself.
 * @returns The order, to change with `set(angleDegrees, anchor, reference)`.
 * @example
 * const rotation = svgRotate(0, 'center', hub);
 * applySvgTransforms(needle, [rotation]);
 * rotation.set(30, 'center', hub); // 30° around the hub, from where it was drawn
 */
export function svgRotate(
  angleDegrees: number,
  anchor: Anchor = 'center',
  reference?: SVGGraphicsElement,
): SvgTransformOrder<[angleDegrees: number, anchor?: Anchor, reference?: SVGGraphicsElement]> {
  return createOrder([angleDegrees, anchor, reference], (element, _screen, angle, point = 'center', other) => {
    const { x, y } = getSvgAnchorPoint(other ?? element, point);
    return createMatrix(element).translate(x, y).rotate(angle).translate(-x, -y);
  });
}
