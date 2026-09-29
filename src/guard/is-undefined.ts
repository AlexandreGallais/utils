/**
 * Checks whether a value is `undefined`; `null` does not pass.
 *
 * @param value - The value to check.
 * @returns `true` for `undefined` only.
 * @example
 * isUndefined(undefined); // true
 * isUndefined(null); // false
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}
