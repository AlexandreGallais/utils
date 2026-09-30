/**
 * Checks whether a value is a non-null object: plain object, array, class instance, date… `isRecord` accepts
 * plain objects only.
 *
 * @param value - The value to check.
 * @returns `true` for any non-null object; `false` for a function.
 * @example
 * isObject([]); // true
 * isObject(null); // false
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
