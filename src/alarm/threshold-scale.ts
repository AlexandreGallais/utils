/**
 * A limit of a threshold scale: from `from` upwards, the value is at `level`.
 *
 * @template L - The level type, such as `'normal' | 'warning' | 'alarm'`.
 */
export interface Threshold<L> {
  /** Lowest value of the level, included. */
  readonly from: number;
  /** The level from this limit up to the next one. */
  readonly level: L;
}

/**
 * The levels of a monitored value, from bottom to top: low alarm, low warning, normal, high warning, high
 * alarm, or any other sequence (a level may appear several times).
 *
 * @template L - The level type, such as `'normal' | 'warning' | 'alarm'`.
 * @example
 * const TEMPERATURE: ThresholdScale<Level> = {
 *   belowLevel: 'alarm',
 *   thresholds: [
 *     { from: 5, level: 'warning' },
 *     { from: 10, level: 'normal' },
 *     { from: 80, level: 'warning' },
 *     { from: 90, level: 'alarm' },
 *   ],
 * };
 */
export interface ThresholdScale<L> {
  /** The level below the first threshold. */
  readonly belowLevel: L;
  /** The limits, sorted by ascending `from`. */
  readonly thresholds: readonly Threshold<L>[];
}
