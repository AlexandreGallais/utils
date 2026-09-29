/**
 * The schema of a value stored by `createVersionedStorageItem`.
 *
 * @template T - Type of the value in the current schema.
 */
export interface VersionedStorageOptions<T> {
  /** Version of the current schema: increase it each time the shape of the stored value changes. */
  readonly version: number;
  /** Value read when nothing valid is stored, or when an old value cannot be migrated. */
  readonly fallback: T;

  /**
   * Checks a stored or migrated value; any JSON value is accepted when omitted.
   *
   * @param value - The value to check.
   * @returns `true` when the value has the shape of `T`.
   */
  guard?(value: unknown): value is T;

  /**
   * Converts a value saved by an older version of the application into the current schema, instead of
   * losing the user's settings. Without it, old values are replaced by the fallback.
   *
   * @param value - The old value.
   * @param fromVersion - Its schema version; `0` for a value stored without version (by `writeStorage` or
   * `createStorageItem`).
   * @returns The value in the current schema, checked by `guard` afterwards.
   */
  migrate?(value: unknown, fromVersion: number): unknown;
}
