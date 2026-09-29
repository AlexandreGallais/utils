import type { DeepReadonly } from './deep-readonly.ts';

describe('DeepReadonly', () => {
  it('makes every depth read-only', () => {
    expectTypeOf<DeepReadonly<{ a: { b: number[] } }>>().toEqualTypeOf<{
      readonly a: { readonly b: readonly number[] };
    }>();
  });

  it('keeps functions whole', () => {
    expectTypeOf<DeepReadonly<{ f(value: number): string }>['f']>().toEqualTypeOf<(value: number) => string>();
  });
});
