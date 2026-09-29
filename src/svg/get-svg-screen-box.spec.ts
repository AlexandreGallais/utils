import { getSvgScreenBox } from './get-svg-screen-box.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';

describe(getSvgScreenBox, () => {
  it('returns the visible upright box', () => {
    const element = createFakeSvgElementIn({ a: 2, b: 0, c: 0, d: 2, e: 10, f: 0 }, 'rotate(90)', {
      x: 0,
      y: 0,
      width: 20,
      height: 10,
    });
    const box = getSvgScreenBox(asSvgElement(element));
    expect([box.x, box.y, box.width, box.height].map((value) => Math.round(value))).toStrictEqual([-10, 0, 20, 40]);
  });
});
