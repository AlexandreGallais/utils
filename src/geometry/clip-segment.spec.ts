import { clipSegment } from './clip-segment.ts';

describe(clipSegment, () => {
  const rect = { x: 0, y: 0, width: 10, height: 10 };

  it('returns the same ends for a segment inside', () => {
    const start = { x: 1, y: 1 };
    const end = { x: 9, y: 5 };
    const clipped = clipSegment(start, end, rect);
    expect(clipped?.[0]).toBe(start);
    expect(clipped?.[1]).toBe(end);
  });

  it.for([
    {
      start: { x: -10, y: 5 },
      end: { x: 5, y: 5 },
      expected: [
        { x: 0, y: 5 },
        { x: 5, y: 5 },
      ],
    },
    {
      start: { x: 5, y: 5 },
      end: { x: 5, y: 20 },
      expected: [
        { x: 5, y: 5 },
        { x: 5, y: 10 },
      ],
    },
    {
      start: { x: -5, y: -5 },
      end: { x: 15, y: 15 },
      expected: [
        { x: 0, y: 0 },
        { x: 10, y: 10 },
      ],
    },
    {
      start: { x: 15, y: 5 },
      end: { x: -5, y: 5 },
      expected: [
        { x: 10, y: 5 },
        { x: 0, y: 5 },
      ],
    },
    {
      start: { x: 0, y: -5 },
      end: { x: 0, y: 5 },
      expected: [
        { x: 0, y: 0 },
        { x: 0, y: 5 },
      ],
    },
  ])('cuts $start → $end', ({ start, end, expected }) => {
    expect(clipSegment(start, end, rect)).toStrictEqual(expected);
  });

  it.for([
    { start: { x: -5, y: 5 }, end: { x: -1, y: 20 } },
    { start: { x: 11, y: -5 }, end: { x: 11, y: 5 } },
    { start: { x: -5, y: 2 }, end: { x: 2, y: -5 } },
    { start: { x: 20, y: 20 }, end: { x: 20, y: 20 } },
  ])('returns undefined for $start → $end outside', ({ start, end }) => {
    expect(clipSegment(start, end, rect)).toBeUndefined();
  });

  it('keeps a single point inside', () => {
    const point = { x: 3, y: 3 };
    expect(clipSegment(point, point, rect)).toStrictEqual([point, point]);
  });
});
