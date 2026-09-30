import type { FirstParameter } from './first-parameter';

describe('FirstParameter', () => {
  it('reads the first parameter', () => {
    expectTypeOf<FirstParameter<(event: MouseEvent, index: number) => void>>().toEqualTypeOf<MouseEvent>();
    expectTypeOf<FirstParameter<() => void>>().toEqualTypeOf<undefined>();
  });
});
