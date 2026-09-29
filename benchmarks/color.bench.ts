import {
  getReadableTextColor,
  getReadableTextColorCached,
  getRelativeLuminance,
  parseColor,
  parseColorCached,
  toHex,
} from 'utils';
import type { Rgb } from 'utils';

/* A UI recolouring widgets from a small set of colours, 1 000 times. */
const INPUTS = Array.from({ length: 1000 }, (_, index) => `rgb(${index % 16}, 128, 255)`);
const COLORS: Rgb[] = Array.from({ length: 1000 }, (_, index) => ({ r: index % 256, g: 128, b: 255 }));
/* Results are written here so the engine cannot drop the benchmarked code as dead. */
let _sink: unknown;

function naiveLinear(channel: number): number {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

describe('parseColorCached', () => {
  it('compares with parseColor', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('parseColorCached', () => {
        for (const input of INPUTS) {
          _sink = parseColorCached(input);
        }
      }),
      benchmark('parseColor', () => {
        for (const input of INPUTS) {
          _sink = parseColor(input);
        }
      }),
    );
  });
});

describe('getRelativeLuminance', () => {
  it('compares with Math.pow per channel', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('getRelativeLuminance (lookup table)', () => {
        for (const color of COLORS) {
          _sink = getRelativeLuminance(color);
        }
      }),
      benchmark('Math.pow per channel', () => {
        for (const color of COLORS) {
          _sink = 0.2126 * naiveLinear(color.r) + 0.7152 * naiveLinear(color.g) + 0.0722 * naiveLinear(color.b);
        }
      }),
    );
  });
});

describe('getReadableTextColorCached', () => {
  it('compares with getReadableTextColor', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('getReadableTextColorCached(string)', () => {
        for (const input of INPUTS) {
          _sink = getReadableTextColorCached(input);
        }
      }),
      benchmark('getReadableTextColor(string)', () => {
        for (const input of INPUTS) {
          _sink = getReadableTextColor(input);
        }
      }),
    );
  });
});

describe('toHex', () => {
  it('compares with toString(16) per channel', async ({ bench: benchmark }) => {
    await benchmark.compare(
      benchmark('toHex (byte table)', () => {
        for (const color of COLORS) {
          _sink = toHex(color);
        }
      }),
      benchmark('toString(16).padStart per channel', () => {
        for (const color of COLORS) {
          _sink = `#${[color.r, color.g, color.b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
        }
      }),
    );
  });
});
