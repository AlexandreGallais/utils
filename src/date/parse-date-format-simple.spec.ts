import { parseDateFormatSimple } from './parse-date-format-simple';

describe(parseDateFormatSimple, () => {
  it('reads local time', () => {
    expect(parseDateFormatSimple('15/01/2026 09:05', 'DD/MM/YYYY HH:mm')).toStrictEqual(new Date(2026, 0, 15, 9, 5));
    expect(parseDateFormatSimple('nope', 'DD/MM/YYYY')).toBeUndefined();
  });
});
