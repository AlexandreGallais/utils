import { meetsContrastLevelSimple } from './meets-contrast-level-simple';

describe(meetsContrastLevelSimple, () => {
  it('uses the normal text thresholds', () => {
    expect(meetsContrastLevelSimple({ r: 118, g: 118, b: 118 }, { r: 255, g: 255, b: 255 }, 'AA')).toBe(true);
    expect(meetsContrastLevelSimple({ r: 150, g: 150, b: 150 }, { r: 255, g: 255, b: 255 }, 'AA')).toBe(false);
  });
});
