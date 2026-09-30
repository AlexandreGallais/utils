import { slugify } from './slugify';

describe(slugify, () => {
  it.for([
    ['Salle des machines — Été 2026', 'salle-des-machines-ete-2026'],
    ['  Hello, World!  ', 'hello-world'],
    ['Crème brûlée', 'creme-brulee'],
    ['engineRoom', 'engine-room'],
    ['!!!', ''],
  ] as const)('slugifies %j as %j', ([input, expected]) => {
    expect(slugify(input)).toBe(expected);
  });
});
