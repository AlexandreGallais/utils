import { parseTransform } from '../../geometry/parse-transform.ts';
import { transformPoint } from '../../geometry/transform-point.ts';
import type { FakeSvgElement } from './fake-svg-element.ts';

/**
 * Computes where the center of a fake element is drawn in its parent, rounded to hide float noise.
 *
 * @param element - The fake element.
 * @returns The drawn center, rounded to 4 decimals (the attribute keeps 6).
 */
export function screenCenter(element: FakeSvgElement): { x: number; y: number } {
  const box = element.getBBox();
  const matrix = parseTransform(element.getAttribute('transform') ?? '') ?? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
  const point = transformPoint({ x: box.x + box.width / 2, y: box.y + box.height / 2 }, matrix);
  return { x: Math.round(point.x * 1e4) / 1e4 + 0, y: Math.round(point.y * 1e4) / 1e4 + 0 };
}
