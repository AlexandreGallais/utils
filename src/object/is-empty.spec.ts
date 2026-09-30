import { isEmpty } from './is-empty';

describe(isEmpty, () => {
  it.for([null, undefined, '', [], {}, new Map(), new Set(), new Float64Array(0)])('finds %j empty', (value) => {
    expect(isEmpty(value)).toBe(true);
  });

  it.for([' ', [0], { a: undefined }, new Map([[1, 1]]), new Set([0]), new Uint8Array(1), 0, false, (): number => 0])(
    'finds %j not empty',
    (value) => {
      expect(isEmpty(value)).toBe(false);
    },
  );
});
