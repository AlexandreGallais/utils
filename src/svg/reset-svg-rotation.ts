import { removeRotation } from '../geometry/remove-rotation.ts';
import { getSvgCenter } from './get-svg-center.ts';
import { getSvgTransform } from './get-svg-transform.ts';
import { setSvgTransform } from './set-svg-transform.ts';

/**
 * Straightens an SVG element (rotation back to 0°) without moving it on screen.
 *
 * @param element - A rendered SVG element with a `transform` attribute (or none).
 * @throws {TypeError} When its `transform` attribute is not a valid SVG transform list.
 * @example
 *  its center stays in place, the flip and the scale are kept.:resetSvgRotation(symbol); // upright, same place
 */
export function resetSvgRotation(element: SVGGraphicsElement): void {
  setSvgTransform(element, removeRotation(getSvgTransform(element), getSvgCenter(element)));
}
