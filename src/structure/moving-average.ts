import { sum } from '../stats';

/**
 * Simple moving average over the last N values, in O(1) per value: a running sum over a preallocated
 * `Float64Array`, recomputed once per window to cancel the accumulated float error. Use it to smooth a
 * noisy, high-frequency value before display.
 *
 * @example
 * const speed = new MovingAverage(10);
 * speed.push(12); // 12
 * speed.push(14); // 13
 */
export class MovingAverage {
  /** Number of values averaged. */
  public readonly windowSize: number;
  private readonly values: Float64Array;
  private next = 0;
  private length = 0;
  private total = 0;

  /**
   * Allocates an empty window.
   *
   * @param windowSize - Number of values averaged, a positive integer.
   * @throws {RangeError} When `windowSize` is not a positive integer.
   */
  public constructor(windowSize: number) {
    if (!Number.isSafeInteger(windowSize) || windowSize < 1) {
      throw new RangeError(`windowSize must be a positive integer, got ${windowSize}`);
    }
    this.windowSize = windowSize;
    this.values = new Float64Array(windowSize);
  }

  /**
   * Average of the values in the window.
   *
   * @returns The current average; `NaN` before the first value.
   */
  public get value(): number {
    return this.length === 0 ? NaN : this.total / this.length;
  }

  /**
   * Number of values in the window.
   *
   * @returns The count, up to `windowSize`.
   */
  public get count(): number {
    return this.length;
  }

  /**
   * Adds a value; once the window is full, the oldest value leaves it.
   *
   * @param value - The new value.
   * @returns The new average.
   */
  public push(value: number): number {
    if (this.length < this.windowSize) {
      this.length += 1;
      this.total += value;
    } else {
      /* v8 ignore next -- `?? 0` only satisfies noUncheckedIndexedAccess: `next` is always in range. */
      this.total += value - (this.values[this.next] ?? 0);
    }
    this.values[this.next] = value;
    this.next += 1;
    if (this.next === this.windowSize) {
      this.next = 0;
      this.total = sum(this.values);
    }
    return this.value;
  }

  /** Empties the window. */
  public reset(): void {
    this.values.fill(0);
    this.next = 0;
    this.length = 0;
    this.total = 0;
  }
}
