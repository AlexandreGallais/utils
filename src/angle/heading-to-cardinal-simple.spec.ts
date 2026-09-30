import { headingToCardinalSimple } from './heading-to-cardinal-simple';

describe(headingToCardinalSimple, () => {
  it.for([
    [0, 'N'],
    [47, 'NE'],
    [260, 'W'],
  ] as const)('names %s° %s', ([heading, expected]) => {
    expect(headingToCardinalSimple(heading)).toBe(expected);
  });
});
