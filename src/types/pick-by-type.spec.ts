import type { PickByType } from './pick-by-type.ts';

describe('PickByType', () => {
  it('keeps the matching properties', () => {
    expectTypeOf<PickByType<{ a: string; b: number; c: string }, string>>().toEqualTypeOf<{ a: string; c: string }>();
  });
});
