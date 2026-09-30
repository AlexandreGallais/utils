import { words } from './words';

describe(words, () => {
  it.for([
    ['helloWorld', ['hello', 'World']],
    ['HelloWorld', ['Hello', 'World']],
    ['hello-world', ['hello', 'world']],
    ['hello_world', ['hello', 'world']],
    ['HELLO_WORLD', ['HELLO', 'WORLD']],
    ['  hello   world  ', ['hello', 'world']],
    ['XMLHttpRequest', ['XML', 'Http', 'Request']],
    ['getHTTPStatus', ['get', 'HTTP', 'Status']],
    ['speed2Knots', ['speed', '2', 'Knots']],
    ['élémentÉtat', ['élément', 'État']],
    ['a.b/c', ['a', 'b', 'c']],
  ] as const)('splits %j', ([input, expected]) => {
    expect(words(input)).toStrictEqual(expected);
  });

  it.for(['', ' '.repeat(3), '-_./'])('returns no word for %j', (input) => {
    expect(words(input)).toStrictEqual([]);
  });
});
