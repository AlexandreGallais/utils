import type { Merge } from './merge.ts';

describe('Merge', () => {
  it('lets the second type win', () => {
    expectTypeOf<Merge<{ a: number; b: number }, { b: string }>>().toEqualTypeOf<{ a: number; b: string }>();
  });
});
