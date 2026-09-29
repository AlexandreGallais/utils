import { parseTimeSpan } from './parse-time-span.ts';

describe(parseTimeSpan, () => {
  it('parses the constant format with days and ticks', () => {
    expect(parseTimeSpan('1.02:03:04.5670000')).toStrictEqual({
      sign: 1,
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      milliseconds: 567,
      totalMilliseconds: 93_784_567,
    });
  });

  it.for([
    ['00:00:30', 30_000],
    ['-00:00:30', -30_000],
    ['1:02:03:04.567', 93_784_567],
    ['  12:00:00  ', 43_200_000],
    ['00:00:00.0000001', 0.0001],
    ['00:00:00.5', 500],
    ['00:00:00,25', 250],
    ['10675199.02:48:05.4775807', 922_337_203_685_477.6],
  ] as const)('parses %j as %s ms', ([input, expected]) => {
    expect(parseTimeSpan(input)?.totalMilliseconds).toBeCloseTo(expected, 4);
  });

  it('never gives a negative zero', () => {
    expect(parseTimeSpan('-00:00:00')).toMatchObject({ sign: 1, totalMilliseconds: 0 });
  });

  it.for(['', '30', '1:2:3', '24:00:00', '00:60:00', '00:00:60', '00:00:00.12345678', 'a.00:00:00', '1.2.00:00:00'])(
    'rejects %j',
    (input) => {
      expect(parseTimeSpan(input)).toBeUndefined();
    },
  );
});
