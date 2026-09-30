import type { EnumLiteral } from './enum-literal';

enum Status {
  Idle = 'idle',
  Running = 'running',
}

enum Level {
  Low = 0,
  High = 1,
}

describe('EnumLiteral', () => {
  it('turns a string enum into its string literals', () => {
    expectTypeOf<EnumLiteral<Status>>().toEqualTypeOf<'idle' | 'running'>();
  });

  it('turns a numeric enum into its number literals', () => {
    expectTypeOf<EnumLiteral<Level>>().toEqualTypeOf<0 | 1>();
  });
});
