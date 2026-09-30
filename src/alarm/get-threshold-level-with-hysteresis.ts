import type { ThresholdScale } from './threshold-scale';

/**
 * Finds the level of a value on a threshold scale, but keeps the previous level while the value stays
 * within `deadband` of a limit: a value hovering around 90 does not make the alarm flicker between
 * `'warning'` and `'alarm'` at every refresh. The multi-level version of `applyHysteresis`.
 *
 * @template L - The level type.
 * @param value - The monitored value.
 * @param scale - The levels and their limits.
 * @param previousLevel - The level shown until now.
 * @param deadband - How far past a limit the value must go to change level, in the unit of the value. Defaults to `0`.
 * @returns The new level.
 * @example
 * level = getThresholdLevelWithHysteresis(89.5, TEMPERATURE, 'alarm', 1); // 'alarm' (still within 1 of 90)
 * level = getThresholdLevelWithHysteresis(88.9, TEMPERATURE, 'alarm', 1); // 'warning'
 */
export function getThresholdLevelWithHysteresis<L>(
  value: number,
  scale: ThresholdScale<L>,
  previousLevel: L,
  deadband?: number | null,
): L {
  const resolvedDeadband = deadband ?? 0;
  // Levels reachable within the deadband, as indexes: 0 is `belowLevel`, i + 1 is `thresholds[i]`.
  const lowest = getLevelIndex(value - resolvedDeadband, scale);
  const highest = getLevelIndex(value + resolvedDeadband, scale);
  for (let index = lowest; index <= highest; index++) {
    if (getLevelAt(scale, index) === previousLevel) {
      return previousLevel;
    }
  }
  return getLevelAt(scale, getLevelIndex(value, scale));
}

/**
 * Finds the position of the level of a value.
 *
 * @template L - The level type.
 * @param value - The monitored value.
 * @param scale - The levels and their limits.
 * @returns `0` below the first threshold or for `NaN`, `i + 1` from `thresholds[i]`.
 */
function getLevelIndex<L>(value: number, scale: ThresholdScale<L>): number {
  let index = 0;
  if (Number.isNaN(value)) {
    return index;
  }
  for (const { from } of scale.thresholds) {
    if (value < from) {
      break;
    }
    index += 1;
  }
  return index;
}

/**
 * Reads a level by position.
 *
 * @template L - The level type.
 * @param scale - The levels and their limits.
 * @param index - `0` for `belowLevel`, `i + 1` for `thresholds[i]`.
 * @returns The level at that position.
 */
function getLevelAt<L>(scale: ThresholdScale<L>, index: number): L {
  const [threshold] = index === 0 ? [] : scale.thresholds.slice(index - 1, index);
  return threshold === undefined ? scale.belowLevel : threshold.level;
}
