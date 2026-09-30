import { truncateSimple } from './truncate-simple';

describe(truncateSimple, () => {
  it('ends with an ellipsis', () => {
    expect(truncateSimple('Main engine temperature', 12)).toBe('Main engine…');
  });
});
