import { setSvgRotation } from './set-svg-rotation.ts';

/**
 * Orients an SVG element to an absolute angle on screen, like `setSvgRotation`.
 *
 * @param element - A rendered SVG element.
 * @param angleDegrees - The wanted angle on screen, in degrees, clockwise from upright.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @simple Around its center.
 * @example
 * setSvgRotationSimple(arrow, windDirection);
 */
export function setSvgRotationSimple(element: SVGGraphicsElement, angleDegrees: number): void {
  setSvgRotation(element, angleDegrees, 'center');
}
