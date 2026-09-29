/**
 * Checks whether a value is neither `null` nor `undefined`.
 *
 * Differs from `isNotUndefined`, which only excludes `undefined`: use `isDefined` to filter out missing
 * values, `isNotUndefined` when `null` is a meaningful value.
 *
 * @template T - Type of the value.
 * @param value - The value to check.
 * @returns `true` when the value is present (`0`, `''` and `false` included).
 * @example
 * [1, null, undefined].filter(isDefined); // [1], typed number[]
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  // eslint-disable-next-line sonarjs/different-types-comparison -- false positive: `T` may include `undefined`.
  return value !== null && value !== undefined;
}
