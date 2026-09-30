import { placeRectSimple } from './place-rect-simple';

describe(placeRectSimple, () => {
  it.for([
    ['top-right', { x: 90, y: 0, width: 10, height: 10 }],
    ['center', { x: 45, y: 20, width: 10, height: 10 }],
    ['bottom-left', { x: 0, y: 40, width: 10, height: 10 }],
  ] as const)('places the box in the %s', ([anchor, expected]) => {
    expect(placeRectSimple({ width: 10, height: 10 }, { x: 0, y: 0, width: 100, height: 50 }, anchor)).toStrictEqual(
      expected,
    );
  });
});
