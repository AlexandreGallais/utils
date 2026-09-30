import { degreesToRadians } from './degrees-to-radians';
import { radiansToDegrees } from './radians-to-degrees';

describe(radiansToDegrees, () => {
  it.for([
    [0, 0],
    [Math.PI, 180],
    [-Math.PI / 2, -90],
  ] as const)('converts %s rad to %s°', ([radians, degrees]) => {
    expect(radiansToDegrees(radians)).toBeCloseTo(degrees, 12);
  });

  it('is the inverse of degreesToRadians', () => {
    expect(radiansToDegrees(degreesToRadians(123.456))).toBeCloseTo(123.456, 12);
  });
});
