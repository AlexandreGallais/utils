import { parseDateFormat } from './parse-date-format.ts';

describe(parseDateFormat, () => {
  it.for([
    ['29/09/2026', 'DD/MM/YYYY', '2026-09-29T00:00:00.000Z'],
    ['9/29/2026', 'M/D/YYYY', '2026-09-29T00:00:00.000Z'],
    ['2026-09-29 14:30:05.123', 'YYYY-MM-DD HH:mm:ss.SSS', '2026-09-29T14:30:05.123Z'],
    [' 29.09.2026 7h05 ', 'DD.MM.YYYY Hhmm', '2026-09-29T07:05:00.000Z'],
    ['29/02/2028', 'DD/MM/YYYY', '2028-02-29T00:00:00.000Z'],
    ['01/01/0099', 'DD/MM/YYYY', '0099-01-01T00:00:00.000Z'],
    ['14:30', 'HH:mm', '1970-01-01T14:30:00.000Z'],
  ] as const)('reads %j with %j in UTC', ([input, pattern, expected]) => {
    expect(parseDateFormat(input, pattern, true)?.toISOString()).toBe(expected);
  });

  it('reads local time by default', () => {
    const date = parseDateFormat('29/09/2026 14:30', 'DD/MM/YYYY HH:mm');
    expect([date?.getFullYear(), date?.getMonth(), date?.getDate(), date?.getHours()]).toStrictEqual([2026, 8, 29, 14]);
    expect(parseDateFormat('01/01/0050', 'DD/MM/YYYY')?.getFullYear()).toBe(50);
  });

  it.for([
    ['31/02/2026', 'DD/MM/YYYY'],
    ['29/02/2026', 'DD/MM/YYYY'],
    ['00/01/2026', 'DD/MM/YYYY'],
    ['01/13/2026', 'DD/MM/YYYY'],
    ['24:00', 'HH:mm'],
    ['12:60', 'HH:mm'],
    ['12:00:60', 'HH:mm:ss'],
    ['29-09-2026', 'DD/MM/YYYY'],
    ['29/09/26', 'DD/MM/YYYY'],
    ['29/09/2026 extra', 'DD/MM/YYYY'],
    ['9/29', 'M/D/YYYY'],
  ] as const)('rejects %j with %j', ([input, pattern]) => {
    expect(parseDateFormat(input, pattern, true)).toBeUndefined();
  });

  it('rejects an impossible local date', () => {
    expect(parseDateFormat('31/04/2026', 'DD/MM/YYYY')).toBeUndefined();
  });
});
