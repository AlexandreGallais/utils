/**
 * A bounded map that forgets its least recently used entries: a cache of parsed files, rendered symbols or
 * query results that must not grow without limit. `get` and `set` are O(1) (a `Map` keeps the use order).
 *
 * @template K - Type of the keys.
 * @template V - Type of the values.
 * @example
 * const symbols = new LruCache<string, SVGElement>(100);
 * symbols.set(id, render(id));
 * symbols.get(id); // the element, now the most recently used
 */
export class LruCache<K, V> {
  /** Largest number of entries kept. */
  public readonly maxSize: number;
  // Values are boxed so that a cached `undefined` is told apart from a missing key.
  private readonly entries = new Map<K, { readonly value: V }>();

  /**
   * Creates an empty cache.
   *
   * @param maxSize - Largest number of entries kept, a positive integer.
   * @throws {RangeError} When `maxSize` is not a positive integer.
   */
  public constructor(maxSize: number) {
    if (!Number.isSafeInteger(maxSize) || maxSize < 1) {
      throw new RangeError(`maxSize must be a positive integer, got ${maxSize}`);
    }
    this.maxSize = maxSize;
  }

  /**
   * Number of entries in the cache.
   *
   * @returns The count, up to `maxSize`.
   */
  public get size(): number {
    return this.entries.size;
  }

  /**
   * Reads an entry and marks it as the most recently used.
   *
   * @param key - The key to look up.
   * @returns The value, or `undefined` when the key is not cached.
   */
  public get(key: K): V | undefined {
    const entry = this.entries.get(key);
    if (entry === undefined) {
      return undefined;
    }
    this.entries.delete(key);
    this.entries.set(key, entry);
    return entry.value;
  }

  /**
   * Checks whether a key is cached, without changing its use order.
   *
   * @param key - The key to look up.
   * @returns `true` when the key is cached.
   */
  public has(key: K): boolean {
    return this.entries.has(key);
  }

  /**
   * Adds or replaces an entry as the most recently used, evicting the least recently used one when full.
   *
   * @param key - The key to cache the value under.
   * @param value - The value to cache.
   */
  public set(key: K, value: V): void {
    this.entries.delete(key);
    this.entries.set(key, { value });
    // The first keys of a `Map` are the oldest inserted: here, the least recently used.
    for (const oldest of this.entries.keys()) {
      if (this.entries.size <= this.maxSize) {
        return;
      }
      this.entries.delete(oldest);
    }
  }

  /**
   * Removes an entry.
   *
   * @param key - The key to remove.
   * @returns `true` when the key was cached.
   */
  public delete(key: K): boolean {
    return this.entries.delete(key);
  }

  /** Removes every entry. */
  public clear(): void {
    this.entries.clear();
  }
}
