import type { ContrastLevel } from './contrast-level';
import { meetsContrastLevel } from './meets-contrast-level';
import type { Rgb } from './rgb';

/**
 * Finds the highest WCAG 2.x level a text and background pair reaches, to show a badge in a theme editor
 * or pick a fallback when a pair fails: AAA needs a ratio of 7 (4.5 for large text), AA 4.5 (3).
 *
 * @param text - Text color.
 * @param background - Background color.
 * @param isLargeText - Whether the text is large (at least 18pt, or 14pt bold).
 * @returns `'AAA'`, `'AA'`, or `undefined` when the pair fails AA.
 * @example
 * getWcagLevel({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, false); // 'AAA'
 * getWcagLevel({ r: 150, g: 150, b: 150 }, { r: 255, g: 255, b: 255 }, false); // undefined (2.96)
 */
export function getWcagLevel(text: Rgb, background: Rgb, isLargeText: boolean): ContrastLevel | undefined {
  if (meetsContrastLevel(text, background, 'AAA', isLargeText)) {
    return 'AAA';
  }
  return meetsContrastLevel(text, background, 'AA', isLargeText) ? 'AA' : undefined;
}
