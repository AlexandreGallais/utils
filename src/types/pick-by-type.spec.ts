import type { KeysOfType, PickByType } from './pick-by-type';

describe('PickByType', () => {
  it('keeps the matching properties', () => {
    expectTypeOf<PickByType<{ a: string; b: number; c: string }, string>>().toEqualTypeOf<{ a: string; c: string }>();
  });
});

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
