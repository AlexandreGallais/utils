import { polarToCartesian } from './polar-to-cartesian';

const CENTER = { x: 50, y: 50 };

describe(polarToCartesian, () => {
  it.for([
    [0, { x: 50, y: 10 }],
    [90, { x: 90, y: 50 }],
    [180, { x: 50, y: 90 }],
    [270, { x: 10, y: 50 }],
    [-90, { x: 10, y: 50 }],
    [450, { x: 90, y: 50 }],
  ] as const)('places the point at %s°', ([angle, expected]) => {
    const point = polarToCartesian(CENTER, 40, angle);
    expect(point.x).toBeCloseTo(expected.x, 9);
    expect(point.y).toBeCloseTo(expected.y, 9);
  });

  it('returns the center for a zero radius', () => {
    expect(polarToCartesian(CENTER, 0, 123)).toStrictEqual(CENTER);
  });
});
