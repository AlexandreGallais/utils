import { convertSvgPoint } from './convert-svg-point.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';

describe(convertSvgPoint, () => {
  it('keeps the same screen position', () => {
    const box = { x: 0, y: 0, width: 10, height: 10 };
    const from = createFakeSvgElementIn({ a: 0, b: 1, c: -1, d: 0, e: 50, f: 50 }, undefined, box);
    const to = createFakeSvgElementIn({ a: 1, b: 0, c: 0, d: 1, e: 10, f: 0 }, undefined, box);
    // (10, 0) in a group turned by 90° at (50, 50) is drawn at (50, 60): (40, 60) in `to`.
    const point = convertSvgPoint({ x: 10, y: 0 }, asSvgElement(from), asSvgElement(to));
    expect([Math.round(point.x), Math.round(point.y)]).toStrictEqual([40, 60]);
  });
});
