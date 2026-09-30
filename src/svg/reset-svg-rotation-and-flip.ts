import { resetMatrixRotationAndFlip } from '../geometry';
import { getSvgLocalCenter } from './get-svg-local-center';
import { updateScreenMatrix } from './internal';

/**
 * Straightens and unmirrors an SVG element on screen (and removes any skew) without moving it: its center stays in place, its size is kept. Works whatever its groups: the result is judged on screen.
 *
 * @param element - A rendered SVG element.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 * @example
 * resetSvgRotationAndFlip(symbol);
 */
export function resetSvgRotationAndFlip(element: SVGGraphicsElement): void {
  const center = getSvgLocalCenter(element);
  updateScreenMatrix(element, (screen) => resetMatrixRotationAndFlip(screen, center));
}
