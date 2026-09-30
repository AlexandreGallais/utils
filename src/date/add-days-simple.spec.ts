import { addDaysSimple } from './add-days-simple';

describe(addDaysSimple, () => {
  it('adds local days', () => {
    expect(addDaysSimple(new Date(2026, 0, 31, 8), 1)).toStrictEqual(new Date(2026, 1, 1, 8));
  });
});
