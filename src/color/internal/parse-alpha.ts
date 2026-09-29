import { clamp } from '../../math/clamp.ts';
import { parseNumberOrPercentage } from './parse-number-or-percentage.ts';

/**
 * Parses the alpha argument of a color function: a number in [0, 1] or a percentage.
 *
 * @internal
 * @param text - A trimmed argument, such as `'0.5'` or `'50%'`.
 * @returns The opacity clamped to [0, 1], or `undefined` when the text is not a number.
 */
export function parseAlpha(text: string): number | undefined {
  const parsed = parseNumberOrPercentage(text);
  return parsed ? clamp(parsed.value, 0, 1) : undefined;
}
