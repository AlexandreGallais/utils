import { isBetweenSimple } from './is-between-simple';

describe(isBetweenSimple, () => {
  it('includes the bounds', () => {
    expect(isBetweenSimple(0, 0, 40)).toBe(true);
    expect(isBetweenSimple(41, 0, 40)).toBe(false);
  });
});
