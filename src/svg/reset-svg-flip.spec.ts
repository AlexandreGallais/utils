import { resetSvgFlip } from './reset-svg-flip';
import { describeOnScreen, renderSvg } from './testing';

describe(resetSvgFlip, () => {
  it('unmirrors in place', () => {
    const byId = renderSvg(
      '<rect id="label" transform="rotate(90 50 50) scale(-1 1) translate(-100 0)" x="40" y="45" width="20" height="10" />',
    );
    resetSvgFlip(byId('label'));
    expect(describeOnScreen(byId('label'))).toMatchObject({
      x: 45,
      y: 40,
      width: 10,
      height: 20,
      rotation: 90,
      isFlipped: false,
    });
  });

  it('leaves an element that is not mirrored', () => {
    const byId = renderSvg('<rect id="label" transform="rotate(90 50 50)" x="40" y="45" width="20" height="10" />');
    resetSvgFlip(byId('label'));
    expect(describeOnScreen(byId('label'))).toMatchObject({ rotation: 90, isFlipped: false });
  });
});
