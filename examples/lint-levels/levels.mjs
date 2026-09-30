// The three levels, to see in the editor: open this file in VS Code (after `pnpm lint:editor`, the infos are
// blue) or in WebStorm (it has no info level: the infos show as warnings there). `pnpm lint` skips this folder
// (`--ignore-pattern`): the mistakes below are on purpose.

// Info (blue): `func-style` suggests a function declaration, `prefer-regex-literals` a literal, and
// `require-unicode-regexp` the `v` flag. Nothing blocks.
export const double = (value) => value * 2;
export const DIGITS = new RegExp('\\d+');

// Warning (yellow): `no-param-reassign` (a mutated argument) and `no-await-in-loop` (awaits one by one). To
// keep them, `// eslint-disable-next-line <rule> -- <reason>`.
export function reset(options) {
  options.value = 0;
}

export async function waitEach(delays) {
  for (const delay of delays) {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
}

// Error (red): `no-self-compare` is a bug (use `Number.isNaN`); `no-var` is fixed on save. An error cannot be
// disabled.
export function isNotANumber(value) {
  return value !== value;
}

const legacy = 1;
export { legacy };
