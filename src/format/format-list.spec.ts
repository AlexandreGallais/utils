import { formatList } from './format-list.ts';

describe(formatList, () => {
  it('joins with the rules of the locale', () => {
    expect(formatList(['pump', 'valve', 'tank'], 'en-US', 'conjunction')).toBe('pump, valve, and tank');
    expect(formatList(['pompe', 'vanne', 'cuve'], 'fr-FR', 'conjunction')).toBe('pompe, vanne et cuve');
    expect(formatList(['pompe', 'vanne'], 'fr-FR', 'disjunction')).toBe('pompe ou vanne');
  });

  it('handles short lists and reuses the formatter', () => {
    expect(formatList([], 'en-US', 'conjunction')).toBe('');
    expect(formatList(['a'], 'en-US', 'conjunction')).toBe('a');
    expect(formatList(['a', 'b'], 'en-US', 'conjunction')).toBe('a and b');
  });
});
