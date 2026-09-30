import { isPointInPolygon } from './is-point-in-polygon';

const SQUARE = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];
// A "C" shape open to the right.
const CONCAVE = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 3 },
  { x: 3, y: 3 },
  { x: 3, y: 7 },
  { x: 10, y: 7 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];

describe(isPointInPolygon, () => {
  it.for([
    { point: { x: 5, y: 5 }, expected: true },
    { point: { x: -1, y: 5 }, expected: false },
    { point: { x: 11, y: 5 }, expected: false },
    { point: { x: 5, y: 11 }, expected: false },
  ])('tests $point in a square', ({ point, expected }) => {
    expect(isPointInPolygon(point, SQUARE)).toBe(expected);
  });

  it.for([
    { point: { x: 1, y: 5 }, expected: true },
    { point: { x: 6, y: 5 }, expected: false },
    { point: { x: 6, y: 1 }, expected: true },
  ])('tests $point in a concave shape', ({ point, expected }) => {
    expect(isPointInPolygon(point, CONCAVE)).toBe(expected);
  });

  it('returns false without vertex', () => {
    expect(isPointInPolygon({ x: 0, y: 0 }, [])).toBe(false);
  });
});
