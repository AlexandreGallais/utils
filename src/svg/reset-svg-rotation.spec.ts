import { resetSvgRotation } from './reset-svg-rotation';
import { describeOnScreen, renderSvg } from './testing';

describe(resetSvgRotation, () => {
  it.for([
    ['rotate(30 50 50)', false],
    ['rotate(30 50 50) scale(-1 1) translate(-100 0)', true],
  ] as const)('straightens %s in place on screen', ([transform, isFlipped]) => {
    const byId = renderSvg(
      `<g transform="rotate(20 50 50)"><rect id="symbol" transform="${transform}" x="40" y="45" width="20" height="10" /></g>`,
    );
    resetSvgRotation(byId('symbol'));
    expect(describeOnScreen(byId('symbol'))).toMatchObject({
      x: 40,
      y: 45,
      width: 20,
      height: 10,
      rotation: 0,
      isFlipped,
    });
  });
});
