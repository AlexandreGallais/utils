/**
 * Reads a JSON value from a web storage (`localStorage`, `sessionStorage`) without ever throwing: a missing
 * key, corrupted JSON, a value rejected by the guard or a storage blocked by the browser all give the
 * fallback. The type guard makes the stored shape trustworthy.
 *
 * @template T - Type of the value.
 * @param storage - The storage, such as `localStorage`.
 * @param key - The key of the value.
 * @param fallback - Value returned when nothing valid is stored.
 * @param guard - Checks the parsed value, such as `isFiniteNumber`.
 * @returns The stored value, or `fallback`.
 * @example
 * const zoom = readStorage(localStorage, 'chart.zoom', 1, isFiniteNumber);
 */
export function readStorage<T>(storage: Storage, key: string, fallback: T, guard: (value: unknown) => value is T): T {
  const text = getItem(storage, key);
  const parsed = typeof text === 'string' ? parseJson(text) : undefined;
  if (!parsed) {
    return fallback;
  }
  return guard(parsed.value) ? parsed.value : fallback;
}

/**
 * Reads the text of a key, a storage blocked by the browser (private mode, policy) counting as empty.
 *
 * @param storage - The storage to read.
 * @param key - The key to read.
 * @returns The stored text; `null` when the key is absent, `undefined` when the storage throws.
 */
function getItem(storage: Storage, key: string): string | null | undefined {
  try {
    return storage.getItem(key);
  } catch {
    return undefined;
  }
}

/**
 * Parses JSON without throwing.
 *
 * @param text - Text read from the storage, expected to be JSON.
 * @returns The value, wrapped so a stored `null` is told apart from a failure, or `undefined` for invalid JSON.
 */
function parseJson(text: string): { readonly value: unknown } | undefined {
  try {
    return { value: JSON.parse(text) };
  } catch {
    return undefined;
  }
}
