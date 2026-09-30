/** Splits text into user-perceived characters; created once, as creating it costs more than using it. */
const graphemeSegmenter = new Intl.Segmenter();

/**
 * Shortens a string to a maximum length, ending it with an ellipsis when it is cut. Lengths count
 * user-perceived characters (graphemes): an emoji, a flag or an accented letter is never split.
 *
 * @param input - The string to shorten. Defaults to `''`.
 * @param maxLength - Maximum length of the result, ellipsis included; a non-negative integer.
 * @param ellipsis - Appended when the string is cut. Defaults to `'…'`.
 * @returns The string itself when it fits, the cut string with its ellipsis otherwise.
 * @throws {RangeError} When `maxLength` is not a non-negative integer.
 * @example
 * truncate('Engine room temperature', 12, '…'); // 'Engine room…'
 * truncate('Short', 12, '…'); // 'Short'
 * truncate('Engine room temperature', 12, '...'); // 'Engine ro...'
 */
export function truncate(input: string | null | undefined, maxLength: number, ellipsis?: string | null): string {
  const resolvedInput = input ?? '';
  const resolvedEllipsis = ellipsis ?? '…';
  if (!Number.isSafeInteger(maxLength) || maxLength < 0) {
    throw new RangeError(`maxLength must be a non-negative integer, got ${maxLength}`);
  }
  const characters = graphemes(resolvedInput);
  if (characters.length <= maxLength) {
    return resolvedInput;
  }
  const ellipsisCharacters = graphemes(resolvedEllipsis);
  return ellipsisCharacters.length >= maxLength
    ? ellipsisCharacters.slice(0, maxLength).join('')
    : characters.slice(0, maxLength - ellipsisCharacters.length).join('') + resolvedEllipsis;
}

/**
 * Splits a string into graphemes.
 *
 * @param text - Any string.
 * @returns Its user-perceived characters.
 */
function graphemes(text: string): string[] {
  return Array.from(graphemeSegmenter.segment(text), (part) => part.segment);
}
