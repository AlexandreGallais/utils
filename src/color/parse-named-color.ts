import { getNamedColorValue } from './internal';
import type { Rgba } from './rgba';

/** Bit positions and mask of each channel in a `0xrrggbb` value. */
const RED_SHIFT = 16;
const GREEN_SHIFT = 8;
const BYTE_MASK = 0xff;

/**
 * Parses a CSS named color, in any case: the 148 names of CSS Color 4 (`red`, `navy`, `rebeccapurple`…)
 * and `transparent`.
 *
 * @param input - A color name; surrounding spaces are ignored.
 * @returns The color, or `undefined` for an unknown name.
 * @example
 * parseNamedColor('Navy'); // { r: 0, g: 0, b: 128, a: 1 }
 * parseNamedColor('transparent'); // { r: 0, g: 0, b: 0, a: 0 }
 */
export function parseNamedColor(input: string): Rgba | undefined {
  const name = input.trim().toLowerCase();
  if (name === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  const value = getNamedColorValue(name);
  return value === undefined
    ? undefined
    : { r: (value >> RED_SHIFT) & BYTE_MASK, g: (value >> GREEN_SHIFT) & BYTE_MASK, b: value & BYTE_MASK, a: 1 };
}
