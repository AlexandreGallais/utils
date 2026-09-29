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
