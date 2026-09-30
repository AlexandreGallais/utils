import { setSvgRotationAroundSimple } from './set-svg-rotation-around-simple';
import { asSvgElement, createFakeSvgElementIn, screenPoint } from './testing';

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

describe(setSvgRotationAroundSimple, () => {
  it('turns around the center of the hub', () => {
    const hub = createFakeSvgElementIn(IDENTITY, undefined, { x: 47, y: 47, width: 6, height: 6 });
    const needle = createFakeSvgElementIn(IDENTITY, 'translate(50 50)', { x: -1, y: -40, width: 2, height: 40 });
    setSvgRotationAroundSimple(asSvgElement(needle), 180, asSvgElement(hub));
    expect(screenPoint(needle, { x: 0, y: -40 })).toStrictEqual({ x: 50, y: 90 });
  });
});
