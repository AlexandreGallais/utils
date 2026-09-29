/** Divisor turning a CSS percentage into a fraction. */
const PERCENT = 100;

/** A parsed CSS `<number>` or `<percentage>`. */
interface NumberOrPercentage {
  /** The number, or the percentage divided by 100. */
  readonly value: number;
  /** Whether the text ended with `%`. */
  readonly isPercentage: boolean;
}

/**
 * Parses a CSS `<number>` or `<percentage>` argument of a color function.
 *
 * @internal
 * @param text - A trimmed argument, such as `'128'`, `'.5'` or `'50%'`.
 * @returns The value (a percentage divided by 100), or `undefined` when the text is not a finite number.
 */
export function parseNumberOrPercentage(text: string): NumberOrPercentage | undefined {
  const isPercentage = text.endsWith('%');
  const numberText = isPercentage ? text.slice(0, -1) : text;
  const value = numberText === '' ? NaN : Number(numberText);
  if (!Number.isFinite(value)) {
    return undefined;
  }
  return { value: isPercentage ? value / PERCENT : value, isPercentage };
}
