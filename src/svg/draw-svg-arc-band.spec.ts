import { createRingSectorPath } from './create-ring-sector-path';
import { drawSvgArcBand } from './draw-svg-arc-band';
import { asSvgElement, createGaugeScene } from './testing';

describe(drawSvgArcBand, () => {
  it('draws a band centered on the radius', () => {
    const { hub, path } = createGaugeScene();
    drawSvgArcBand(asSvgElement(path), { center: asSvgElement(hub), radius: 40, startAngle: 80, sweepAngle: 55 }, 6);
    expect(path.attributes.get('d')).toBe(createRingSectorPath({ x: 50, y: 50 }, 37, 43, 80, 135));
  });
});
