const DIGIT_PATTERN = /^\p{N}$/v;

/** Kind of a character, for word boundaries. */
type CharacterKind = 'digit' | 'lower' | 'separator' | 'upper';

/**
 * Splits a string into words, whatever its case style: camelCase, PascalCase, kebab-case, snake_case,
 * CONSTANT_CASE, spaces or punctuation. Acronyms and numbers are words of their own; Unicode letters are
 * supported. One linear pass, no backtracking regular expression. The case functions (`camelCase`,
 * `kebabCase`…) are built on it.
 *
 * @param input - Any identifier or sentence. Defaults to `''`.
 * @returns The words, with their original case; empty when there is none.
 * @example
 * words('XMLHttpRequest'); // ['XML', 'Http', 'Request']
 * words('user_id-v2 Name'); // ['user', 'id', 'v', '2', 'Name']
 */
export function words(input?: string | null): string[] {
  const resolvedInput = input ?? '';
  const result: string[] = [];
  let word = '';
  let previous: CharacterKind = 'separator';
  for (const character of resolvedInput) {
    const kind = kindOf(character);
    if (kind === 'separator') {
      if (word !== '') {
        result.push(word);
      }
      word = '';
    } else if (isBoundary(previous, kind)) {
      result.push(word);
      word = character;
    } else if (previous === 'upper' && kind === 'lower' && word.length > 1) {
      // End of an acronym: `XMLHttp` → the last capital starts the next word.
      const lastCapital = word.slice(-1);
      result.push(word.slice(0, -1));
      word = lastCapital + character;
    } else {
      word += character;
    }
    previous = kind;
  }
  if (word !== '') {
    result.push(word);
  }
  return result;
}

/**
 * Classifies a character.
 *
 * @param character - A single code point.
 * @returns Its kind: a letter has a case, a digit is any Unicode number, the rest separates words.
 */
function kindOf(character: string): CharacterKind {
  if (character !== character.toLowerCase()) {
    return 'upper';
  }
  if (character !== character.toUpperCase()) {
    return 'lower';
  }
  return DIGIT_PATTERN.test(character) ? 'digit' : 'separator';
}

/**
 * Tells whether a new word starts between two consecutive characters of a word.
 *
 * @param previous - Kind of the previous character.
 * @param current - Kind of the current character, not a separator.
 * @returns `true` between a lowercase letter and a capital, or between a letter and a digit.
 */
function isBoundary(previous: CharacterKind, current: CharacterKind): boolean {
  const isLetterToDigit = (previous === 'digit') !== (current === 'digit');
  return previous !== 'separator' && ((previous === 'lower' && current === 'upper') || isLetterToDigit);
}
