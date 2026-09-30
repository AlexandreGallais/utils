/**
 * Lower-cases the first character of a string and leaves the rest unchanged: the reverse of `capitalize`.
 *
 * @param input - The string.
 * @returns The string with its first character in lower case.
 * @example
 * uncapitalize('RingBuffer'); // 'ringBuffer'
 * uncapitalize('Élan'); // 'élan'
 */
export function uncapitalize(input: string): string {
  const first = input.codePointAt(0);
  if (first === undefined) {
    return input;
  }
  const firstCharacter = String.fromCodePoint(first);
  return firstCharacter.toLowerCase() + input.slice(firstCharacter.length);
}
