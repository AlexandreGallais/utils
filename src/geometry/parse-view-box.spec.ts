import { parseViewBox } from './parse-view-box';

describe(parseViewBox, () => {
  it.for([
    ['0 0 200 100', { x: 0, y: 0, width: 200, height: 100 }],
    ['  -10,5.5  20 , 30 ', { x: -10, y: 5.5, width: 20, height: 30 }],
    ['0 0 0 0', { x: 0, y: 0, width: 0, height: 0 }],
  ] as const)('parses %j', ([input, expected]) => {
    expect(parseViewBox(input)).toStrictEqual(expected);
  });

  it.for(['', '0 0 100', '0 0 100 100 5', '0 0 a 100', '0,0,-1,1', '0 0 1 -1'])('rejects %j', (input) => {
    expect(parseViewBox(input)).toBeUndefined();
  });
});
