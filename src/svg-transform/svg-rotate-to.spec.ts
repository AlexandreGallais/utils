import { applySvgTransforms } from './apply-svg-transforms';
import { svgRotateTo } from './svg-rotate-to';
import { describeOnScreen, renderSvg } from './testing';

describe(svgRotateTo, () => {
  it.for([
    ['rotate(30 50 50)', false],
    ['rotate(30 50 50) scale(-1 1) translate(-100 0)', true],
  ] as const)('straightens %s in place with 0', ([transform, isFlipped]) => {
    const byId = renderSvg(
      `<g transform="rotate(20 50 50)"><rect id="symbol" transform="${transform}" x="40" y="45" width="20" height="10" /></g>`,
    );
    applySvgTransforms(byId('symbol'), [svgRotateTo(0)]);
    expect(describeOnScreen(byId('symbol'))).toMatchObject({
      x: 40,
      y: 45,
      width: 20,
      height: 10,
      rotation: 0,
      isFlipped,
    });
  });

  it('turns to an absolute angle around an anchor', () => {
    const byId = renderSvg('<rect id="flag" transform="rotate(45 40 40)" x="40" y="40" width="20" height="10" />');
    applySvgTransforms(byId('flag'), [svgRotateTo(90, 'top-left')]);
    expect(describeOnScreen(byId('flag'))).toMatchObject({ rotation: 90 });
  });

  it('turns around an anchor of another element', () => {
    const byId = renderSvg(
      '<rect id="needle" x="98" y="60" width="4" height="40" /><circle id="hub" cx="100" cy="100" r="5" />',
    );
    applySvgTransforms(byId('needle'), [svgRotateTo(90, 'center', byId('hub'))]);
    expect(describeOnScreen(byId('needle'))).toMatchObject({ x: 100, y: 98, width: 40, height: 4, rotation: 90 });
  });
});
