import { createBarTicks } from './create-bar-ticks.ts';

const VERTICAL = {
  min: 0,
  max: 10,
  rect: { x: 0, y: 0, width: 20, height: 200 },
  direction: 'up',
  majorStep: 5,
} as const;

describe(createBarTicks, () => {
  it('draws full-width major ticks from the left edge by default', () => {
    expect(createBarTicks(VERTICAL)).toStrictEqual([
      { value: 0, position: 200, start: { x: 0, y: 200 }, end: { x: 20, y: 200 }, isMajor: true },
      { value: 5, position: 100, start: { x: 0, y: 100 }, end: { x: 20, y: 100 }, isMajor: true },
      { value: 10, position: 0, start: { x: 0, y: 0 }, end: { x: 20, y: 0 }, isMajor: true },
    ]);
  });

  it('adds half-length minor ticks from the right edge', () => {
    const ticks = createBarTicks({ ...VERTICAL, minorStep: 2.5, majorLength: 12, align: 'end' });
    expect(ticks[1]).toStrictEqual({
      value: 2.5,
      position: 150,
      start: { x: 20, y: 150 },
      end: { x: 14, y: 150 },
      isMajor: false,
    });
    expect(ticks[2]?.end).toStrictEqual({ x: 8, y: 100 });
  });

  it('draws vertical ticks on a horizontal bar', () => {
    const ticks = createBarTicks({
      min: 0,
      max: 100,
      rect: { x: 10, y: 5, width: 200, height: 30 },
      direction: 'right',
      majorStep: 50,
      minorStep: 25,
      minorLength: 4,
    });
    expect(ticks.map(({ start, end }) => [start, end])[1]).toStrictEqual([
      { x: 60, y: 5 },
      { x: 60, y: 9 },
    ]);
    expect(ticks[2]?.end).toStrictEqual({ x: 110, y: 35 });
  });

  it('throws a RangeError for an invalid scale', () => {
    expect(() => createBarTicks({ ...VERTICAL, majorStep: -1 })).toThrow(RangeError);
  });
});
