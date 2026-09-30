import { resetMatrixRotation } from '../geometry';
import { getSvgLocalCenter } from './get-svg-local-center';
import { updateScreenMatrix } from './internal';

/**
 * Straightens an SVG element on screen (upright) without moving it: its center stays in place, its flip and size are kept. Works whatever its groups: the result is judged on screen.
 *
 * @param element - A rendered SVG element.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * resetSvgRotation(symbol);
 */
export function resetSvgRotation(element: SVGGraphicsElement): void {
  const center = getSvgLocalCenter(element);
  updateScreenMatrix(element, (screen) => resetMatrixRotation(screen, center));
}
