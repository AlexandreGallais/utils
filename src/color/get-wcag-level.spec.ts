import { getWcagLevel } from './get-wcag-level';

const WHITE = { r: 255, g: 255, b: 255 };

describe(getWcagLevel, () => {
  it.for([
    { gray: 0, isLargeText: false, expected: 'AAA' },
    { gray: 118, isLargeText: false, expected: 'AA' },
    { gray: 118, isLargeText: true, expected: 'AAA' },
    { gray: 150, isLargeText: false, expected: undefined },
    { gray: 150, isLargeText: true, expected: undefined },
    { gray: 145, isLargeText: true, expected: 'AA' },
  ])('rates gray $gray on white (large: $isLargeText)', ({ gray, isLargeText, expected }) => {
    expect(getWcagLevel({ r: gray, g: gray, b: gray }, WHITE, isLargeText)).toBe(expected);
  });

  it('checks normal text', () => {
    expect(getWcagLevel({ r: 118, g: 118, b: 118 }, WHITE, false)).toBe('AA');
  });

  it('takes the defaults for null or undefined', () => {
    expect(getWcagLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 })).toStrictEqual(
      getWcagLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, false),
    );
    expect(getWcagLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, null)).toStrictEqual(
      getWcagLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, false),
    );
  });
});
