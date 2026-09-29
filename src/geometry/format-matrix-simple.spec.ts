import { formatMatrixSimple } from './format-matrix-simple.ts';

describe(formatMatrixSimple, () => {
  it('writes six decimals', () => {
    expect(formatMatrixSimple({ a: 1, b: 0, c: 0, d: 1, e: 1 / 3, f: 0 })).toBe('matrix(1 0 0 1 0.333333 0)');
  });
});
