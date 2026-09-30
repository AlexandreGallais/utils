import { placeSvgElement } from './place-svg-element';

/**
 * Centers an SVG element on another one, as seen on screen, like `placeSvgElement`.
 *
 * @param element - The element to move.
 * @param reference - The element to center on.
 * @throws {TypeError} When an element is not rendered, a transform is flattened or a `transform` attribute
 * is invalid.
 * @simple Center of the element on the center of the reference.
 * @example
 * placeSvgElementSimple(value, gaugeFace); // value text in the middle of the gauge
 */
export function placeSvgElementSimple(element: SVGGraphicsElement, reference: SVGGraphicsElement): void {
  placeSvgElement(element, 'center', reference, 'center');
}
