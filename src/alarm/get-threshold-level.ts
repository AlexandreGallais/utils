import type { ThresholdScale } from './threshold-scale';

/**
 * Finds the level of a value on a threshold scale: which color or alarm state a gauge shows. A value on a
 * limit belongs to the level above it.
 *
 * @template L - The level type.
 * @param value - The monitored value.
 * @param scale - The levels and their limits.
 * @returns The level of the highest threshold not above the value; `belowLevel` below the first one or for
 * `NaN`.
 * @example
 * getThresholdLevel(85, TEMPERATURE); // 'warning'
 * getThresholdLevel(2, TEMPERATURE); // 'alarm'
 */
export function getThresholdLevel<L>(value: number, scale: ThresholdScale<L>): L {
  let level = scale.belowLevel;
  if (Number.isNaN(value)) {
    return level;
  }
  for (const { from, level: thresholdLevel } of scale.thresholds) {
    if (value < from) {
      break;
    }
    level = thresholdLevel;
  }
  return level;
}
