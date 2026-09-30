import { getReadableTextColor } from './get-readable-text-color';
import type { Rgb } from './rgb';

const BLACK: Rgb = { r: 0, g: 0, b: 0 };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };

describe(getReadableTextColor, () => {
  it.for([
    [WHITE, '#000000'],
    [BLACK, '#ffffff'],
    [{ r: 0, g: 0, b: 128 }, '#ffffff'],
    ['#ffeb3b', '#000000'],
    ['rgb(255, 0, 0)', '#000000'],
    ['navy', '#ffffff'],
    ['#777', '#000000'],
  ] as const)('picks the text color over %j', ([background, expected]) => {
    expect(getReadableTextColor(background)).toBe(expected);
  });

  it('throws for an invalid color string', () => {
    expect(() => getReadableTextColor('nope')).toThrow(TypeError);
  });
});
