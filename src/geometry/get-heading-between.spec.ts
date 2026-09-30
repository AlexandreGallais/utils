import { getHeadingBetween } from './get-heading-between';
import { polarToCartesian } from './polar-to-cartesian';

const CENTER = { x: 50, y: 50 };

describe(getHeadingBetween, () => {
  it.for([
    [{ x: 50, y: 10 }, 0],
    [{ x: 90, y: 50 }, 90],
    [{ x: 50, y: 90 }, 180],
    [{ x: 10, y: 50 }, 270],
    [{ x: 90, y: 10 }, 45],
    [CENTER, 0],
  ] as const)('heads to %j at %s°', ([to, expected]) => {
    expect(getHeadingBetween(CENTER, to)).toBeCloseTo(expected, 9);
  });

  it('inverts polarToCartesian', () => {
    expect(getHeadingBetween(CENTER, polarToCartesian(CENTER, 30, 123.4))).toBeCloseTo(123.4, 9);
  });

  it('takes the defaults for null or undefined', () => {
    expect(getHeadingBetween()).toStrictEqual(getHeadingBetween({ x: 0, y: 0 }, { x: 0, y: 0 }));
    expect(getHeadingBetween(null, null)).toStrictEqual(getHeadingBetween({ x: 0, y: 0 }, { x: 0, y: 0 }));
  });
});
