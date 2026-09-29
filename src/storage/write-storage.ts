/**
 * Writes a value as JSON to a web storage (`localStorage`, `sessionStorage`) without ever throwing: a full
 * quota or a storage blocked by the browser gives `false` instead of an exception.
 *
 * @param storage - The storage, such as `localStorage`.
 * @param key - The key of the value.
 * @param value - Any JSON-serializable value; `undefined` removes the key.
 * @returns `true` when the value was stored (or removed), `false` when the storage refused it.
 * @example
 * if (!writeStorage(localStorage, 'chart.zoom', zoom)) {
 *   log.warn('Zoom not saved');
 * }
 */
export function writeStorage(storage: Storage, key: string, value: unknown): boolean {
  return attempt(
    value === undefined
      ? (): void => {
          storage.removeItem(key);
        }
      : (): void => {
          storage.setItem(key, JSON.stringify(value));
        },
  );
}

/**
 * Runs a storage operation, turning its exception into a result.
 *
 * @param operation - The write or removal.
 * @returns `true` when it succeeded, `false` when it threw.
 */
function attempt(operation: () => void): boolean {
  try {
    operation();
  } catch {
    return false;
  }
  return true;
}
