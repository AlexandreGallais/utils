import { removeRotationAndFlip } from '../geometry/remove-rotation-and-flip.ts';
import { getSvgCenter } from './get-svg-center.ts';
import { getSvgTransform } from './get-svg-transform.ts';
import { setSvgTransform } from './set-svg-transform.ts';

/**
 * Straightens and unmirrors an SVG element (and removes any skew) without moving it on screen.
 *
 * @param element - A rendered SVG element with a `transform` attribute (or none).
 * @throws {TypeError} When its `transform` attribute is not a valid SVG transform list.
 * @example
 *  its center stays in place, its size is kept.:resetSvgRotationAndFlip(symbol); // upright, unmirrored, same place
 */
export function resetSvgRotationAndFlip(element: SVGGraphicsElement): void {
  setSvgTransform(element, removeRotationAndFlip(getSvgTransform(element), getSvgCenter(element)));
}
