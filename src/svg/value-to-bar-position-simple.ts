import { valueToBarPosition } from './value-to-bar-position';
import type { BarScale } from './bar-scale';

/**
 * Converts a value to a position along a bar gauge like `valueToBarPosition`, stopping at the ends of the bar.
 *
 * @param value - The value to place.
 * @param scale - The bar: its rectangle, range and direction.
 * @returns The coordinate along the bar.
 * @simple Out-of-range values are clamped to the bar.
 * @example
 * valueToBarPositionSimple(speed, SPEED_BAR);
 */
export function valueToBarPositionSimple(value: number, scale: BarScale): number {
  return valueToBarPosition(value, scale, true);
}
