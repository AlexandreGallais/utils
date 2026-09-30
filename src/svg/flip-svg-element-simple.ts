import { flipSvgElement } from './flip-svg-element';

/**
 * Mirrors an SVG element on screen without moving it, like `flipSvgElement`.
 *
 * @param element - A rendered SVG element.
 * @param axis - `'horizontal'` for a left-right mirror, `'vertical'` for a top-bottom mirror.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @simple Around its center.
 * @example
 * flipSvgElementSimple(valve, 'horizontal');
 */
export function flipSvgElementSimple(element: SVGGraphicsElement, axis: 'horizontal' | 'vertical'): void {
  flipSvgElement(element, axis, 'center');
}
