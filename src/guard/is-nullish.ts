/**
 * Checks whether a value is `null` or `undefined`: the opposite of `isDefined`.
 *
 * @param value - The value to check.
 * @returns `true` for `null` and `undefined`; `false` for `0`, `''` and `false`.
 * @example
 * isNullish(undefined); // true
 * isNullish(0); // false
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
