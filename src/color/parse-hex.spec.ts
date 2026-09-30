import { parseHex } from './parse-hex';

describe(parseHex, () => {
  it.for([
    ['#fff', { r: 255, g: 255, b: 255, a: 1 }],
    ['#FFF', { r: 255, g: 255, b: 255, a: 1 }],
    ['#ffff', { r: 255, g: 255, b: 255, a: 1 }],
    ['#f008', { r: 255, g: 0, b: 0, a: 0x88 / 255 }],
    ['#1e90FF', { r: 30, g: 144, b: 255, a: 1 }],
    ['ff000080', { r: 255, g: 0, b: 0, a: 128 / 255 }],
    ['  #000  ', { r: 0, g: 0, b: 0, a: 1 }],
    ['abc', { r: 170, g: 187, b: 204, a: 1 }],
  ] as const)('parses %j', ([input, expected]) => {
    expect(parseHex(input)).toStrictEqual(expected);
  });

  it.for(['', '#', '#ff', '#fffff', '#fffffffff', '#ggg', '#12345g', '#1g3456', 'g12345', '#ff 00 00'])(
    'rejects %j',
    (input) => {
      expect(parseHex(input)).toBeUndefined();
    },
  );
});
