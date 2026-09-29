import { getWcagLevel } from './get-wcag-level.ts';
import type { ContrastLevel } from './contrast-level.ts';
import type { Rgb } from './rgb.ts';

/**
 * Finds the highest WCAG 2 level a text and background pair reaches like `getWcagLevel`, for normal-size text.
 *
 * @param text - Text color.
 * @param background - Background color.
 * @returns `'AAA'`, `'AA'`, or `undefined`.
 * @simple Normal text (not large).
 * @example
 * getWcagLevelSimple(textColor, backgroundColor); // 'AA'
 */
export function getWcagLevelSimple(text: Rgb, background: Rgb): ContrastLevel | undefined {
  return getWcagLevel(text, background, false);
}
