import { moveMatrix } from '../geometry/move-matrix.ts';
import { updateScreenMatrix } from './internal/update-screen-matrix.ts';

/**
 * Moves an SVG element by an offset in screen pixels, whatever its rotation, flip and groups: 5 to the left
 * is always 5 pixels to the left of what is seen.
 *
 * @param element - A rendered SVG element.
 * @param dx - Horizontal offset in screen pixels, positive to the right.
 * @param dy - Vertical offset in screen pixels, positive downwards.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * placeSvgElement(badge, 'top-left', symbol, 'top-left');
 * moveSvgElement(badge, -5, 5); // then 5 px to the left and 5 px down
 */
export function moveSvgElement(element: SVGGraphicsElement, dx: number, dy: number): void {
  updateScreenMatrix(element, (screen) => moveMatrix(screen, dx, dy));
}
