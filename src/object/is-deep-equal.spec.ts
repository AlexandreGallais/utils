import { isDeepEqual } from './is-deep-equal.ts';

class Point {
  public readonly x: number;
  public readonly y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

describe(isDeepEqual, () => {
  it.for([
    [1, 1],
    [NaN, NaN],
    [0, -0],
    ['a', 'a'],
    [null, null],
    [{ a: { b: [1, 2] } }, { a: { b: [1, 2] } }],
    [
      [1, [2, [3]]],
      [1, [2, [3]]],
    ],
    [new Date(5), new Date(5)],
    [/a/giv, /a/giv],
    [new Set([1, 2]), new Set([2, 1])],
    [new Map([['k', { v: 1 }]]), new Map([['k', { v: 1 }]])],
    [new Float64Array([1, 2]), new Float64Array([1, 2])],
    [new Point(1, 2), new Point(1, 2)],
  ])('finds %j and %j equal', ([a, b]) => {
    expect(isDeepEqual(a, b)).toBe(true);
  });

  it.for([
    [1, 2],
    [1, '1'],
    [null, undefined],
    [{}, null],
    [{ a: 1 }, { a: 2 }],
    [{ a: 1 }, { a: 1, b: undefined }],
    [
      { a: 1, c: 2 },
      { a: 1, b: 2 },
    ],
    [
      [1, 2],
      [2, 1],
    ],
    [[1], { 0: 1 }],
    [new Date(5), new Date(6)],
    [/a/v, /a/iv],
    [/a/v, /b/v],
    [new Set([1]), new Set([2])],
    [new Set([1]), new Set([1, 2])],
    [new Map([['k', 1]]), new Map([['k', 2]])],
    [new Map([['k', 1]]), new Map([['j', 1]])],
    [new Map([['k', 1]]), new Map()],
    [new Uint8Array([1, 2]), new Uint8Array([1, 3])],
    [new Uint8Array([1]), new Uint8Array([1, 2])],
    [new Point(1, 2), { x: 1, y: 2 }],
  ])('finds %j and %j different', ([a, b]) => {
    expect(isDeepEqual(a, b)).toBe(false);
  });

  it('supports circular references', () => {
    const a: { self?: unknown; value: number } = { value: 1 };
    a.self = a;
    const b: { self?: unknown; value: number } = { value: 1 };
    b.self = b;
    expect(isDeepEqual(a, b)).toBe(true);
    expect(isDeepEqual([a, a], [b, b])).toBe(true);
  });
});
