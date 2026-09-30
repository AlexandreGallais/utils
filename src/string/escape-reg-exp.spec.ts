import { escapeRegExp } from './escape-reg-exp';

describe(escapeRegExp, () => {
  it.for(['1+1=2?', '(a|b)[c]{d}', String.raw`C:\path\file.txt`, 'price: $5.00 ^_^', 'a-b & c', 'plain'])(
    'matches %j literally with the v flag',
    (input) => {
      const pattern = new RegExp(`^${escapeRegExp(input)}$`, 'v');
      expect(pattern.test(input)).toBe(true);
    },
  );

  it('matches literally with the u flag and without flags', () => {
    const input = '(a|b)*.c';
    const unicodePattern = new RegExp(escapeRegExp(input), 'u');
    const plainPattern = new RegExp(escapeRegExp(input));
    expect(unicodePattern.test(`x${input}x`)).toBe(true);
    expect(plainPattern.test('ab.c')).toBe(false);
  });

  it('escapes the syntax characters only', () => {
    expect(escapeRegExp('a.b')).toBe(String.raw`a\.b`);
    expect(escapeRegExp('abc')).toBe('abc');
  });
});
