import { kebabCase } from './kebab-case.ts';

describe(kebabCase, () => {
  it.for([
    ['roundToStep', 'round-to-step'],
    ['RingBuffer', 'ring-buffer'],
    ['XMLHttpRequest', 'xml-http-request'],
    ['USER_ID', 'user-id'],
    [' Hello  World ', 'hello-world'],
    ['', ''],
  ] as const)('converts %j to %j', ([input, expected]) => {
    expect(kebabCase(input)).toBe(expected);
  });
});
