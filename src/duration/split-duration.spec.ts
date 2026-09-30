import { splitDuration } from './split-duration';

describe(splitDuration, () => {
  it('splits a duration into its parts', () => {
    expect(splitDuration(93_784_567)).toStrictEqual({
      sign: 1,
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      milliseconds: 567,
      totalMilliseconds: 93_784_567,
    });
  });

  it('gives positive parts and a negative sign for a negative duration', () => {
    expect(splitDuration(-61_500)).toStrictEqual({
      sign: -1,
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 1,
      milliseconds: 500,
      totalMilliseconds: -61_500,
    });
  });

  it('keeps fractional milliseconds and turns -0 into 0', () => {
    expect(splitDuration(1.5)?.milliseconds).toBe(1.5);
    expect(splitDuration(-0)).toMatchObject({ sign: 1, totalMilliseconds: 0 });
  });

  it.for([NaN, Infinity])('returns undefined for %s', (ms) => {
    expect(splitDuration(ms)).toBeUndefined();
  });
});
