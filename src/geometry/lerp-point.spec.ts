import { lerpPoint } from './lerp-point';

describe(lerpPoint, () => {
  it.for([
    [0, { x: 0, y: 0 }],
    [0.5, { x: 5, y: 10 }],
    [1, { x: 10, y: 20 }],
    [2, { x: 20, y: 40 }],
  ] as const)('interpolates at %s', ([t, expected]) => {
    expect(lerpPoint({ x: 0, y: 0 }, { x: 10, y: 20 }, t)).toStrictEqual(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(lerpPoint()).toStrictEqual(lerpPoint({ x: 0, y: 0 }, { x: 0, y: 0 }, 0));
    expect(lerpPoint(null, null, null)).toStrictEqual(lerpPoint({ x: 0, y: 0 }, { x: 0, y: 0 }, 0));
  });
});
