import { rotateSvgElement } from './rotate-svg-element.ts';

/**
 * Turns an SVG element on itself by an angle, clockwise on screen, like `rotateSvgElement`.
 *
 * @param element - A rendered SVG element.
 * @param angleDegrees - The added rotation, in degrees, clockwise on screen.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @simple Around its center.
 * @example
 * rotateSvgElementSimple(fan, 30);
 */
export function rotateSvgElementSimple(element: SVGGraphicsElement, angleDegrees: number): void {
  rotateSvgElement(element, angleDegrees, 'center');
}
