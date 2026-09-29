/**
 * Checks whether a value is a boolean.
 *
 * @param value - The value to check.
 * @returns `true` for `true` and `false` only (not for truthy or falsy values).
 * @example
 * isBoolean(false); // true
 * isBoolean(0); // false
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
