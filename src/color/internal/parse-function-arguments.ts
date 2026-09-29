/** Color functions take three channels, optionally followed by an alpha. */
const MIN_ARGUMENTS = 3;
const MAX_ARGUMENTS = 4;

const WHITESPACE_PATTERN = /\s+/v;

/**
 * Extracts the arguments of a CSS color function, in comma syntax (`rgb(1, 2, 3, 0.5)`) or space syntax
 * (`rgb(1 2 3 / 0.5)`).
 *
 * @internal
 * @param pattern - Matches the whole function and captures its arguments in an `args` group.
 * @param input - The color string.
 * @returns The three or four trimmed arguments, or `undefined` when the function or its arity does not match.
 */
export function parseFunctionArguments(pattern: RegExp, input: string): string[] | undefined {
  const text = pattern.exec(input.trim())?.groups?.['args']?.trim();
  if (text === undefined || text === '') {
    return undefined;
  }

  let parts: string[];
  if (text.includes(',')) {
    parts = text.split(',').map((part) => part.trim());
  } else {
    const [channels = '', alpha, extra] = text.split('/', MIN_ARGUMENTS);
    if (extra !== undefined) {
      return undefined;
    }
    parts = channels.trim().split(WHITESPACE_PATTERN);
    if (alpha !== undefined) {
      parts.push(alpha.trim());
    }
  }
  return parts.length >= MIN_ARGUMENTS && parts.length <= MAX_ARGUMENTS ? parts : undefined;
}
