/**
 * Reads a numeric match found in free text, `,` being the decimal separator: `'-12,5'` gives `-12.5`.
 *
 * @internal
 * @param text - A match of `NUMBER_SOURCE`, such as `'-12,5'`.
 * @returns The parsed value.
 */
export function parseMatchedNumber(text: string): number {
  return Number(text.replace(',', '.'));
}
