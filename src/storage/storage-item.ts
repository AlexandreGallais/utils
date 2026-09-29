/**
 * A typed value bound to one key of a web storage, returned by `createStorageItem`.
 *
 * @template T - Type of the value.
 */
export interface StorageItem<T> {
  /** The key of the value in the storage. */
  readonly key: string;

  /**
   * Reads the value.
   *
   * @returns The stored value, or the fallback when nothing valid is stored.
   */
  get(): T;

  /**
   * Stores a value.
   *
   * @param value - The new value.
   * @returns `true` when stored, `false` when the storage refused it (full, blocked).
   */
  set(value: T): boolean;
  /** Removes the value: `get` returns the fallback again. */
  remove(): void;
}
