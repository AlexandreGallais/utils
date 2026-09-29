/**
 * Checks whether a value is missing or holds only whitespace: a required text field left empty.
 *
 * @param input - A string, `null` or `undefined`.
 * @returns `true` for `null`, `undefined`, `''` or whitespace only.
 * @example
 * isBlank('  \n'); // true
 * isBlank(' a '); // false
 */
export function isBlank(input: string | null | undefined): boolean {
  return input === null || input === undefined || input.trim() === '';
}
