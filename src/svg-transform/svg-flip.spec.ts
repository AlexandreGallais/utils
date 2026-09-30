import { applySvgTransforms } from './apply-svg-transforms';
import { svgFlip } from './svg-flip';
import { describeOnScreen, renderSvg } from './testing';

describe(svgFlip, () => {
  it('mirrors horizontally around the center by default', () => {
    const byId = renderSvg(
      '<g transform="rotate(30 50 50)"><rect id="valve" x="40" y="45" width="20" height="10" /></g>',
    );
    const before = describeOnScreen(byId('valve'));
    applySvgTransforms(byId('valve'), [svgFlip()]);
    expect(describeOnScreen(byId('valve'))).toMatchObject({ x: before.x, y: before.y, isFlipped: true });
  });

  it('mirrors vertically around an anchor', () => {
    const byId = renderSvg('<rect id="valve" x="10" y="10" width="20" height="10" />');
    applySvgTransforms(byId('valve'), [svgFlip(true, 'vertical', 'top')]);
    expect(describeOnScreen(byId('valve'))).toMatchObject({ x: 10, y: 0, isFlipped: true });
  });

  it.for([
    [true, 'scale(-1 1) translate(-40 0)', true],
    [false, 'translate(0 0)', false],
    [false, 'scale(-1 1) translate(-40 0)', false],
  ] as const)('makes the element mirrored: %s, from %s', ([isFlipped, transform, expected]) => {
    const byId = renderSvg(`<rect id="label" transform="${transform}" x="10" y="10" width="20" height="10" />`);
    applySvgTransforms(byId('label'), [svgFlip(isFlipped)]);
    expect(describeOnScreen(byId('label'))).toMatchObject({ x: 10, y: 10, isFlipped: expected });
  });
});
