import { parseIsoDuration } from './parse-iso-duration';

describe(parseIsoDuration, () => {
  it.for([
    ['PT1H30M', 5_400_000],
    ['P2DT3H', 183_600_000],
    ['P1W', 604_800_000],
    ['PT0.5S', 500],
    ['PT0,25S', 250],
    ['-PT30S', -30_000],
    ['+P1D', 86_400_000],
    [' PT1M ', 60_000],
    ['P0D', 0],
  ] as const)('parses %j as %s ms', ([input, expected]) => {
    expect(parseIsoDuration(input)?.totalMilliseconds).toBe(expected);
  });

  it('splits the duration', () => {
    expect(parseIsoDuration('P1DT2H3M4.567S')).toStrictEqual({
      sign: 1,
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      milliseconds: 567,
      totalMilliseconds: 93_784_567,
    });
  });

  it.for(['', 'P', 'PT', 'P1DT', 'P1Y', 'P1M', 'PT1H2', '1H', 'P1H', 'PT-1S'])('rejects %j', (input) => {
    expect(parseIsoDuration(input)).toBeUndefined();
  });
});
