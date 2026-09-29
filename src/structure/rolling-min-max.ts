/**
 * Minimum and maximum of the last N values, in amortized O(1) per value (monotonic queues over preallocated
 * buffers, no allocation after construction): the range band of a trend, the min/max markers of a gauge
 * over the last minute of samples.
 *
 * @example
 * const range = new RollingMinMax(3);
 * range.push(5);
 * range.push(9);
 * range.push(1); // min 1, max 9
 * range.push(4); // 5 left the window: min 1, max 9
 * range.push(2); // 9 left the window: min 1, max 4
 */
export class RollingMinMax {
  /** Number of values in the window. */
  public readonly windowSize: number;
  // Values by sequence number, modulo the window size.
  private readonly values: Float64Array;
  // Sequence numbers of the candidates, as ring buffers: increasing values for the minimum, decreasing for the maximum.
  private readonly minQueue: Float64Array;
  private readonly maxQueue: Float64Array;
  private minHead = 0;
  private minTail = 0;
  private maxHead = 0;
  private maxTail = 0;
  private pushed = 0;

  /**
   * Allocates an empty window.
   *
   * @param windowSize - Number of values kept, a positive integer.
   * @throws {RangeError} When `windowSize` is not a positive integer.
   */
  public constructor(windowSize: number) {
    if (!Number.isSafeInteger(windowSize) || windowSize < 1) {
      throw new RangeError(`windowSize must be a positive integer, got ${windowSize}`);
    }
    this.windowSize = windowSize;
    this.values = new Float64Array(windowSize);
    this.minQueue = new Float64Array(windowSize);
    this.maxQueue = new Float64Array(windowSize);
  }

  /**
   * Smallest value in the window.
   *
   * @returns The minimum; `NaN` before the first value.
   */
  public get min(): number {
    return this.pushed === 0 ? NaN : this.valueAt(this.queueAt(this.minQueue, this.minHead));
  }

  /**
   * Largest value in the window.
   *
   * @returns The maximum; `NaN` before the first value.
   */
  public get max(): number {
    return this.pushed === 0 ? NaN : this.valueAt(this.queueAt(this.maxQueue, this.maxHead));
  }

  /**
   * Number of values in the window.
   *
   * @returns The count, up to `windowSize`.
   */
  public get count(): number {
    return Math.min(this.pushed, this.windowSize);
  }

  /**
   * Adds a value; once the window is full, the oldest value leaves it.
   *
   * @param value - The new value.
   */
  public push(value: number): void {
    const sequence = this.pushed;
    const oldest = sequence - this.windowSize;
    // Drop the candidates leaving the window before their value is overwritten.
    if (this.minTail > this.minHead && this.queueAt(this.minQueue, this.minHead) <= oldest) {
      this.minHead += 1;
    }
    if (this.maxTail > this.maxHead && this.queueAt(this.maxQueue, this.maxHead) <= oldest) {
      this.maxHead += 1;
    }
    this.values[sequence % this.windowSize] = value;
    while (this.minTail > this.minHead && this.valueAt(this.queueAt(this.minQueue, this.minTail - 1)) >= value) {
      this.minTail -= 1;
    }
    while (this.maxTail > this.maxHead && this.valueAt(this.queueAt(this.maxQueue, this.maxTail - 1)) <= value) {
      this.maxTail -= 1;
    }
    this.minQueue[this.minTail % this.windowSize] = sequence;
    this.minTail += 1;
    this.maxQueue[this.maxTail % this.windowSize] = sequence;
    this.maxTail += 1;
    this.pushed += 1;
  }

  /** Empties the window. */
  public reset(): void {
    this.minHead = 0;
    this.minTail = 0;
    this.maxHead = 0;
    this.maxTail = 0;
    this.pushed = 0;
  }

  /**
   * Reads a queue slot.
   *
   * @param queue - The minimum or maximum queue.
   * @param position - The position, before wrapping around the buffer.
   * @returns The sequence number stored there.
   */
  private queueAt(queue: ArrayLike<number>, position: number): number {
    /* v8 ignore next -- `?? 0` only satisfies noUncheckedIndexedAccess: the index is always in range. */
    return queue[position % this.windowSize] ?? 0;
  }

  /**
   * Reads the value pushed with a sequence number still in the window.
   *
   * @param sequence - The rank of the value among all the values pushed.
   * @returns The number pushed at that rank.
   */
  private valueAt(sequence: number): number {
    /* v8 ignore next -- `?? 0` only satisfies noUncheckedIndexedAccess: the index is always in range. */
    return this.values[sequence % this.windowSize] ?? 0;
  }
}
