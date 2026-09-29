import type { RequireKeys } from './require-keys.ts';

describe('RequireKeys', () => {
  it('requires the given keys only', () => {
    expectTypeOf<RequireKeys<{ a?: number; b?: string }, 'a'>>().toEqualTypeOf<{ a: number; b?: string }>();
  });
});
