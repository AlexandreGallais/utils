import type { Point } from '../geometry/point.ts';
import { getRectCenter } from '../geometry/get-rect-center.ts';

/**
 * Finds the center of the drawn content of an SVG element, in its local coordinates (before its own
 * `transform`): the natural pivot to straighten, unflip or recenter it.
 *
 * @param element - A rendered SVG element (`getBBox` needs it in the document).
 * @returns The center of its bounding box.
 * @example
 * const center = getSvgLocalCenter(symbol);
 */
export function getSvgLocalCenter(element: SVGGraphicsElement): Point {
  const { x, y, width, height } = element.getBBox();
  return getRectCenter({ x, y, width, height });
}
