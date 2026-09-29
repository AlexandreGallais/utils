import { joinPath } from './join-path.ts';

describe(joinPath, () => {
  it.for([
    [['a', 'b', 'c'], 'a/b/c'],
    [['/a/', '/b/', 'c'], '/a/b/c'],
    [['/assets', '', 'img/'], '/assets/img/'],
    [['https://api.example.com/', '/v1/', 'users'], 'https://api.example.com/v1/users'],
    [['wss://host//', '//x'], 'wss://host/x'],
    [['file:///tmp', 'a'], 'file:///tmp/a'],
    [['/', 'a'], '/a'],
    [['a//b', 'c'], 'a/b/c'],
    [['', ''], ''],
    [[], ''],
  ] as const)('joins %j as %j', ([segments, expected]) => {
    expect(joinPath(...segments)).toBe(expected);
  });
});
