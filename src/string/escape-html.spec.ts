import { escapeHtml } from './escape-html';

describe(escapeHtml, () => {
  it.for([
    ['<b>"Tom & Jerry"</b>', '&lt;b&gt;&quot;Tom &amp; Jerry&quot;&lt;/b&gt;'],
    ["it's", 'it&#39;s'],
    ['plain text', 'plain text'],
    ['&amp;', '&amp;amp;'],
    ['', ''],
  ] as const)('escapes %j', ([input, expected]) => {
    expect(escapeHtml(input)).toBe(expected);
  });
});
