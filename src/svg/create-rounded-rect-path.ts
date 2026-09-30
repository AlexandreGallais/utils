import type { Rect } from '../geometry';
import { formatCoordinate } from './internal';

/**
 * Builds the `d` attribute of a rectangle with rounded corners: a path, unlike `<rect rx>`, can be combined
 * with other shapes, clipped or morphed. The radius is reduced to fit a small rectangle, so it never
 * overlaps (a square with a radius of half its side becomes a circle).
 *
 * @param rect - Position and size of the rectangle.
 * @param radius - Corner radius, capped to half the smaller side.
 * @returns The closed path data.
 * @example
 * createRoundedRectPath({ x: 0, y: 0, width: 40, height: 20 }, 4);
 * // 'M 4 0 H 36 A 4 4 0 0 1 40 4 V 16 A 4 4 0 0 1 36 20 H 4 A 4 4 0 0 1 0 16 V 4 A 4 4 0 0 1 4 0 Z'
 */
export function createRoundedRectPath(rect: Rect, radius: number): string {
  const r = Math.max(0, Math.min(radius, rect.width / 2, rect.height / 2));
  const left = rect.x;
  const top = rect.y;
  const right = rect.x + rect.width;
  const bottom = rect.y + rect.height;
  const corner = `A ${formatCoordinate(r)} ${formatCoordinate(r)} 0 0 1`;
  return [
    `M ${formatCoordinate(left + r)} ${formatCoordinate(top)}`,
    `H ${formatCoordinate(right - r)}`,
    `${corner} ${formatCoordinate(right)} ${formatCoordinate(top + r)}`,
    `V ${formatCoordinate(bottom - r)}`,
    `${corner} ${formatCoordinate(right - r)} ${formatCoordinate(bottom)}`,
    `H ${formatCoordinate(left + r)}`,
    `${corner} ${formatCoordinate(left)} ${formatCoordinate(bottom - r)}`,
    `V ${formatCoordinate(top + r)}`,
    `${corner} ${formatCoordinate(left + r)} ${formatCoordinate(top)}`,
    'Z',
  ].join(' ');
}
