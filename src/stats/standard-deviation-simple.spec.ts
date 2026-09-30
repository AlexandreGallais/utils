import { standardDeviationSimple } from './standard-deviation-simple';

describe(standardDeviationSimple, () => {
  it('divides by n', () => {
    expect(standardDeviationSimple([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
  });
});
