import type { Entries } from './entries';

describe('Entries', () => {
  it('pairs each key with its value type', () => {
    expectTypeOf<Entries<{ a: number; b: string }>>().toEqualTypeOf<(['a', number] | ['b', string])[]>();
  });
});
