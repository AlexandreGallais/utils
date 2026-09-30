import { countBy } from './count-by';

interface User {
  id: string;
  role: 'admin' | 'user';
}

const USERS: readonly User[] = [
  { id: 'u1', role: 'admin' },
  { id: 'u2', role: 'user' },
  { id: 'u3', role: 'user' },
];

describe(countBy, () => {
  it('counts the items per key', () => {
    expect(countBy(USERS, (user) => user.role)).toStrictEqual({ admin: 1, user: 2 });
    expect(countBy(['a', 'bb', 'cc'], (word) => word.length)).toStrictEqual({ 1: 1, 2: 2 });
  });

  it('returns an empty object for no items', () => {
    expect(countBy([], String)).toStrictEqual({});
  });
});
