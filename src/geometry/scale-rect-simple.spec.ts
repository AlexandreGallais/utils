import { scaleRectSimple } from './scale-rect-simple.ts';

describe(scaleRectSimple, () => {
  it('scales around the center', () => {
    expect(scaleRectSimple({ x: 0, y: 0, width: 10, height: 10 }, 0.5)).toStrictEqual({
      x: 2.5,
      y: 2.5,
      width: 5,
      height: 5,
    });
  });
});
