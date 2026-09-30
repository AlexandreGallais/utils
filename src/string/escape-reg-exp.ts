/** Syntax characters of a regular expression (the only ones a `u` or `v` pattern accepts escaped), and `/`. */
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
 * Escapes a text so it matches literally in a regular expression (outside a character class), with or
 * without the `u` / `v` flags. The native `RegExp.escape` is ES2025.
 *
 * @param input - The literal text to search for. Defaults to `''`.
 * @returns The text with every regular expression syntax character escaped.
 * @example
 * new RegExp(`^${escapeRegExp('1+1=2?')}$`, 'v').test('1+1=2?'); // true
 */
export function escapeRegExp(input?: string | null): string {
  const resolvedInput = input ?? '';
  return Array.from(resolvedInput, (character) =>
    SYNTAX_CHARACTERS.has(character) ? `\\${character}` : character,
  ).join('');
}
