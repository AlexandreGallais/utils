import type { Point } from '../geometry/point.ts';
import { rectCenter } from '../geometry/rect-center.ts';

/**
 * Finds the center of the drawn content of an SVG element, in its local coordinates (before its own
 * `transform`): the natural pivot to straighten, unflip or recenter it.
 *
 * @param element - A rendered SVG element (`getBBox` needs it in the document).
 * @returns The center of its bounding box.
 * @example
 * const center = getSvgCenter(symbol);
 */
export function getSvgCenter(element: SVGGraphicsElement): Point {
  const { x, y, width, height } = element.getBBox();
  return rectCenter({ x, y, width, height });
}
