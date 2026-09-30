import { getSvgAnchorPointIn } from './get-svg-anchor-point-in';
import { renderSvg } from './testing';

describe(getSvgAnchorPointIn, () => {
  it('gives the point in the coordinates of an element of another group', () => {
    const byId = renderSvg(`
      <g transform="translate(100 100)"><circle id="hub" r="5" /></g>
      <g transform="scale(2)"><path id="path" /></g>
    `);
    expect(getSvgAnchorPointIn(byId('hub'), 'center', byId('path'))).toMatchObject({ x: 50, y: 50 });
  });

  it('throws a TypeError for an element that is not rendered', () => {
    const byId = renderSvg('<circle id="hub" r="5" />');
    const notRendered = { getScreenCTM: (): null => null } as unknown as SVGGraphicsElement;
    expect(() => getSvgAnchorPointIn(byId('hub'), 'center', notRendered)).toThrow(TypeError);
  });
});
