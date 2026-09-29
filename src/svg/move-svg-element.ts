import { moveMatrix } from '../geometry/move-matrix.ts';
import { getSvgTransform } from './get-svg-transform.ts';
import { setSvgTransform } from './set-svg-transform.ts';

/**
 * Moves an SVG element by an offset on screen (in its parent's coordinates), whatever its rotation or flip:
 * 10 to the right is always 10 to the right, where editing `x` or a local translation would follow the
 * rotation.
 *
 * @param element - The SVG element to move.
 * @param dx - Horizontal offset in the parent coordinates, positive to the right.
 * @param dy - Vertical offset in the parent coordinates, positive downwards.
 * @throws {TypeError} When its `transform` attribute is not a valid SVG transform list.
 * @example
 * trackPointerDrag(symbol, { onMove: (dx, dy) => moveSvgElement(symbol, dx - lastX, dy - lastY) });
 */
export function moveSvgElement(element: Element, dx: number, dy: number): void {
  setSvgTransform(element, moveMatrix(getSvgTransform(element), dx, dy));
}
