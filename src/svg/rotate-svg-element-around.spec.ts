import { rotateSvgElementAround } from './rotate-svg-element-around.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';
import { screenPoint } from './testing/screen-point.ts';

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

describe(rotateSvgElementAround, () => {
  it('turns around an anchor of an element of another group', () => {
    const hub = createFakeSvgElementIn({ ...IDENTITY, e: 100, f: 100 }, undefined, {
      x: -5,
      y: -5,
      width: 10,
      height: 10,
    });
    const pointer = createFakeSvgElementIn({ ...IDENTITY, a: -1, e: 60 }, undefined, {
      x: 0,
      y: 0,
      width: 2,
      height: 2,
    });
    // The pointer origin is drawn at (60, 0), the hub center at (100, 100): a quarter turn clockwise on screen.
    rotateSvgElementAround(asSvgElement(pointer), 90, asSvgElement(hub), 'center');
    expect(screenPoint(pointer, { x: 0, y: 0 })).toStrictEqual({ x: 200, y: 60 });
  });
});
