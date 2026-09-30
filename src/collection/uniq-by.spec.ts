import { uniqBy } from './uniq-by';

interface User {
  id: string;
  role: 'admin' | 'user';
}

const USERS: readonly User[] = [
  { id: 'u1', role: 'admin' },
  { id: 'u2', role: 'user' },
  { id: 'u3', role: 'user' },
];

describe(uniqBy, () => {
  it('keeps the first item of each key, in order', () => {
    expect(uniqBy(USERS, (user) => user.role)).toStrictEqual([USERS[0], USERS[1]]);
    expect(uniqBy([3, 1, 3, 2, 1], (value) => value)).toStrictEqual([3, 1, 2]);
  });

  it('takes the defaults for null or undefined', () => {
    expect(uniqBy(undefined, (item: number) => item)).toStrictEqual(uniqBy([], (item: number) => item));
    expect(uniqBy(null, (item: number) => item)).toStrictEqual(uniqBy([], (item: number) => item));
  });
});
