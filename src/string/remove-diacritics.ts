const DIACRITICS_PATTERN = /\p{M}/gv;

/**
 * Removes the accents of a text (`Été` → `Ete`), to search or sort without them. `ø`, `ß` or `æ` stay.
 *
 * @param input - The text.
 * @returns The text without combining marks.
 * @example
 * removeDiacritics('Crème brûlée à Évian'); // 'Creme brulee a Evian'
 */
export function removeDiacritics(input: string): string {
  return input.normalize('NFD').replaceAll(DIACRITICS_PATTERN, '');
}
