import { generateScaleValues } from './generate-scale-values.ts';

describe(generateScaleValues, () => {
  it('lists major and minor values without duplicates', () => {
    expect(generateScaleValues(0, 10, 5, 2.5)).toStrictEqual([
      { value: 0, isMajor: true },
      { value: 2.5, isMajor: false },
      { value: 5, isMajor: true },
      { value: 7.5, isMajor: false },
      { value: 10, isMajor: true },
    ]);
  });

  it('counts steps from min, without float noise', () => {
    expect(generateScaleValues(3, 13, 5).map(({ value }) => value)).toStrictEqual([3, 8, 13]);
    expect(generateScaleValues(0, 0.3, 0.1).map(({ value }) => value)).toStrictEqual([0, 0.1, 0.2, 0.3]);
  });

  it('stops before max when the step does not divide the range', () => {
    expect(generateScaleValues(0, 10, 4).map(({ value }) => value)).toStrictEqual([0, 4, 8]);
  });

  it.for([
    [10, 0, 5],
    [0, 0, 5],
    [0, Infinity, 5],
    [0, 10, 0],
    [0, 10, -1],
  ] as const)('throws a RangeError for min %s, max %s, step %s', ([min, max, step]) => {
    expect(() => generateScaleValues(min, max, step)).toThrow(RangeError);
  });

  it('throws a RangeError for an invalid minor step', () => {
    expect(() => generateScaleValues(0, 10, 5, NaN)).toThrow(RangeError);
  });
});
