import type { KeysOfType } from './keys-of-type.ts';

describe('KeysOfType', () => {
  it('lists the keys of matching properties', () => {
    interface Sample {
      name: string;
      speed: number;
      heading: number;
      isValid?: boolean;
    }
    expectTypeOf<KeysOfType<Sample, number>>().toEqualTypeOf<'heading' | 'speed'>();
    expectTypeOf<KeysOfType<Sample, boolean | undefined>>().toEqualTypeOf<'isValid'>();
  });
});
