import { createFpsMeter } from './create-fps-meter';

describe(createFpsMeter, () => {
  it('averages the frame rate over the window', () => {
    const meter = createFpsMeter(4);
    expect(meter.tick(0)).toBe(0);
    expect(meter.tick(10)).toBe(100);
    expect(meter.tick(20)).toBe(100);
    expect(meter.tick(40)).toBe(75);
    expect(meter.tick(50)).toBe(80);
  });

  it('slides the window over the last frames', () => {
    const meter = createFpsMeter(4);
    for (const timestamp of [0, 10, 20, 40, 50]) {
      meter.tick(timestamp);
    }
    // The window now covers 10 → 60: 4 intervals in 50 ms.
    expect(meter.tick(60)).toBe(80);
    expect(meter.tick(70)).toBe(80);
    expect(meter.tick(80)).toBe(100);
    expect(meter.fps).toBe(100);
  });

  it('starts over after reset', () => {
    const meter = createFpsMeter(60);
    meter.tick(0);
    meter.tick(16);
    meter.reset();
    expect(meter.fps).toBe(0);
    expect(meter.tick(1000)).toBe(0);
    expect(meter.tick(1020)).toBe(50);
  });

  it('reports 0 for frames at the same time', () => {
    const meter = createFpsMeter(60);
    meter.tick(5);
    expect(meter.tick(5)).toBe(0);
  });

  it.for([0, -1, 1.5])('throws a RangeError for a window of %s', (windowSize) => {
    expect(() => createFpsMeter(windowSize)).toThrow(RangeError);
  });

  it('takes a window of 60 frames for null or undefined', () => {
    const meters = [createFpsMeter(), createFpsMeter(null), createFpsMeter(60)];
    const readings = meters.map((meter) => [0, 10, 20, 40].map((time) => meter.tick(time)));
    expect(readings[0]).toStrictEqual(readings[2]);
    expect(readings[1]).toStrictEqual(readings[2]);
  });
});
