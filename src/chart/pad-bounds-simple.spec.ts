import { padBoundsSimple } from './pad-bounds-simple';

describe(padBoundsSimple, () => {
  it('adds 5 % on each side', () => {
    expect(padBoundsSimple({ minX: 0, maxX: 100, minY: 20, maxY: 20 })).toStrictEqual({
      minX: -5,
      maxX: 105,
      minY: 19,
      maxY: 21,
    });
  });
});
