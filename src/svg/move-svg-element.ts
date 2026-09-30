import { moveMatrix } from '../geometry';
import { updateScreenMatrix } from './internal';

/**
 * Moves an SVG element by an offset in screen pixels, whatever its rotation, flip and groups: 5 to the left
 * is always 5 pixels to the left of what is seen.
 *
 * @param element - A rendered SVG element.
 * @param dx - Horizontal offset in screen pixels, positive to the right. Defaults to `0`.
 * @param dy - Vertical offset in screen pixels, positive downwards. Defaults to `0`.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * placeSvgElement(badge, 'top-left', symbol, 'top-left');
 * moveSvgElement(badge, -5, 5); // then 5 px to the left and 5 px down
 */
export function moveSvgElement(element: SVGGraphicsElement, dx?: number | null, dy?: number | null): void {
  const resolvedDx = dx ?? 0;
  const resolvedDy = dy ?? 0;
  updateScreenMatrix(element, (screen) => moveMatrix(screen, resolvedDx, resolvedDy));
}
