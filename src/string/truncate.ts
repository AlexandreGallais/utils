const graphemeSegmenter = new Intl.Segmenter();

/**
 * Shortens a string to a maximum length, with an ellipsis when it is cut. An emoji or an accented letter
 * counts as one character and is never split.
 *
 * @param input - The string to shorten.
 * @param maxLength - The largest length of the result, ellipsis included.
 * @param ellipsis - Appended when the string is cut. Defaults to `'…'`.
 * @returns The string itself when it fits, the cut string with its ellipsis otherwise.
 * @example
 * truncate('Engine room temperature', 12); // 'Engine room…'
 * truncate('Short', 12); // 'Short'
 * truncate('Engine room temperature', 12, '...'); // 'Engine ro...'
 */
export function truncate(input: string, maxLength: number, ellipsis = '…'): string {
  const characters = graphemes(input);
  if (characters.length <= maxLength) {
    return input;
  }
  const ellipsisCharacters = graphemes(ellipsis);
  return ellipsisCharacters.length >= maxLength
    ? ellipsisCharacters.slice(0, maxLength).join('')
    : characters.slice(0, maxLength - ellipsisCharacters.length).join('') + ellipsis;
}

function graphemes(text: string): string[] {
  return Array.from(graphemeSegmenter.segment(text), (part) => part.segment);
}
