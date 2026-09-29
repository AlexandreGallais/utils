import { rotateSvgElementAroundSimple } from './rotate-svg-element-around-simple.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';
import { screenPoint } from './testing/screen-point.ts';

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

describe(rotateSvgElementAroundSimple, () => {
  it('turns around the center of the pivot', () => {
    const hub = createFakeSvgElementIn(IDENTITY, undefined, { x: 90, y: 90, width: 20, height: 20 });
    const pointer = createFakeSvgElementIn(IDENTITY, 'translate(100 60)', { x: 0, y: 0, width: 1, height: 1 });
    rotateSvgElementAroundSimple(asSvgElement(pointer), 180, asSvgElement(hub));
    expect(screenPoint(pointer, { x: 0, y: 0 })).toStrictEqual({ x: 100, y: 140 });
  });
});
