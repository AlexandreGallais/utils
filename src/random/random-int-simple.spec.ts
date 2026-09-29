import { randomIntSimple } from './random-int-simple.ts';

describe(randomIntSimple, () => {
  it('stays within the bounds', () => {
    const values = Array.from({ length: 200 }, () => randomIntSimple(1, 3));
    expect(new Set(values)).toStrictEqual(new Set([1, 2, 3]));
  });
});
