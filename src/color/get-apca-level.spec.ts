import { getApcaLevel } from './get-apca-level.ts';

const WHITE = { r: 255, g: 255, b: 255 };

describe(getApcaLevel, () => {
  it.for([
    { gray: 0, expected: 'fluent-text' },
    { gray: 100, expected: 'body-text' },
    { gray: 136, expected: 'content-text' },
    { gray: 170, expected: 'large-text' },
    { gray: 185, expected: 'spot-text' },
    { gray: 215, expected: 'non-text' },
    { gray: 250, expected: undefined },
  ])('rates gray $gray on white as $expected', ({ gray, expected }) => {
    expect(getApcaLevel({ r: gray, g: gray, b: gray }, WHITE)).toBe(expected);
  });
});
