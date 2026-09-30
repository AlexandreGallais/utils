import type { Anchor } from '../geometry';
import { multiplyMatrices, createScaleMatrix } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { updateScreenMatrix } from './internal';

/**
 * Mirrors an SVG element on screen, around one of its 9 anchors that stays in place, whatever its
 * rotation and groups: `'horizontal'` swaps left and right as seen, `'vertical'` swaps top and bottom.
 *
 * @param element - A rendered SVG element.
 * @param axis - `'horizontal'` for a left-right mirror, `'vertical'` for a top-bottom mirror.
 * @param anchor - The point of its visible box that does not move, such as `'center'` or `'left'`.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * flipSvgElement(valve, 'horizontal', 'center'); // the valve now faces the other way, same place
 */
export function flipSvgElement(element: SVGGraphicsElement, axis: 'horizontal' | 'vertical', anchor: Anchor): void {
  const pivot = getSvgAnchorPoint(element, anchor);
  const mirror = axis === 'horizontal' ? createScaleMatrix(-1, 1, pivot) : createScaleMatrix(1, -1, pivot);
  updateScreenMatrix(element, (screen) => multiplyMatrices(mirror, screen));
}
