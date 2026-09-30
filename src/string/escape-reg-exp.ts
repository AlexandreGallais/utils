const SYNTAX_CHARACTERS: ReadonlySet<string> = new Set([
  '\\',
  '^',
  '$',
  '.',
  '*',
  '+',
  '?',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  '|',
  '/',
]);

/**
 * Escapes a text so that it matches literally in a regular expression, `v` flag included.
 *
 * @param input - The literal text to search for.
 * @returns The text with every regular expression syntax character escaped.
 * @example
 * new RegExp(`^${escapeRegExp('1+1=2?')}$`, 'v').test('1+1=2?'); // true
 */
export function escapeRegExp(input: string): string {
  return Array.from(input, (character) => (SYNTAX_CHARACTERS.has(character) ? `\\${character}` : character)).join('');
}
