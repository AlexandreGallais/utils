/**
 * Checks whether a value is `null`; `undefined` does not pass.
 *
 * @param value - The value to check.
 * @returns `true` for `null` only.
 * @example
 * isNull(null); // true
 * isNull(undefined); // false
 */
export function isNull(value: unknown): value is null {
  return value === null;
}
