import { applySvgTransforms } from './apply-svg-transforms';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { svgPlace } from './svg-place';
import { renderSvg } from './testing';

describe(svgPlace, () => {
  it('puts an anchor on an anchor of an element of another group', () => {
    const byId = renderSvg(`
      <g transform="translate(200 100) rotate(30) scale(1.5)"><rect id="badge" width="10" height="6" /></g>
      <g transform="translate(50 60)"><rect id="symbol" width="40" height="20" /></g>
    `);
    applySvgTransforms(byId('badge'), [svgPlace(byId('symbol'), 'bottom-left', 'top-right')]);
    const badge = getSvgAnchorPoint(byId('badge'), 'top-right');
    expect(badge.x).toBeCloseTo(50, 3);
    expect(badge.y).toBeCloseTo(80, 3);
  });

  it('centers on the center by default', () => {
    const byId = renderSvg(
      '<rect id="label" width="10" height="10" /><rect id="zone" x="100" y="100" width="50" height="50" />',
    );
    applySvgTransforms(byId('label'), [svgPlace(byId('zone'))]);
    expect(getSvgAnchorPoint(byId('label'))).toMatchObject({ x: 125, y: 125 });
  });
});
