import type { UnionToIntersection } from './union-to-intersection';

describe('UnionToIntersection', () => {
  it('intersects the members', () => {
    expectTypeOf<UnionToIntersection<{ a: 1 } | { b: 2 }>>().toEqualTypeOf<{ a: 1 } & { b: 2 }>();
  });
});
