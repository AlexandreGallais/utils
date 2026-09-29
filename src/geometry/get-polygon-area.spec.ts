import { getPolygonArea } from './get-polygon-area.ts';

describe(getPolygonArea, () => {
  it.for([
    {
      vertices: [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 3 },
      ],
      expected: 6,
    },
    {
      vertices: [
        { x: 0, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 10 },
        { x: 10, y: 0 },
      ],
      expected: 100,
    },
    {
      vertices: [
        { x: 0, y: 0 },
        { x: 5, y: 5 },
      ],
      expected: 0,
    },
    { vertices: [], expected: 0 },
  ])('measures $expected', ({ vertices, expected }) => {
    expect(getPolygonArea(vertices)).toBe(expected);
  });
});
