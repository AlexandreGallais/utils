import { getReadableTextColorCached } from './get-readable-text-color-cached.ts';

describe(getReadableTextColorCached, () => {
  it.for([
    ['#ffeb3b', '#000000'],
    ['navy', '#ffffff'],
    [{ r: 255, g: 255, b: 255 }, '#000000'],
  ] as const)('picks the text color over %j', ([background, expected]) => {
    expect(getReadableTextColorCached(background)).toBe(expected);
  });

  it('throws for an invalid color string', () => {
    expect(() => getReadableTextColorCached('nope')).toThrow(TypeError);
  });
});
