import type { LiteralUnion } from './literal-union';

describe('LiteralUnion', () => {
  it('accepts the literals and the base type', () => {
    expectTypeOf<'mono'>().toExtend<LiteralUnion<'mono', string>>();
    expectTypeOf<'serif'>().toExtend<LiteralUnion<'mono', string>>();
    expectTypeOf<number>().not.toExtend<LiteralUnion<'mono', string>>();
  });
});
