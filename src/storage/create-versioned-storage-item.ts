import { isRecord } from '../guard';
import { readStorage } from './read-storage';
import type { StorageItem } from './storage-item';
import { writeStorage } from './write-storage';

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

/**
 * Binds a typed value to one key of a web storage together with the version of its schema, stored as
 * `{ version, value }`: when a new release changes the shape of a setting, the value saved by the previous
 * release is migrated once (and saved back) instead of being lost or read with the wrong shape. Reads and
 * writes never throw.
 *
 * @template T - Type of the value in the current schema.
 * @param storage - The storage, such as `localStorage`.
 * @param key - The key of the value.
 * @param options - The schema version, the fallback, the guard and the migration.
 * @returns An item with `get`, `set` and `remove`; a value saved by a newer release gives the fallback.
 * @example
 * // Version 1 stored `{ zoom: number }`; version 2 adds `isGridVisible`.
 * const view = createVersionedStorageItem(localStorage, 'chart.view', {
 *   version: 2,
 *   fallback: { zoom: 1, isGridVisible: true },
 *   migrate: (value, fromVersion) => (fromVersion === 1 && isRecord(value) ? { ...value, isGridVisible: true } : undefined),
 *   guard: isChartView,
 * });
 */
export function createVersionedStorageItem<T>(
  storage: Storage,
  key: string,
  options: VersionedStorageOptions<T>,
): StorageItem<T> {
  const { version, fallback } = options;

  function isValid(value: unknown): value is T {
    return options.guard === undefined || options.guard(value);
  }

  function set(value: T): boolean {
    return writeStorage(storage, key, { version, value });
  }

  function get(): T {
    const stored = readStorage<unknown>(storage, key, undefined, isAnyValue);
    if (stored === undefined) {
      return fallback;
    }
    const { storedVersion, value } = unwrap(stored);
    if (storedVersion === version) {
      return isValid(value) ? value : fallback;
    }
    if (storedVersion > version || !options.migrate) {
      return fallback;
    }
    const migrated = options.migrate(value, storedVersion);
    if (!isValid(migrated)) {
      return fallback;
    }
    set(migrated);
    return migrated;
  }

  return {
    key,
    get,
    set,
    remove: (): void => {
      writeStorage(storage, key, undefined);
    },
  };
}

/**
 * Accepts any parsed JSON: the envelope is checked by `unwrap`, the value by the guard of the options.
 *
 * @param _value - The parsed JSON.
 * @returns Always `true`.
 */
function isAnyValue(_value: unknown): _value is unknown {
  return true;
}

/**
 * Splits a stored entry into its schema version and its value.
 *
 * @param stored - The parsed JSON of the key.
 * @returns The version and the value; version `0` for a value stored without envelope.
 */
function unwrap(stored: unknown): { readonly storedVersion: number; readonly value: unknown } {
  return isRecord(stored) && typeof stored['version'] === 'number' && 'value' in stored
    ? { storedVersion: stored['version'], value: stored['value'] }
    : { storedVersion: 0, value: stored };
}
