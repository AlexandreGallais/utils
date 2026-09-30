import { paginate } from './paginate';

const LETTERS = ['a', 'b', 'c', 'd', 'e'];

describe(paginate, () => {
  it('extracts a middle page', () => {
    expect(paginate(LETTERS, 2, 2)).toStrictEqual({
      items: ['c', 'd'],
      page: 2,
      pageSize: 2,
      pageCount: 3,
      total: 5,
      hasPrevious: true,
      hasNext: true,
    });
  });

  it('extracts the first and the last page', () => {
    expect(paginate(LETTERS, 1, 2)).toMatchObject({ items: ['a', 'b'], hasPrevious: false, hasNext: true });
    expect(paginate(LETTERS, 3, 2)).toMatchObject({ items: ['e'], hasPrevious: true, hasNext: false });
  });

  it.for([
    [0, 1],
    [-3, 1],
    [99, 3],
    [2.7, 2],
    [NaN, 1],
  ] as const)('clamps page %s to %s', ([page, expected]) => {
    expect(paginate(LETTERS, page, 2).page).toBe(expected);
  });

  it('gives one empty page for an empty list', () => {
    expect(paginate([], 1, 10)).toStrictEqual({
      items: [],
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 0,
      hasPrevious: false,
      hasNext: false,
    });
  });

  it.for([0, -1, 1.5])('throws a RangeError for page size %s', (pageSize) => {
    expect(() => paginate(LETTERS, 1, pageSize)).toThrow(RangeError);
  });
});
