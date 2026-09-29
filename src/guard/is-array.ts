/**
 * Checks whether a value is an array, whatever its items.
 *
 * @param value - The value to check.
 * @returns `true` for an array; `false` for array-likes such as strings or typed arrays.
 * @example
 * isArray([1, 2]); // true
 * isArray({ length: 0 }); // false
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}
