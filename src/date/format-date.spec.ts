import { formatDate } from './format-date.ts';
import { parseDateFormat } from './parse-date-format.ts';

const DATE = new Date('2026-09-05T04:03:02.001Z');

describe(formatDate, () => {
  it.for([
    ['DD/MM/YYYY HH:mm', '05/09/2026 04:03'],
    ['D/M/YYYY H:m:s', '5/9/2026 4:3:2'],
    ['YYYY-MM-DD[T]HH:mm:ss.SSS', '2026-09-05T04:03:02.001'],
    ['[le] DD/MM [à] HH[h]mm', 'le 05/09 à 04h03'],
    ['[a', '[a'],
  ] as const)('formats with %j', ([pattern, expected]) => {
    expect(formatDate(DATE, pattern, true)).toBe(expected);
  });

  it('writes local time by default', () => {
    expect(formatDate(new Date(2026, 8, 29, 14, 30), 'DD/MM/YYYY HH:mm')).toBe('29/09/2026 14:30');
  });

  it('round-trips with parseDateFormat', () => {
    const pattern = 'DD/MM/YYYY HH:mm:ss.SSS';
    expect(parseDateFormat(formatDate(DATE, pattern, true), pattern, true)?.getTime()).toBe(DATE.getTime());
  });

  it('returns an empty string for an invalid date', () => {
    expect(formatDate(new Date('oops'), 'YYYY')).toBe('');
  });
});
