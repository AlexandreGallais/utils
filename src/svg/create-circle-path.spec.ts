import { createCirclePath } from './create-circle-path';

describe(createCirclePath, () => {
  it('draws a closed circle from the top', () => {
    expect(createCirclePath({ x: 10, y: 10 }, 5)).toBe('M 10 5 A 5 5 0 1 1 10 15 A 5 5 0 1 1 10 5 Z');
  });

  it('takes the defaults for null or undefined', () => {
    expect(createCirclePath()).toStrictEqual(createCirclePath({ x: 0, y: 0 }, 0));
    expect(createCirclePath(null, null)).toStrictEqual(createCirclePath({ x: 0, y: 0 }, 0));
  });
});
