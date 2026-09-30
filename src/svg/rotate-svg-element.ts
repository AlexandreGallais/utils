import type { Anchor } from '../geometry';
import { multiplyMatrices, createRotationMatrix } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { updateScreenMatrix } from './internal';

/**
 * Turns an SVG element on itself by an angle, clockwise on screen, around one of its 9 anchors that stays
 * in place, whatever its groups.
 *
 * @param element - A rendered SVG element.
 * @param angleDegrees - The added rotation, in degrees, clockwise on screen.
 * @param anchor - The point of its visible box that does not move, such as `'center'` or `'bottom'`.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * rotateSvgElement(flag, 15, 'bottom'); // leans 15° around its foot
 */
export function rotateSvgElement(element: SVGGraphicsElement, angleDegrees: number, anchor: Anchor): void {
  const pivot = getSvgAnchorPoint(element, anchor);
  updateScreenMatrix(element, (screen) => multiplyMatrices(createRotationMatrix(angleDegrees, pivot), screen));
}
