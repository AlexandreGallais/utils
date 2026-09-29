/**
 * Checks whether a value is a non-null object: plain objects, arrays, class instances, dates… Functions are
 * excluded. Use `isRecord` for plain objects only.
 *
 * @param value - The value to check.
 * @returns `true` for any non-null object.
 * @example
 * isObject([]); // true
 * isObject(null); // false
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
