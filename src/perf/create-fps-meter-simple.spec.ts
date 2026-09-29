import { createFpsMeterSimple } from './create-fps-meter-simple.ts';

describe(createFpsMeterSimple, () => {
  it('measures the frame rate', () => {
    const meter = createFpsMeterSimple();
    meter.tick(0);
    expect(meter.tick(20)).toBe(50);
  });
});
