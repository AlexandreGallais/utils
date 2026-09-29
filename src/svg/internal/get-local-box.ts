import type { Rect } from '../../geometry/rect.ts';

/**
 * Reads the bounding box of an element in its local coordinates, as a plain rectangle.
 *
 * @internal
 * @param element - A rendered SVG element.
 * @returns Its box, before its own `transform`.
 */
export function getLocalBox(element: SVGGraphicsElement): Rect {
  const { x, y, width, height } = element.getBBox();
  return { x, y, width, height };
}
