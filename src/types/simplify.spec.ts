import type { Simplify } from './simplify.ts';

describe('Simplify', () => {
  it('flattens an intersection', () => {
    expectTypeOf<Simplify<{ a: 1 } & { b: 2 }>>().toEqualTypeOf<{ a: 1; b: 2 }>();
  });
});
