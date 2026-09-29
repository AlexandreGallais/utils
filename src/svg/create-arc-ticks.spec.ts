import { createArcTicks } from './create-arc-ticks.ts';

const OPTIONS = {
  center: { x: 50, y: 50 },
  startAngle: -90,
  endAngle: 90,
  min: 0,
  max: 10,
  majorStep: 5,
  innerRadius: 30,
  outerRadius: 40,
};

function rounded(point: { readonly x: number; readonly y: number }): { x: number; y: number } {
  return { x: Math.round(point.x * 1000) / 1000 + 0, y: Math.round(point.y * 1000) / 1000 + 0 };
}

describe(createArcTicks, () => {
  it('places major ticks along the arc', () => {
    const ticks = createArcTicks(OPTIONS);
    expect(ticks.map(({ value, angle, isMajor }) => ({ value, angle, isMajor }))).toStrictEqual([
      { value: 0, angle: -90, isMajor: true },
      { value: 5, angle: 0, isMajor: true },
      { value: 10, angle: 90, isMajor: true },
    ]);
    expect(rounded(ticks[1]?.start ?? { x: 0, y: 0 })).toStrictEqual({ x: 50, y: 20 });
    expect(rounded(ticks[1]?.end ?? { x: 0, y: 0 })).toStrictEqual({ x: 50, y: 10 });
  });

  it('adds shorter minor ticks without duplicating the major ones', () => {
    const ticks = createArcTicks({ ...OPTIONS, minorStep: 2.5, minorInnerRadius: 35 });
    expect(ticks.map(({ value, isMajor }) => `${value}${isMajor ? 'M' : 'm'}`)).toStrictEqual([
      '0M',
      '2.5m',
      '5M',
      '7.5m',
      '10M',
    ]);
    expect(rounded(ticks[1]?.start ?? { x: 0, y: 0 })).toStrictEqual({ x: 25.251, y: 25.251 });
  });

  it('draws minor ticks from the inner radius by default', () => {
    const [, minor] = createArcTicks({ ...OPTIONS, minorStep: 2.5 });
    expect(rounded(minor?.start ?? { x: 0, y: 0 })).toStrictEqual({ x: 28.787, y: 28.787 });
  });

  it('throws a RangeError for an invalid scale', () => {
    expect(() => createArcTicks({ ...OPTIONS, majorStep: 0 })).toThrow(RangeError);
  });
});
