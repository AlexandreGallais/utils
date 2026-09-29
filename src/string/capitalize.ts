/**
 * Upper-cases the first character of a string and leaves the rest unchanged. Unicode aware: the first code
 * point is upper-cased, even outside the basic plane.
 *
 * @param input - Any string.
 * @returns The string with its first character in upper case.
 * @example
 * capitalize('hello world'); // 'Hello world'
 * capitalize('élan'); // 'Élan'
 */
export function capitalize(input: string): string {
  const first = input.codePointAt(0);
  if (first === undefined) {
    return input;
  }
  const firstCharacter = String.fromCodePoint(first);
  return firstCharacter.toUpperCase() + input.slice(firstCharacter.length);
}
