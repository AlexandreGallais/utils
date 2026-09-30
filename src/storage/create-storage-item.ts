import { readStorage } from './read-storage';
import type { StorageItem } from './storage-item';
import { writeStorage } from './write-storage';

/**
 * Binds a typed value to one key of a web storage, with its fallback and guard declared once: a user
 * setting, a panel layout, the last opened view. Reads and writes never throw.
 *
 * @template T - Type of the value.
 * @param storage - The storage, such as `localStorage`.
 * @param key - The key of the value.
 * @param fallback - Value read when nothing valid is stored.
 * @param guard - Checks the stored value, such as `isFiniteNumber`.
 * @returns An item with `get`, `set` and `remove`.
 * @example
 * const theme = createStorageItem(localStorage, 'ui.theme', 'day', (value) => value === 'day' || value === 'night');
 * theme.set('night');
 * theme.get(); // 'night'
 */
export function createStorageItem<T>(
  storage: Storage,
  key: string,
  fallback: T,
  guard: (value: unknown) => value is T,
): StorageItem<T> {
  return {
    key,
    get: (): T => readStorage(storage, key, fallback, guard),
    set: (value: T): boolean => writeStorage(storage, key, value),
    remove: (): void => {
      writeStorage(storage, key, undefined);
    },
  };
}
