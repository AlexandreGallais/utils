/**
 * Picks the singular or plural form of a word for a count, with the English rule (singular for exactly 1 or
 * -1). For other languages, pass both forms; French treats 0 and 1 as singular, so use `isSingular` there.
 *
 * @param count - The number of items.
 * @param singular - The singular form, such as `'alarm'`.
 * @param plural - The plural form, such as `'items'`. Defaults to the singular followed by `s`.
 * @param isSingular - Whether the count takes the singular: `Math.abs(count) === 1` in English, `Math.abs(count) < 2`
 * in French. Defaults to `Math.abs(count) === 1` (English).
 * @returns The form matching the count.
 * @example
 * `${count} ${pluralize(count, 'alarm', 'alarms', Math.abs(count) === 1)}`; // '1 alarm', '3 alarms'
 * pluralize(0, 'alarme', 'alarmes', Math.abs(0) < 2); // 'alarme' (French rule)
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string | null,
  isSingular?: boolean | null,
): string {
  const resolvedPlural = plural ?? `${singular}s`;
  const resolvedIsSingular = isSingular ?? Math.abs(count) === 1;
  return resolvedIsSingular ? singular : resolvedPlural;
}
