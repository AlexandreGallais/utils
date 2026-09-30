import { rotatePoint } from './rotate-point';

describe(rotatePoint, () => {
  it.for([
    [90, { x: 0, y: 10 }],
    [180, { x: -10, y: 0 }],
    [-90, { x: 0, y: -10 }],
    [360, { x: 10, y: 0 }],
  ] as const)('rotates by %s° around the origin', ([angle, expected]) => {
    const point = rotatePoint({ x: 10, y: 0 }, angle, { x: 0, y: 0 });
    expect(point.x).toBeCloseTo(expected.x, 9);
    expect(point.y).toBeCloseTo(expected.y, 9);
  });

  it('rotates around a center', () => {
    const point = rotatePoint({ x: 60, y: 50 }, 180, { x: 50, y: 50 });
    expect(point.x).toBeCloseTo(40, 9);
    expect(point.y).toBeCloseTo(50, 9);
  });

  it('takes the defaults for null or undefined', () => {
    expect(rotatePoint()).toStrictEqual(rotatePoint({ x: 0, y: 0 }, 0, { x: 0, y: 0 }));
    expect(rotatePoint(null, null, null)).toStrictEqual(rotatePoint({ x: 0, y: 0 }, 0, { x: 0, y: 0 }));
  });
  it('turns around the origin for a null or undefined center', () => {
    expect(rotatePoint({ x: 3, y: 4 }, 90)).toStrictEqual(rotatePoint({ x: 3, y: 4 }, 90, { x: 0, y: 0 }));
    expect(rotatePoint({ x: 3, y: 4 }, 90, null)).toStrictEqual(rotatePoint({ x: 3, y: 4 }, 90, { x: 0, y: 0 }));
  });
});
