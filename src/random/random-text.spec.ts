import { createSeededRandom } from './create-seeded-random';
import { randomText } from './random-text';

describe(randomText, () => {
  it('stays within the length bounds', () => {
    const random = createSeededRandom(7);
    for (let draw = 0; draw < 100; draw++) {
      const text = randomText(1, 60, random);
      expect(text.length).toBeGreaterThanOrEqual(1);
      expect(text.length).toBeLessThanOrEqual(60);
    }
  });

  it('writes capitalized words separated by single spaces', () => {
    const random = createSeededRandom(3);
    for (let draw = 0; draw < 100; draw++) {
      expect(randomText(30, 30, random)).toMatch(/^[A-Z][a-z]*(?: [a-z]+)*$/v);
    }
  });

  it('draws a fixed length', () => {
    expect(randomText(25, 25, Math.random)).toHaveLength(25);
  });

  it('returns an empty string for a length of zero', () => {
    expect(randomText(0, 0, Math.random)).toBe('');
  });

  it('throws a RangeError for inverted lengths', () => {
    expect(() => randomText(5, 2, Math.random)).toThrow(RangeError);
  });

  it('takes Math.random and the other defaults for null or undefined', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(randomText(3)).toStrictEqual(randomText(3, 3, Math.random));
    expect(randomText(3, null, null)).toStrictEqual(randomText(3, 3, Math.random));
    vi.restoreAllMocks();
  });
});
