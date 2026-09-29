import { toCsvSimple } from './to-csv-simple.ts';

describe(toCsvSimple, () => {
  it('separates with commas and neutralizes formulas', () => {
    expect(toCsvSimple([['a', '=1+1']])).toBe("a,'=1+1");
  });
});
