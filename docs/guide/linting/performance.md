# Performance

A strict lint is only accepted if it stays fast. Measures on this repository (536 files plus the Angular
example, SonarJS on, Apple M-series, 10 cores):

| Run                                             | Time     |
| ----------------------------------------------- | -------- |
| `eslint .` (one thread)                         | 40 s     |
| `eslint . --concurrency auto` (`pnpm lint`)     | **28 s** |
| `--cache`, nothing changed (`pnpm lint:cached`) | **6 s**  |

Before the plugins were reduced (Unicorn, JSDoc, regexp, Vitest, boundaries, check-file, compat…), the same
runs took 51 s and 32 s.

Where the rule time goes (`TIMING=all pnpm exec eslint .`, 26 s of rules in total; parsing and the TypeScript
program take the rest):

| Plugin            | Share                    |
| ----------------- | ------------------------ |
| import-x          | 30 % (mostly `no-cycle`) |
| SonarJS           | 27 %                     |
| typescript-eslint | 27 %                     |
| Prettier          | 12 %                     |
| everything else   | 4 %                      |

## What was done

- **Fewer plugins**: each plugin kept earns its place (see the [overview](./index.md#plugins)).
- **The SonarJS AWS rules are off.** They only apply to AWS CDK infrastructure code, yet they cost about
  **20 %** of the lint time. Found with `TIMING`: always measure before blaming a plugin.
- **`--concurrency auto`**: ESLint lints files on every core. With type information, each thread builds its
  own TypeScript program: it takes more memory and saves about 30 %.

## Tips

- Find the slow rules: `TIMING=20 pnpm exec eslint .` lists the 20 costliest.
- In the editor, the ESLint server keeps the TypeScript program in memory: only the first file is slow.
- `pnpm lint:cached` for quick local runs. The cache only knows file contents: a change of a type in one file
  does not invalidate the files using it, so the CI always runs the full `pnpm lint`.
- `import-x/no-cycle` is the costliest single rule on large projects; its `maxDepth` option limits the search
  if needed.
- Prettier inside ESLint costs about 12 %; running `prettier --check` as a separate step is an alternative.
