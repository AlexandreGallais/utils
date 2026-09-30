const DIGIT_PATTERN = /^\p{N}$/v;

type CharacterKind = 'digit' | 'lower' | 'separator' | 'upper';

function isBoundary(previous: CharacterKind, current: CharacterKind): boolean {
  const isLetterToDigit = (previous === 'digit') !== (current === 'digit');
  return previous !== 'separator' && ((previous === 'lower' && current === 'upper') || isLetterToDigit);
}

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
 * Splits a string into words, whatever its case style (camelCase, kebab-case, snake_case, spaces…), in one
 * pass. Acronyms and numbers are words of their own.
 *
 * @param input - The identifier or sentence to split, in any case style.
 * @returns The words, with their original case; empty when there is none.
 * @example
 * splitWords('XMLHttpRequest'); // ['XML', 'Http', 'Request']
 * splitWords('user_id-v2 Name'); // ['user', 'id', 'v', '2', 'Name']
 */
export function splitWords(input: string): string[] {
  const result: string[] = [];
  let word = '';
  let previous: CharacterKind = 'separator';
  for (const character of input) {
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
