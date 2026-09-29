import type { PartialKeys } from './partial-keys.ts';

describe('PartialKeys', () => {
  it('makes the given keys optional only', () => {
    expectTypeOf<PartialKeys<{ a: number; b: string }, 'a'>>().toEqualTypeOf<{ a?: number; b: string }>();
  });
});
