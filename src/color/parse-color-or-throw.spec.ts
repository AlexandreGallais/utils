import { parseColorOrThrow } from './parse-color-or-throw.ts';
import type { Rgba } from './rgba.ts';

const RED: Rgba = { r: 255, g: 0, b: 0, a: 1 };

describe(parseColorOrThrow, () => {
  it('parses a valid color', () => {
    expect(parseColorOrThrow('red')).toStrictEqual(RED);
  });

  it('throws a TypeError for an invalid color', () => {
    expect(() => parseColorOrThrow('nope')).toThrow(new TypeError("Invalid color: 'nope'"));
  });
});
