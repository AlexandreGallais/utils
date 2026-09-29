import { padBounds } from './pad-bounds.ts';
import type { DataBounds } from './data-bounds.ts';

/** Margin on each side, as a fraction of the range. */
const MARGIN_RATIO = 0.05;

/**
 * Adds a 5 % margin around a chart window like `padBounds`.
 *
 * @param bounds - The window, typically from `getDataBounds`.
 * @returns The padded window.
 * @simple Five percent of the range on each side, 1 unit for a constant series.
 * @example
 * padBoundsSimple({ minX: 0, maxX: 100, minY: 0, maxY: 10 }); // { minX: -5, maxX: 105, minY: -0.5, maxY: 10.5 }
 */
export function padBoundsSimple(bounds: DataBounds): DataBounds {
  return padBounds(bounds, MARGIN_RATIO, 1);
}
