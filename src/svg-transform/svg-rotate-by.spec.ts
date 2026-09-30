import { applySvgTransforms } from './apply-svg-transforms';
import { svgRotateBy } from './svg-rotate-by';
import { describeOnScreen, renderSvg } from './testing';

describe(svgRotateBy, () => {
  it('turns from its position before the order, not from the previous value', () => {
    const byId = renderSvg('<rect id="flag" transform="rotate(30 50 50)" x="40" y="45" width="20" height="10" />');
    const rotation = svgRotateBy(3);
    applySvgTransforms(byId('flag'), [rotation]);
    rotation.set(90);
    expect(describeOnScreen(byId('flag'))).toMatchObject({ rotation: 120 });
  });

  it('turns from the default position given by its groups', () => {
    const byId = renderSvg(
      '<g transform="rotate(90 50 50)"><rect id="bar" x="40" y="45" width="20" height="10" /></g>',
    );
    applySvgTransforms(byId('bar'), [svgRotateBy(90)]);
    expect(describeOnScreen(byId('bar'))).toMatchObject({ x: 40, y: 45, width: 20, height: 10, rotation: 180 });
  });

  it('turns around an anchor of another element', () => {
    const byId = renderSvg(
      '<rect id="needle" x="98" y="60" width="4" height="40" /><circle id="hub" cx="100" cy="100" r="5" />',
    );
    applySvgTransforms(byId('needle'), [svgRotateBy(90, 'center', byId('hub'))]);
    expect(describeOnScreen(byId('needle'))).toMatchObject({ x: 100, y: 98, width: 40, height: 4, rotation: 90 });
  });
});
