/** Locale when none is given. */
const DEFAULT_LOCALE = 'en-US';

/** List formatters by locale and style: creating an `Intl.ListFormat` costs more than using it. */
const listFormatters = new Map<string, Intl.ListFormat>();

/**
 * Joins items into a readable list with the rules of a locale: `'a, b and c'` in English, `'a, b et c'` in
 * French. Formatters are cached per locale and type.
 *
 * @param items - The texts to join.
 * @param locale - BCP 47 locale, such as `'fr-FR'`. Defaults to `'en-US'`.
 * @param type - `'conjunction'` for "and", `'disjunction'` for "or", `'unit'` for a plain list. Defaults to
 * `'conjunction'`.
 * @returns The joined list; `''` without item.
 * @example
 * formatList(['pump', 'valve', 'tank'], 'en-US', 'conjunction'); // 'pump, valve, and tank'
 * formatList(['pompe', 'vanne'], 'fr-FR', 'disjunction'); // 'pompe ou vanne'
 */
export function formatList(items: Iterable<string>, locale?: string | null, type?: Intl.ListFormatType | null): string {
  const resolvedLocale = locale ?? DEFAULT_LOCALE;
  const resolvedType = type ?? 'conjunction';
  const key = `${resolvedLocale}|${resolvedType}`;
  let formatter = listFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.ListFormat(resolvedLocale, { type: resolvedType });
    listFormatters.set(key, formatter);
  }
  return formatter.format(items);
}
