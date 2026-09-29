import { removeFlip } from '../geometry/remove-flip.ts';
import { getSvgCenter } from './get-svg-center.ts';
import { getSvgTransform } from './get-svg-transform.ts';
import { setSvgTransform } from './set-svg-transform.ts';

/**
 * Unmirrors an SVG element without moving it on screen.
 *
 * @param element - A rendered SVG element with a `transform` attribute (or none).
 * @throws {TypeError} When its `transform` attribute is not a valid SVG transform list.
 * @example
 *  its center stays in place, the rotation and the scale are kept.:resetSvgFlip(label); // readable again, same place
 */
export function resetSvgFlip(element: SVGGraphicsElement): void {
  setSvgTransform(element, removeFlip(getSvgTransform(element), getSvgCenter(element)));
}
