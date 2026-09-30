import { createArrowPath } from './create-arrow-path';

describe(createArrowPath, () => {
  it('draws a horizontal arrow', () => {
    expect(createArrowPath({ x: 0, y: 0 }, { x: 10, y: 0 }, 4, 4)).toBe('M 0 0 L 6 0 M 6 -2 L 10 0 L 6 2 Z');
  });

  it('draws a vertical arrow with a narrow head', () => {
    expect(createArrowPath({ x: 5, y: 20 }, { x: 5, y: 0 }, 5, 2)).toBe('M 5 20 L 5 5 M 4 5 L 5 0 L 6 5 Z');
  });

  it('shortens a head longer than the arrow', () => {
    expect(createArrowPath({ x: 0, y: 0 }, { x: 2, y: 0 }, 4, 4)).toBe('M 0 0 L 0 0 M 0 -2 L 2 0 L 0 2 Z');
  });

  it('returns an empty path for an arrow of zero length', () => {
    expect(createArrowPath({ x: 3, y: 3 }, { x: 3, y: 3 }, 4, 4)).toBe('');
  });

  it('takes the defaults for null or undefined', () => {
    expect(createArrowPath(undefined, undefined, 10)).toStrictEqual(
      createArrowPath({ x: 0, y: 0 }, { x: 0, y: 0 }, 10, 10),
    );
    expect(createArrowPath(null, null, 10, null)).toStrictEqual(
      createArrowPath({ x: 0, y: 0 }, { x: 0, y: 0 }, 10, 10),
    );
  });
});
