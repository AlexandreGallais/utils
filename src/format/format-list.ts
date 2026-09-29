/** List formatters by locale and style: creating an `Intl.ListFormat` costs more than using it. */
const listFormatters = new Map<string, Intl.ListFormat>();

/**
 * Joins items into a readable list with the rules of a locale: `'a, b and c'` in English, `'a, b et c'` in
 * French. Formatters are cached per locale and type.
 *
 * @param items - The texts to join.
 * @param locale - BCP 47 locale, such as `'fr-FR'`.
 * @param type - `'conjunction'` for "and", `'disjunction'` for "or", `'unit'` for a plain list.
 * @returns The joined list; `''` without item.
 * @example
 * formatList(['pump', 'valve', 'tank'], 'en-US', 'conjunction'); // 'pump, valve, and tank'
 * formatList(['pompe', 'vanne'], 'fr-FR', 'disjunction'); // 'pompe ou vanne'
 */
export function formatList(items: Iterable<string>, locale: string, type: Intl.ListFormatType): string {
  const key = `${locale}|${type}`;
  let formatter = listFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.ListFormat(locale, { type });
    listFormatters.set(key, formatter);
  }
  return formatter.format(items);
}
