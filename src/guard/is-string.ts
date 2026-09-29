/**
 * Checks whether a value is a string primitive.
 *
 * @param value - The value to check.
 * @returns `true` for a string, the empty string included.
 * @example
 * isString(''); // true
 * isString(1); // false
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
