import type { ElementOf } from './element-of.ts';

describe('ElementOf', () => {
  it('reads the item type', () => {
    expectTypeOf<ElementOf<readonly ['kn', 'm/s']>>().toEqualTypeOf<'kn' | 'm/s'>();
    expectTypeOf<ElementOf<number[]>>().toEqualTypeOf<number>();
  });
});
