import type { Mutable } from './mutable';

describe('Mutable', () => {
  it('removes readonly', () => {
    expectTypeOf<Mutable<{ readonly x: number }>>().toEqualTypeOf<{ x: number }>();
  });
});
