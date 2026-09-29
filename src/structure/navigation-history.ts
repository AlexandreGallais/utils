/**
 * Back / forward history of views, like a browser's: `push` goes to a new entry and drops every entry after
 * the current one, `back` and `forward` move without losing them.
 *
 * @template T - Type of the entries, such as a view name or a route.
 * @example
 * const history = new NavigationHistory<string>(Infinity);
 * history.push('home');
 * history.push('engine');
 * history.push('alarms');
 * history.back(); // 'engine'
 * history.push('radar'); // 'alarms' is dropped
 * history.entries; // ['home', 'engine', 'radar']
 * history.canGoForward; // false
 */
export class NavigationHistory<T> {
  /** Maximum number of entries kept; the oldest ones are dropped beyond it. */
  public readonly maxSize: number;
  private items: T[] = [];
  private position = -1;

  /**
   * Creates an empty history.
   *
   * @param maxSize - Maximum number of entries kept, a positive integer (or `Infinity` for no limit).
   * @throws {RangeError} When `maxSize` is not a positive integer or `Infinity`.
   */
  public constructor(maxSize: number) {
    if (maxSize !== Infinity && (!Number.isSafeInteger(maxSize) || maxSize < 1)) {
      throw new RangeError(`maxSize must be a positive integer, got ${maxSize}`);
    }
    this.maxSize = maxSize;
  }

  /**
   * The entry the history is at.
   *
   * @returns The current entry, `undefined` when the history is empty.
   */
  public get current(): T | undefined {
    return this.items[this.position];
  }

  /**
   * Position of the current entry.
   *
   * @returns Its index in `entries`, `-1` when the history is empty.
   */
  public get index(): number {
    return this.position;
  }

  /**
   * Every entry, back ones and forward ones included.
   *
   * @returns A copy of the entries, oldest first.
   */
  public get entries(): T[] {
    return [...this.items];
  }

  /**
   * Whether `back` can move.
   *
   * @returns `true` when there is an entry before the current one.
   */
  public get canGoBack(): boolean {
    return this.position > 0;
  }

  /**
   * Whether `forward` can move.
   *
   * @returns `true` when there is an entry after the current one.
   */
  public get canGoForward(): boolean {
    return this.position < this.items.length - 1;
  }

  /**
   * Goes to a new entry: the entries after the current one are dropped. Pushing the current entry again
   * does nothing, so repeated navigations to the same view do not pile up.
   *
   * @param entry - The new entry.
   * @returns The new current entry.
   */
  public push(entry: T): T {
    if (this.position >= 0 && Object.is(this.items[this.position], entry)) {
      return entry;
    }
    this.items = [...this.items.slice(0, this.position + 1), entry];
    if (this.items.length > this.maxSize) {
      this.items = this.items.slice(this.items.length - this.maxSize);
    }
    this.position = this.items.length - 1;
    return entry;
  }

  /**
   * Replaces the current entry without adding one (a redirection), or pushes it when the history is empty.
   *
   * @param entry - The entry replacing the current one.
   * @returns The new current entry.
   */
  public replace(entry: T): T {
    if (this.position < 0) {
      return this.push(entry);
    }
    this.items[this.position] = entry;
    return entry;
  }

  /**
   * Moves one entry back.
   *
   * @returns The new current entry, or `undefined` (without moving) when there is none before.
   */
  public back(): T | undefined {
    return this.go(-1);
  }

  /**
   * Moves one entry forward.
   *
   * @returns The new current entry, or `undefined` (without moving) when there is none after.
   */
  public forward(): T | undefined {
    return this.go(1);
  }

  /**
   * Moves by several entries at once.
   *
   * @param delta - Number of entries to move: negative goes back, positive goes forward.
   * @returns The new current entry, or `undefined` (without moving) when the target is out of range.
   */
  public go(delta: number): T | undefined {
    const target = this.position + delta;
    if (!Number.isSafeInteger(target) || target < 0 || target >= this.items.length) {
      return undefined;
    }
    this.position = target;
    return this.items[target];
  }

  /** Removes every entry. */
  public clear(): void {
    this.items = [];
    this.position = -1;
  }
}
