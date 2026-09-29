import { createSeededRandom } from './create-seeded-random.ts';
import { randomText } from './random-text.ts';

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

  it('draws a fixed length by default', () => {
    expect(randomText(25)).toHaveLength(25);
  });

  it('returns an empty string for a length of zero', () => {
    expect(randomText(0)).toBe('');
  });

  it('throws a RangeError for inverted lengths', () => {
    expect(() => randomText(5, 2)).toThrow(RangeError);
  });
});
