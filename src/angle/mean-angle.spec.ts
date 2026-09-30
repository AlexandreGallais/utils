import { meanAngle } from './mean-angle';

describe(meanAngle, () => {
  it.for([
    { angles: [350, 10], expected: 0 },
    { angles: [80, 90, 100], expected: 90 },
    { angles: [270], expected: 270 },
    { angles: [-10, 10, 0], expected: 0 },
  ])('averages $angles to $expected', ({ angles, expected }) => {
    expect(meanAngle(angles)).toBeCloseTo(expected, 10);
  });

  it.for([[], [0, 180], [0, 120, 240]])('returns NaN for %j', (angles) => {
    expect(meanAngle(angles)).toBeNaN();
  });
});
