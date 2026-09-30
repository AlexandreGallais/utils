/** Combining marks left by the NFD normalization of accented letters. */
const DIACRITICS_PATTERN = /\p{M}/gv;

/**
 * Removes the accents and other diacritics of a text (`Été` → `Ete`), to compare, sort or search without
 * accents, or to build identifiers. Letters without an ASCII base (`ø`, `ß`, `æ`) are kept.
 *
 * @param input - Any text. Defaults to `''`.
 * @returns The text without combining marks.
 * @example
 * removeDiacritics('Crème brûlée à Évian'); // 'Creme brulee a Evian'
 */
export function removeDiacritics(input?: string | null): string {
  const resolvedInput = input ?? '';
  return resolvedInput.normalize('NFD').replaceAll(DIACRITICS_PATTERN, '');
}
