import { headingToCardinal } from './heading-to-cardinal.ts';

describe(headingToCardinal, () => {
  it.for([
    [0, 'N'],
    [22, 'N'],
    [23, 'NE'],
    [47, 'NE'],
    [90, 'E'],
    [200, 'S'],
    [337.5, 'N'],
    [-10, 'N'],
    [315, 'NW'],
  ] as const)('names %s° as %s with 8 points', ([heading, expected]) => {
    expect(headingToCardinal(heading, 8)).toBe(expected);
  });

  it('supports 4 and 16 points', () => {
    expect(headingToCardinal(47, 4)).toBe('E');
    expect(headingToCardinal(44, 4)).toBe('N');
    expect(headingToCardinal(22.5, 16)).toBe('NNE');
    expect(headingToCardinal(350, 16)).toBe('N');
  });
});
