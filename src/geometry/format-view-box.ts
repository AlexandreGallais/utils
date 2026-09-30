import type { Rect } from './rect';

/**
 * Formats a rectangle as the value of an SVG `viewBox` attribute.
 *
 * @param rect - The visible area, in user units.
 * @returns `'x y width height'`.
 * @example
 * svg.setAttribute('viewBox', formatViewBox({ x: 0, y: 0, width: 200, height: 100 })); // '0 0 200 100'
 */
export function formatViewBox(rect: Rect): string {
  return `${rect.x} ${rect.y} ${rect.width} ${rect.height}`;
}
