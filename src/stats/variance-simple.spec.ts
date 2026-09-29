import { varianceSimple } from './variance-simple.ts';

describe(varianceSimple, () => {
  it('divides by n', () => {
    expect(varianceSimple([2, 4, 4, 4, 5, 5, 7, 9])).toBe(4);
  });
});
