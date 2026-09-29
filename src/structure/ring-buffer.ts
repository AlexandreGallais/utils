/**
 * Fixed-capacity circular buffer: once full, each `push` overwrites the oldest item. Memory is allocated once
 * and pushes are O(1) without allocation: the structure for a value history (the last N samples of a sensor,
 * a sparkline) fed at a high rate. Index 0 is the oldest item, `-1` the newest.
 *
 * @template T - Type of the items.
 * @example
 * const history = new RingBuffer<number>(3);
 * for (const value of [1, 2, 3, 4]) {
 *   history.push(value);
 * }
 * history.toArray(); // [2, 3, 4]
 * history.at(-1); // 4
 */
export class RingBuffer<T> implements Iterable<T> {
  /** Maximum number of items kept. */
  public readonly capacity: number;
  private readonly items: (T | undefined)[];
  private start = 0;
  private length = 0;

  /**
   * Allocates an empty buffer.
   *
   * @param capacity - Maximum number of items kept, a positive integer.
   * @throws {RangeError} When `capacity` is not a positive integer.
   */
  public constructor(capacity: number) {
    if (!Number.isSafeInteger(capacity) || capacity < 1) {
      throw new RangeError(`capacity must be a positive integer, got ${capacity}`);
    }
    this.capacity = capacity;
    // Filled with `undefined` (not `new Array(n)`): a packed array stays on the engine's fast path.
    this.items = Array.from<T | undefined>({ length: capacity });
  }

  /**
   * Number of items stored, up to `capacity`.
   *
   * @returns The current number of items.
   */
  public get size(): number {
    return this.length;
  }

  /**
   * Whether the next `push` overwrites the oldest item.
   *
   * @returns `true` when `size === capacity`.
   */
  public get isFull(): boolean {
    return this.length === this.capacity;
  }

  /**
   * Adds an item as the newest one.
   *
   * @param item - The item to add.
   * @returns The overwritten oldest item when the buffer was full, `undefined` otherwise.
   */
  public push(item: T): T | undefined {
    if (this.length < this.capacity) {
      this.items[(this.start + this.length) % this.capacity] = item;
      this.length += 1;
      return undefined;
    }
    const overwritten = this.items[this.start];
    this.items[this.start] = item;
    this.start = (this.start + 1) % this.capacity;
    return overwritten;
  }

  /**
   * Reads an item by position.
   *
   * @param index - Position from the oldest item (`0`), or from the newest when negative (`-1`).
   * @returns The item, or `undefined` when the index is out of range or not an integer.
   */
  public at(index: number): T | undefined {
    const position = index < 0 ? this.length + index : index;
    return !Number.isSafeInteger(position) || position < 0 || position >= this.length
      ? undefined
      : this.items[(this.start + position) % this.capacity];
  }

  /** Removes every item and releases the references. */
  public clear(): void {
    this.items.fill(undefined);
    this.start = 0;
    this.length = 0;
  }

  /**
   * Copies the items into an array.
   *
   * @returns A new array, oldest item first.
   */
  public toArray(): T[] {
    return [...this];
  }

  /**
   * Iterates the items.
   *
   * @yields {T} Each item, oldest first.
   */
  public *[Symbol.iterator](): Iterator<T> {
    for (let position = 0; position < this.length; position++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- every slot below `size` holds a pushed `T`.
      yield this.items[(this.start + position) % this.capacity] as T;
    }
  }
}
