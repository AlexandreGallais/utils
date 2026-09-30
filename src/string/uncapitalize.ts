/**
 * Lower-cases the first character of a string and leaves the rest unchanged: the reverse of `capitalize`.
 *
 * @param input - Any string. Defaults to `''`.
 * @returns The string with its first character in lower case.
 * @example
 * uncapitalize('RingBuffer'); // 'ringBuffer'
 * uncapitalize('Élan'); // 'élan'
 */
export function uncapitalize(input?: string | null): string {
  const resolvedInput = input ?? '';
  const first = resolvedInput.codePointAt(0);
  if (first === undefined) {
    return resolvedInput;
  }
  const firstCharacter = String.fromCodePoint(first);
  return firstCharacter.toLowerCase() + resolvedInput.slice(firstCharacter.length);
}
