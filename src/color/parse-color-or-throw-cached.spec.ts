import { parseColorOrThrowCached } from './parse-color-or-throw-cached';

describe(parseColorOrThrowCached, () => {
  it('returns the same frozen color for the same input', () => {
    const color = parseColorOrThrowCached('red');
    expect(color).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColorOrThrowCached('red')).toBe(color);
  });

  it('throws a TypeError for an invalid color', () => {
    expect(() => parseColorOrThrowCached('nope')).toThrow(new TypeError("Invalid color: 'nope'"));
  });
});
