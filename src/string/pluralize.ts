/**
 * Picks the singular or plural form of a word for a count, with the English rule (singular for exactly 1 or
 * -1). For other languages, pass both forms; French treats 0 and 1 as singular, so use `isSingular` there.
 *
 * @param count - The number of items.
 * @param singular - The singular form, such as `'alarm'`.
 * @param plural - The plural form; `singular + 's'` when omitted.
 * @param isSingular - Whether the count takes the singular; `|count| === 1` by default.
 * @returns The form matching the count.
 * @example
 * `${count} ${pluralize(count, 'alarm')}`; // '1 alarm', '3 alarms'
 * pluralize(0, 'alarme', 'alarmes', Math.abs(0) < 2); // 'alarme' (French rule)
 */
export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
  isSingular: boolean = Math.abs(count) === 1,
): string {
  return isSingular ? singular : plural;
}
