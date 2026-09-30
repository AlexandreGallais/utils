import type { Merge } from './merge';

describe('Merge', () => {
  it('lets the second type win', () => {
    expectTypeOf<Merge<{ a: number; b: number }, { b: string }>>().toEqualTypeOf<{ a: number; b: string }>();
  });
});
