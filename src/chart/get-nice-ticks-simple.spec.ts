import { getNiceTicksSimple } from './get-nice-ticks-simple.ts';

describe(getNiceTicksSimple, () => {
  it('gives about five ticks', () => {
    expect(getNiceTicksSimple(0, 97)).toStrictEqual([0, 20, 40, 60, 80]);
  });
});
