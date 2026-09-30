import { resetSvgRotationAndFlip } from './reset-svg-rotation-and-flip';
import { describeOnScreen, renderSvg } from './testing';

describe(resetSvgRotationAndFlip, () => {
  it('straightens and unmirrors in place, keeping the size', () => {
    const byId = renderSvg(
      '<g transform="rotate(20 50 50)"><rect id="symbol" transform="rotate(40 50 50) scale(-2 2) translate(-75 -25)" x="40" y="45" width="20" height="10" /></g>',
    );
    const before = describeOnScreen(byId('symbol'));
    resetSvgRotationAndFlip(byId('symbol'));
    const after = describeOnScreen(byId('symbol'));
    expect(after).toMatchObject({ width: 40, height: 20, rotation: 0, isFlipped: false });
    expect([after.x + after.width / 2, after.y + after.height / 2]).toStrictEqual([
      before.x + before.width / 2,
      before.y + before.height / 2,
    ]);
  });
});
