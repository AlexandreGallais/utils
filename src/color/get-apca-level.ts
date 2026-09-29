import type { ApcaLevel } from './apca-level.ts';
import { getApcaContrast } from './get-apca-contrast.ts';
import type { Rgb } from './rgb.ts';

/** Minimum absolute APCA contrast (`Lc`) of each use. */
const MIN_CONTRAST: Readonly<Record<ApcaLevel, number>> = {
  'fluent-text': 90,
  'body-text': 75,
  'content-text': 60,
  'large-text': 45,
  'spot-text': 30,
  'non-text': 15,
};
/** The uses, from the most to the least demanding. */
const LEVELS: readonly ApcaLevel[] = [
  'fluent-text',
  'body-text',
  'content-text',
  'large-text',
  'spot-text',
  'non-text',
];

/**
 * Finds the most demanding use a text and background pair is readable for, with APCA: tells whether a
 * color pair can hold body text, only large titles, or only decorative lines.
 *
 * @param text - Color of the text or graphic.
 * @param background - Background color.
 * @returns The most demanding `ApcaLevel` reached, or `undefined` below Lc 15 (invisible).
 * @example
 * getApcaLevel({ r: 136, g: 136, b: 136 }, { r: 255, g: 255, b: 255 }); // 'content-text' (Lc 63.1)
 */
export function getApcaLevel(text: Rgb, background: Rgb): ApcaLevel | undefined {
  const contrast = Math.abs(getApcaContrast(text, background));
  return LEVELS.find((level) => contrast >= MIN_CONTRAST[level]);
}
