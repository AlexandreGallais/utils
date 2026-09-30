import { createStepPath } from './create-step-path';

const POINTS = [
  { x: 0, y: 10 },
  { x: 5, y: 0 },
  { x: 10, y: 10 },
];

describe(createStepPath, () => {
  it.for([
    { position: 'after', expected: 'M 0 10 H 5 V 0 H 10 V 10' },
    { position: 'before', expected: 'M 0 10 V 0 H 5 V 10 H 10' },
    { position: 'middle', expected: 'M 0 10 H 2.5 V 0 H 5 H 7.5 V 10 H 10' },
  ] as const)('steps $position the points', ({ position, expected }) => {
    expect(createStepPath(POINTS, position)).toBe(expected);
  });

  it('steps after the points', () => {
    expect(createStepPath(POINTS, 'after')).toBe('M 0 10 H 5 V 0 H 10 V 10');
  });

  it('returns an empty path without point', () => {
    expect(createStepPath([], 'after')).toBe('');
  });

  it('takes the defaults for null or undefined', () => {
    expect(createStepPath()).toStrictEqual(createStepPath([], 'after'));
    expect(createStepPath(null, null)).toStrictEqual(createStepPath([], 'after'));
  });
});
