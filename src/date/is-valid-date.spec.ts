import { isValidDate } from './is-valid-date';

describe(isValidDate, () => {
  it.for([
    [new Date('2026-09-29'), true],
    [new Date(0), true],
    [new Date('oops'), false],
    ['2026-09-29', false],
    [1_790_000_000_000, false],
    [undefined, false],
  ] as const)('checks %j as %s', ([value, expected]) => {
    expect(isValidDate(value)).toBe(expected);
  });
});
