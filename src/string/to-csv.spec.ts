import { toCsv } from './to-csv.ts';

describe(toCsv, () => {
  it('joins fields and lines', () => {
    expect(
      toCsv(
        [
          ['time', 'speed'],
          [new Date(Date.UTC(2026, 0, 15, 12)), 12.5],
        ],
        ',',
        false,
      ),
    ).toBe('time,speed\r\n2026-01-15T12:00:00.000Z,12.5');
  });

  it.for([
    ['a,b', '"a,b"'],
    ['say "hi"', '"say ""hi"""'],
    ['two\nlines', '"two\nlines"'],
    [' padded', '" padded"'],
    [null, ''],
    [Symbol('s'), ''],
    [{ a: 1 }, '"{""a"":1}"'],
    [10n, '10'],
    [undefined, ''],
    [true, 'true'],
  ] as const)('writes field %# as %s', ([value, expected]) => {
    expect(toCsv([[value]], ',', false)).toBe(expected);
  });

  it('uses the separator', () => {
    expect(toCsv([['1,5', 2]], ';', false)).toBe('1,5;2');
    expect(toCsv([['a;b']], ';', false)).toBe('"a;b"');
  });

  it('neutralizes formulas on demand', () => {
    expect(toCsv([['=SUM(A1)', '-3', -3, 'ok']], ',', true)).toBe("'=SUM(A1),'-3,-3,ok");
    expect(toCsv([['=SUM(A1)']], ',', false)).toBe('=SUM(A1)');
  });

  it('returns an empty string without row', () => {
    expect(toCsv([], ',', false)).toBe('');
  });
});
