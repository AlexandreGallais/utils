import { getMatrixRotation } from './get-matrix-rotation';
import { parseTransform } from './parse-transform';

describe(getMatrixRotation, () => {
  it.for([
    ['rotate(30)', 30],
    ['rotate(-90)', 270],
    ['rotate(30) scale(-1 1)', 30],
    ['scale(-1 1)', 0],
    ['scale(1 -1)', 180],
    ['translate(5 5) scale(3)', 0],
  ] as const)('reads %s as %s°', ([transform, expected]) => {
    expect(getMatrixRotation(parseTransform(transform) ?? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })).toBeCloseTo(
      expected,
      9,
    );
  });
});
