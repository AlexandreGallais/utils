import { formatDateSimple } from './format-date-simple';

describe(formatDateSimple, () => {
  it('formats in local time', () => {
    const date = new Date(2026, 0, 15, 9, 5);
    expect(formatDateSimple(date, 'DD/MM/YYYY HH:mm')).toBe('15/01/2026 09:05');
  });
});
