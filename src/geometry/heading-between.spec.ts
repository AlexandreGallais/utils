import { headingBetween } from './heading-between.ts';
import { polarToCartesian } from './polar-to-cartesian.ts';

const CENTER = { x: 50, y: 50 };

describe(headingBetween, () => {
  it.for([
    [{ x: 50, y: 10 }, 0],
    [{ x: 90, y: 50 }, 90],
    [{ x: 50, y: 90 }, 180],
    [{ x: 10, y: 50 }, 270],
    [{ x: 90, y: 10 }, 45],
    [CENTER, 0],
  ] as const)('heads to %j at %s°', ([to, expected]) => {
    expect(headingBetween(CENTER, to)).toBeCloseTo(expected, 9);
  });

  it('inverts polarToCartesian', () => {
    expect(headingBetween(CENTER, polarToCartesian(CENTER, 30, 123.4))).toBeCloseTo(123.4, 9);
  });
});
