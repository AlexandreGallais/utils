import type { Rect } from '../geometry';
import { formatCoordinate } from './internal';

/**
 * Builds the `d` attribute of a rectangle, for shapes that must be a `<path>` (a symbol made of paths only,
 * a clip path, a shape combined with others in one `d`).
 *
 * @param rect - The rectangle.
 * @returns The closed path data, drawn clockwise from the top-left corner.
 * @example
 * createRectPath({ x: 0, y: 0, width: 20, height: 10 }); // 'M 0 0 H 20 V 10 H 0 Z'
 */
export function createRectPath(rect: Rect): string {
  const left = formatCoordinate(rect.x);
  return `M ${left} ${formatCoordinate(rect.y)} H ${formatCoordinate(rect.x + rect.width)} V ${formatCoordinate(rect.y + rect.height)} H ${left} Z`;
}
