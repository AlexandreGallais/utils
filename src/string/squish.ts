const WHITESPACE_RUN_PATTERN = /\s+/gv;

/**
 * Trims a text and collapses every run of whitespace, line breaks included, into a single space.
 *
 * @param input - The text.
 * @returns The text on one line, without leading, trailing or repeated whitespace.
 * @example
 * squish('  Engine\n  room   temperature \t'); // 'Engine room temperature'
 */
export function squish(input: string): string {
  return input.trim().replaceAll(WHITESPACE_RUN_PATTERN, ' ');
}
