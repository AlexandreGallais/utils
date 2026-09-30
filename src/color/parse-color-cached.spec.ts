import { parseColorCached } from './parse-color-cached';

describe(parseColorCached, () => {
  it('parses like parseColor', () => {
    expect(parseColorCached(' RGB(255, 0, 0) ')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColorCached('navy')).toStrictEqual({ r: 0, g: 0, b: 128, a: 1 });
  });

  it('returns the same frozen object for the same input', () => {
    const color = parseColorCached('#123456');
    expect(parseColorCached('#123456')).toBe(color);
    expect(Object.isFrozen(color)).toBe(true);
  });

  it('caches invalid inputs too', () => {
    expect(parseColorCached('nope')).toBeUndefined();
    expect(parseColorCached('nope')).toBeUndefined();
  });

  it('keeps working once the cache is full', () => {
    for (let index = 0; index < 600; index++) {
      parseColorCached(`rgb(${index}, 0, 0)`);
    }
    expect(parseColorCached('rgb(1, 0, 0)')).toStrictEqual({ r: 1, g: 0, b: 0, a: 1 });
  });
});
