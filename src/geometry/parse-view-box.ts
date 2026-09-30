import type { Rect } from './rect';

/** Values of a `viewBox`, separated by spaces and/or commas. */
const SEPARATOR_PATTERN = /[\s,]+/v;
const VIEW_BOX_VALUES = 4;

/**
 * Parses the value of an SVG `viewBox` attribute.
 *
 * @param input - Four numbers separated by spaces and/or commas, such as `'0 0 200 100'`.
 * @returns The rectangle, or `undefined` when the value is malformed or its size is negative.
 * @example
 * parseViewBox('0 0 200 100'); // { x: 0, y: 0, width: 200, height: 100 }
 * parseViewBox('0,0,-1,1'); // undefined
 */
export function parseViewBox(input: string): Rect | undefined {
  const text = input.trim();
  const values = text === '' ? [] : text.split(SEPARATOR_PATTERN).map(Number);
  const [x = 0, y = 0, width = 0, height = 0] = values;
  if (values.length !== VIEW_BOX_VALUES || values.some((value) => !Number.isFinite(value))) {
    return undefined;
  }
  return width < 0 || height < 0 ? undefined : { x, y, width, height };
}
