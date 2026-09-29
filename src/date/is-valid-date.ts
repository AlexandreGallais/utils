/**
 * Checks whether a value is a usable `Date`: a `Date` instance whose time is not `NaN` (`new Date('oops')`
 * is a `Date`, but an invalid one).
 *
 * @param value - The value to check.
 * @returns `true` for a valid `Date`.
 * @example
 * isValidDate(new Date('2026-09-29')); // true
 * isValidDate(new Date('oops')); // false
 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}
