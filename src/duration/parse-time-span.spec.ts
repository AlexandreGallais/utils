import { parseTimeSpan } from './parse-time-span';

describe(parseTimeSpan, () => {
  it.for([
    ['1.02:03:04.5670000', 93_784_567],
    ['00:00:30', 30_000],
    ['-00:00:30', -30_000],
    ['1:02:03:04.567', 93_784_567],
    ['  12:00:00  ', 43_200_000],
    ['00:00:00.0000001', 0.0001],
    ['00:00:00.5', 500],
    ['00:00:00,25', 250],
    ['10675199.02:48:05.4775807', 922_337_203_685_477.6],
  ] as const)('parses %j as %s ms', ([input, expected]) => {
    expect(parseTimeSpan(input)).toBeCloseTo(expected, 4);
  });

  it.for(['', '30', '1:2:3', '00:00:00.12345678', 'a.00:00:00', '1.2.00:00:00'])(
    'throws a TypeError for %j',
    (input) => {
      expect(() => parseTimeSpan(input)).toThrow(TypeError);
    },
  );
});
