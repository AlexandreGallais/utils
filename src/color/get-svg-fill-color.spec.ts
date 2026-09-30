import { getSvgFillColor } from './get-svg-fill-color';

describe(getSvgFillColor, () => {
  const element = {} as SVGGraphicsElement;

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.for([
    ['rgb(0, 128, 255)', { r: 0, g: 128, b: 255 }],
    ['rgba(10, 20, 30, 0.5)', { r: 10, g: 20, b: 30 }],
    ['rgb(10 20 30)', { r: 10, g: 20, b: 30 }],
  ] as const)('reads %s', ([fill, expected]) => {
    vi.stubGlobal('getComputedStyle', () => ({ fill }));
    expect(getSvgFillColor(element)).toStrictEqual(expected);
  });

  it.for(['none', 'url("#gradient")'])('throws a TypeError for %s', (fill) => {
    vi.stubGlobal('getComputedStyle', () => ({ fill }));
    expect(() => getSvgFillColor(element)).toThrow(TypeError);
  });
});
