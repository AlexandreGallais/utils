import type { Point } from '../../geometry/point.ts';
import { transformPoint } from '../../geometry/transform-point.ts';
import type { FakeSvgElementInGroup } from './fake-svg-element.ts';

/**
 * Computes where a local point of a fake element is drawn on screen, rounded to hide float noise.
 *
 * @param element - The fake element.
 * @param point - A point in its local coordinates.
 * @returns The screen point, rounded to 4 decimals.
 */
export function screenPoint(element: FakeSvgElementInGroup, point: Point): Point {
  const { x, y } = transformPoint(point, element.getScreenCTM());
  return { x: Math.round(x * 1e4) / 1e4 + 0, y: Math.round(y * 1e4) / 1e4 + 0 };
}
