import { parseDate } from './parse-date.ts';

describe(parseDate, () => {
  it.for([
    ['2026-09-29', '2026-09-29T00:00:00.000Z'],
    ['2026-09-29T14:30:00Z', '2026-09-29T14:30:00.000Z'],
    ['2026-09-29T14:30:00.123+02:00', '2026-09-29T12:30:00.123Z'],
    ['1790000000000', '2026-09-21T14:13:20.000Z'],
    [' 0 ', '1970-01-01T00:00:00.000Z'],
  ] as const)('reads %j', ([input, expected]) => {
    expect(parseDate(input)?.toISOString()).toBe(expected);
  });

  it('reads a local date-time without offset', () => {
    expect(parseDate('2026-09-29 14:30')?.getHours()).toBe(14);
  });

  it('reads timestamps and copies dates', () => {
    const date = new Date(5);
    expect(parseDate(1_790_000_000_000)?.getTime()).toBe(1_790_000_000_000);
    expect(parseDate(date)).not.toBe(date);
    expect(parseDate(date)?.getTime()).toBe(5);
  });

  it.for([
    '',
    '29/09/2026',
    'tomorrow',
    '2026-13-01',
    '2026-09-29T25:00',
    'Sep 29 2026',
    '2026-09-29Z',
    '2026-09-29T1:00',
  ])('rejects %j', (input) => {
    expect(parseDate(input)).toBeUndefined();
  });

  it('rejects invalid numbers and dates', () => {
    expect(parseDate(NaN)).toBeUndefined();
    expect(parseDate(new Date('oops'))).toBeUndefined();
  });
});
