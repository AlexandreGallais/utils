import { createCirclePath } from './create-circle-path.ts';
import { getSvgAnchorPointIn } from './get-svg-anchor-point-in.ts';

/**
 * Draws a circle in a `<path>` around the center of an element, whatever groups each one is in: a ring
 * around a symbol, the rim of a gauge.
 *
 * @param path - The `<path>` whose `d` attribute is written.
 * @param center - The element whose visible center is the center of the circle.
 * @param radius - Radius of the circle, in the coordinates of the path.
 * @throws {TypeError} When an element is not rendered, or the path is flattened.
 * @example
 * drawSvgCircle(selectionRing, symbol, 30);
 */
export function drawSvgCircle(path: SVGGraphicsElement, center: SVGGraphicsElement, radius: number): void {
  path.setAttribute('d', createCirclePath(getSvgAnchorPointIn(center, 'center', path), radius));
}
