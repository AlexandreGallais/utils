import { rangeSimple } from './range-simple';

describe(rangeSimple, () => {
  it('counts by one', () => {
    expect(rangeSimple(0, 5)).toStrictEqual([0, 1, 2, 3, 4]);
  });
});
