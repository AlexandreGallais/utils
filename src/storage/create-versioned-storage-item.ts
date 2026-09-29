import { isRecord } from '../guard/is-record.ts';
import { readStorage } from './read-storage.ts';
import type { StorageItem } from './storage-item.ts';
import type { VersionedStorageOptions } from './versioned-storage-options.ts';
import { writeStorage } from './write-storage.ts';

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
