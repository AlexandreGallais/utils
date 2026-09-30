import { formatHeadingSimple } from './format-heading-simple';

describe(formatHeadingSimple, () => {
  it('rounds to the whole degree', () => {
    expect(formatHeadingSimple(4.6)).toBe('005°');
    expect(formatHeadingSimple(-90)).toBe('270°');
  });
});
