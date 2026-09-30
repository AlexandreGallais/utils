import type { ApcaLevel } from './apca-level';
import { meetsApcaLevel } from './meets-apca-level';

const WHITE = { r: 255, g: 255, b: 255 };
const GRAY = { r: 136, g: 136, b: 136 };

describe(meetsApcaLevel, () => {
  it.for([
    ['fluent-text', false],
    ['body-text', false],
    ['content-text', true],
    ['large-text', true],
    ['spot-text', true],
    ['non-text', true],
  ] as const satisfies readonly (readonly [ApcaLevel, boolean])[])(
    'rates #888 on white for %s: %s',
    ([level, expected]) => {
      expect(meetsApcaLevel(GRAY, WHITE, level)).toBe(expected);
    },
  );

  it('accepts light text on a dark background', () => {
    expect(meetsApcaLevel(WHITE, { r: 0, g: 0, b: 0 }, 'fluent-text')).toBe(true);
  });

  it('takes the defaults for null or undefined', () => {
    expect(meetsApcaLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 })).toStrictEqual(
      meetsApcaLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, 'body-text'),
    );
    expect(meetsApcaLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, null)).toStrictEqual(
      meetsApcaLevel({ r: 0, g: 0, b: 0 }, { r: 200, g: 100, b: 50 }, 'body-text'),
    );
  });
});
