import { centerMatrixOn } from '../geometry/center-matrix-on.ts';
import type { Point } from '../geometry/point.ts';
import { getSvgCenter } from './get-svg-center.ts';
import { getSvgTransform } from './get-svg-transform.ts';
import { setSvgTransform } from './set-svg-transform.ts';

/**
 * Moves an SVG element so that the center of its content lands on a point of its parent, keeping its
 * rotation, flip and scale: recenters a symbol or a text drawn off-center (a text whose baseline is at
 * `y = 0` is centered on its middle, not its baseline).
 *
 * @param element - A rendered SVG element.
 * @param target - Where its center must be drawn, in its parent's coordinates.
 * @throws {TypeError} When its `transform` attribute is not a valid SVG transform list.
 * @example
 * centerSvgElement(label, { x: 50, y: 50 }); // label centered in a 100 × 100 symbol
 */
export function centerSvgElement(element: SVGGraphicsElement, target: Point): void {
  setSvgTransform(element, centerMatrixOn(getSvgTransform(element), getSvgCenter(element), target));
}
