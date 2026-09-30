import { scaleSvgElement } from './scale-svg-element';

/**
 * Enlarges or shrinks an SVG element on screen, like `scaleSvgElement`.
 *
 * @param element - A rendered SVG element.
 * @param factor - The size multiplier: `2` doubles it, `0.5` halves it.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @simple Around its center.
 * @example
 * scaleSvgElementSimple(selectedSymbol, 1.2);
 */
export function scaleSvgElementSimple(element: SVGGraphicsElement, factor: number): void {
  scaleSvgElement(element, factor, 'center');
}
