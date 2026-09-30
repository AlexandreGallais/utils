/**
 * Checks whether a container holds nothing: an empty string, array, `Map`, `Set` or object. `null` and
 * `undefined` count as empty.
 *
 * @param value - The value to check.
 * @returns `true` for an empty container, `null` or `undefined`; `false` for a number or a boolean.
 * @example
 * isEmpty({}); // true
 * isEmpty([0]); // false
 * isEmpty(new Map()); // true
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string') {
    return value.length === 0;
  }
  if (typeof value !== 'object') {
    return false;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  return (
    (Array.isArray(value) || ArrayBuffer.isView(value) ? Reflect.get(value, 'length') : Object.keys(value).length) === 0
  );
}
