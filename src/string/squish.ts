const WHITESPACE_RUN_PATTERN = /\s+/gv;

/**
 * Trims a text and collapses every run of whitespace (spaces, tabs, line breaks) into a single space: clean
 * a label typed by a user or read from a file before displaying or comparing it.
 *
 * @param input - Any text.
 * @returns The text on one line, without leading, trailing or repeated whitespace.
 * @example
 * squish('  Engine\n  room   temperature \t'); // 'Engine room temperature'
 */
export function squish(input: string): string {
  return input.trim().replaceAll(WHITESPACE_RUN_PATTERN, ' ');
}
