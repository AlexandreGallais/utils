/**
 * Picks the singular or plural form of a word for a count. French takes the singular for 0 too: pass
 * `Math.abs(count) < 2` as `isSingular`.
 *
 * @param count - The number of items.
 * @param singular - The singular form, such as `'alarm'`.
 * @param plural - The plural form. Defaults to `singular` followed by `s`.
 * @param isSingular - Whether the count takes the singular. Defaults to `Math.abs(count) === 1` (English).
 * @returns The form matching the count.
 * @example
 * pluralize(3, 'alarm'); // 'alarms'
 * pluralize(0, 'alarme', 'alarmes', Math.abs(0) < 2); // 'alarme'
 */
export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
  isSingular = Math.abs(count) === 1,
): string {
  return isSingular ? singular : plural;
}
