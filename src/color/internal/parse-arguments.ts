/** Parses one argument of a color function: a number, or `undefined` when the text is invalid. */
type ArgumentParser = (text: string) => number | undefined;

/**
 * Parses the arguments of a color function, each with its own parser, stopping at the first invalid one.
 *
 * @internal
 * @param parts - The trimmed arguments.
 * @param parsers - One parser per position; the last one parses the optional alpha.
 * @returns The parsed values, or `undefined` when one argument is invalid.
 */
export function parseArguments(parts: readonly string[], parsers: readonly ArgumentParser[]): number[] | undefined {
  const values: number[] = [];
  for (const [index, part] of parts.entries()) {
    const value = parsers[index]?.(part);
    if (value === undefined) {
      return undefined;
    }
    values.push(value);
  }
  return values;
}
