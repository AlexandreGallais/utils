import { rotateSvgElementAround } from './rotate-svg-element-around';

/**
 * Turns an SVG element by an angle around another element, like `rotateSvgElementAround`.
 *
 * @param element - The element to turn.
 * @param angleDegrees - The added rotation, in degrees, clockwise on screen.
 * @param pivot - The element whose center is the axis.
 * @throws {TypeError} When an element is not rendered, a transform is flattened or a `transform` attribute
 * is invalid.
 * @simple Around the center of the pivot element.
 * @example
 * rotateSvgElementAroundSimple(satellite, 10, planet);
 */
export function rotateSvgElementAroundSimple(
  element: SVGGraphicsElement,
  angleDegrees: number,
  pivot: SVGGraphicsElement,
): void {
  rotateSvgElementAround(element, angleDegrees, pivot, 'center');
}
