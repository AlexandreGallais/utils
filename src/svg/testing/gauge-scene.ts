import { createFakeSvgElementIn } from './fake-svg-element.ts';
import type { FakeSvgElementInGroup } from './fake-svg-element.ts';

/**
 * Creates a hub drawn at (100, 100) on screen, and a path in another group scaled by 2: the center of the
 * hub is (50, 50) in the coordinates of the path.
 *
 * @returns The hub and the path.
 */
export function createGaugeScene(): { hub: FakeSvgElementInGroup; path: FakeSvgElementInGroup } {
  const hub = createFakeSvgElementIn({ a: 1, b: 0, c: 0, d: 1, e: 100, f: 100 }, undefined, {
    x: -5,
    y: -5,
    width: 10,
    height: 10,
  });
  const path = createFakeSvgElementIn({ a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 }, undefined, {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });
  return { hub, path };
}
