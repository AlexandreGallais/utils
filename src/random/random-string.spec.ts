import { createSeededRandom } from './create-seeded-random.ts';
import { randomString } from './random-string.ts';

describe(randomString, () => {
  it('draws letters and digits of a fixed length by default', () => {
    expect(randomString(12)).toMatch(/^[0-9A-Za-z]{12}$/v);
  });

  it('stays within the length bounds', () => {
    const random = createSeededRandom(1);
    for (let draw = 0; draw < 50; draw++) {
      expect(randomString(2, 5, 'ab', random)).toMatch(/^[ab]{2,5}$/v);
    }
  });

  it('draws from the given alphabet, emoji included', () => {
    expect(randomString(3, 3, '🙂👍🏽', () => 0.5)).toBe('👍🏽👍🏽👍🏽');
    expect(randomString(2, 2, 'xyz', () => 0)).toBe('xx');
  });

  it('returns an empty string for a length of zero', () => {
    expect(randomString(0)).toBe('');
    expect(randomString(-3, 0)).toBe('');
  });

  it('throws a RangeError for an empty alphabet or inverted lengths', () => {
    expect(() => randomString(1, 1, '')).toThrow(RangeError);
    expect(() => randomString(5, 2)).toThrow(RangeError);
  });
});
