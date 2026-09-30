import { setSvgRotationAround } from './set-svg-rotation-around';

/**
 * Orients an SVG element to an absolute angle on screen around another element, like
 * `setSvgRotationAround`.
 *
 * @param element - The element to orient.
 * @param angleDegrees - The wanted angle on screen, in degrees, clockwise from upright.
 * @param pivot - The element whose center is the axis, such as the gauge hub.
 * @throws {TypeError} When an element is not rendered, a transform is flattened or a `transform` attribute
 * is invalid.
 * @simple Around the center of the pivot element.
 * @example
 * setSvgRotationAroundSimple(needle, valueToAngle(speed, 0, 40, -135, 135, true), hub);
 */
export function setSvgRotationAroundSimple(
  element: SVGGraphicsElement,
  angleDegrees: number,
  pivot: SVGGraphicsElement,
): void {
  setSvgRotationAround(element, angleDegrees, pivot, 'center');
}
