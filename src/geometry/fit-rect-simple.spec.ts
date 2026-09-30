import { fitRectSimple } from './fit-rect-simple';
import { fitRect } from './fit-rect';

describe(fitRectSimple, () => {
  it('contains and centers', () => {
    const content = { width: 100, height: 50 };
    const container = { x: 0, y: 0, width: 200, height: 200 };
    expect(fitRectSimple(content, container)).toStrictEqual(fitRect(content, container, 'contain', 0.5, 0.5));
  });
});
