import { shuffleSimple } from './shuffle-simple.ts';

describe(shuffleSimple, () => {
  it('keeps the same items', () => {
    expect(shuffleSimple([1, 2, 3]).toSorted((a, b) => a - b)).toStrictEqual([1, 2, 3]);
  });
});
