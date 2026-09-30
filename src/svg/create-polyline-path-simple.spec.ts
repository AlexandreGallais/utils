import { createPolylinePathSimple } from './create-polyline-path-simple';

describe(createPolylinePathSimple, () => {
  it('draws an open line', () => {
    expect(
      createPolylinePathSimple([
        { x: 0, y: 10 },
        { x: 5, y: 0 },
      ]),
    ).toBe('M 0 10 L 5 0');
  });
});
