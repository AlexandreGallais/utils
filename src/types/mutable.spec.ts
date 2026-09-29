import type { Mutable } from './mutable.ts';

describe('Mutable', () => {
  it('removes readonly', () => {
    expectTypeOf<Mutable<{ readonly x: number }>>().toEqualTypeOf<{ x: number }>();
  });
});
