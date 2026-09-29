import { getDatePartsSimple } from './get-date-parts-simple.ts';

describe(getDatePartsSimple, () => {
  it('reads local time', () => {
    expect(getDatePartsSimple(new Date(2026, 0, 15, 9, 5))?.hour).toBe(9);
  });
});
