/**
 * Moves a date by a number of calendar days, keeping its time of day: across a daylight saving time change,
 * `addDays` keeps 14:00 at 14:00 where adding 24 hours would give 13:00 or 15:00.
 *
 * @param date - The starting date.
 * @param days - Days to add, negative to go back; an integer.
 * @param isUtc - Whether to count UTC days; local days otherwise.
 * @returns A new `Date`.
 * @example
 * addDays(new Date('2026-09-29T14:00:00Z'), 3, true).toISOString(); // '2026-10-02T14:00:00.000Z'
 */
export function addDays(date: Readonly<Date>, days: number, isUtc = false): Date {
  const result = new Date(date);
  if (isUtc) {
    result.setUTCDate(result.getUTCDate() + days);
  } else {
    result.setDate(result.getDate() + days);
  }
  return result;
}
