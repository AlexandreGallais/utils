import { resetMatrixFlip } from '../geometry/reset-matrix-flip.ts';
import { getSvgLocalCenter } from './get-svg-local-center.ts';
import { updateScreenMatrix } from './internal/update-screen-matrix.ts';

/**
 * Unmirrors an SVG element on screen without moving it: its center stays in place, its rotation and size are kept. Works whatever its groups: the result is judged on screen.
 *
 * @param element - A rendered SVG element.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * resetSvgFlip(symbol);
 */
export function resetSvgFlip(element: SVGGraphicsElement): void {
  const center = getSvgLocalCenter(element);
  updateScreenMatrix(element, (screen) => resetMatrixFlip(screen, center));
}
