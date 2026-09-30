import { keyBy } from './key-by';

interface User {
  id: string;
  role: 'admin' | 'user';
}

const USERS: readonly User[] = [
  { id: 'u1', role: 'admin' },
  { id: 'u2', role: 'user' },
  { id: 'u3', role: 'user' },
];

describe(keyBy, () => {
  it('indexes the items by key', () => {
    expect(keyBy(USERS, (user) => user.id)).toStrictEqual({ u1: USERS[0], u2: USERS[1], u3: USERS[2] });
  });

  it('keeps the last item of a duplicate key', () => {
    expect(keyBy(USERS, (user) => user.role)).toStrictEqual({ admin: USERS[0], user: USERS[2] });
  });

  it('takes the defaults for null or undefined', () => {
    expect(keyBy(undefined, (item: string) => item)).toStrictEqual(keyBy([], (item: string) => item));
    expect(keyBy(null, (item: string) => item)).toStrictEqual(keyBy([], (item: string) => item));
  });
});
