import { parseTransform } from './parse-transform.ts';

describe(parseTransform, () => {
  it.for([
    ['', { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }],
    ['translate(100 50) scale(2)', { a: 2, b: 0, c: 0, d: 2, e: 100, f: 50 }],
    ['translate(10)', { a: 1, b: 0, c: 0, d: 1, e: 10, f: 0 }],
    ['scale(-1, 1)', { a: -1, b: 0, c: 0, d: 1, e: 0, f: 0 }],
    ['matrix(1,2,3,4,5,6)', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }],
    ['  scale( 2 )  ,  translate( 5 , 5 ) ', { a: 2, b: 0, c: 0, d: 2, e: 10, f: 10 }],
  ] as const)('parses %j', ([input, expected]) => {
    expect(parseTransform(input)).toStrictEqual(expected);
  });

  it('parses rotations, with or without a center', () => {
    const around = parseTransform('rotate(180 50 50)');
    expect(around?.a).toBeCloseTo(-1, 9);
    expect(around?.e).toBeCloseTo(100, 9);
    expect(around?.f).toBeCloseTo(100, 9);
    expect(parseTransform('rotate(90)')?.b).toBeCloseTo(1, 9);
  });

  it('parses skews', () => {
    expect(parseTransform('skewX(45)')?.c).toBeCloseTo(1, 9);
    expect(parseTransform('skewY(45)')?.b).toBeCloseTo(1, 9);
  });

  it.for([
    'rotate(1 2)',
    'scale()',
    'matrix(1 2 3)',
    'spin(45)',
    'translate(a b)',
    'translate(10) junk',
    'translate(10',
    '(10)',
    '2scale(2)',
  ])('rejects %j', (input) => {
    expect(parseTransform(input)).toBeUndefined();
  });
});
