import { getTimeTicks } from './get-time-ticks.ts';

const NOON = Date.UTC(2026, 0, 15, 12, 0, 0);

function toIsoTimes(values: readonly number[]): string[] {
  return values.map((value) => {
    const date = new Date(value);
    return date.toISOString().slice(11, 19);
  });
}

describe(getTimeTicks, () => {
  it('chooses a round step and aligns the ticks on it', () => {
    const { values, stepMs } = getTimeTicks(NOON + 37_000, NOON + 600_000 + 37_000, 5, true);
    expect(stepMs).toBe(120_000);
    expect(toIsoTimes(values)).toStrictEqual(['12:02:00', '12:04:00', '12:06:00', '12:08:00', '12:10:00']);
  });

  it.for([
    { span: 50, expected: 10 },
    { span: 4000, expected: 1000 },
    { span: 60_000, expected: 15_000 },
    { span: 86_400_000, expected: 21_600_000 },
    { span: 8 * 86_400_000, expected: 2 * 86_400_000 },
    { span: 30 * 86_400_000, expected: 7 * 86_400_000 },
    { span: 100 * 86_400_000, expected: 21 * 86_400_000 },
  ])('uses a step of $expected ms for a span of $span ms', ({ span, expected }) => {
    expect(getTimeTicks(NOON, NOON + span, 5, true).stepMs).toBe(expected);
  });

  it('aligns on local clock times', () => {
    const { values, stepMs } = getTimeTicks(NOON, NOON + 4 * 3_600_000, 5, false);
    expect(stepMs).toBe(3_600_000);
    const minutes = values.map((value) => {
      const date = new Date(value);
      return date.getMinutes();
    });
    expect(new Set(minutes)).toStrictEqual(new Set([0]));
  });

  it('returns one tick for an empty interval on a step', () => {
    expect(getTimeTicks(NOON, NOON, 5, true)).toStrictEqual({ values: [NOON], stepMs: 1 });
  });

  it.for([
    [0, 10, 0],
    [0, 10, 1.5],
    [10, 0, 5],
    [0, Infinity, 5],
  ])('throws a RangeError for [%s, %s] in %s ticks', ([start = 0, end = 0, count = 0]) => {
    expect(() => getTimeTicks(start, end, count, false)).toThrow(RangeError);
  });
});
