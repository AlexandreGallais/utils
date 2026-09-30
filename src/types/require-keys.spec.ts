import type { RequireKeys } from './require-keys';

describe('RequireKeys', () => {
  it('requires the given keys only', () => {
    expectTypeOf<RequireKeys<{ a?: number; b?: string }, 'a'>>().toEqualTypeOf<{ a: number; b?: string }>();
  });
});
