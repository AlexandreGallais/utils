# Performance

A strict lint is only accepted if it stays fast. Measures on this repository (536 files plus the Angular
example, Apple M-series, 10 cores):

| Run                                             | Time     |
| ----------------------------------------------- | -------- |
| `eslint .` (one thread)                         | 51 s     |
| `eslint . --concurrency auto` (`pnpm lint`)     | **32 s** |
| `--cache`, first run                            | 43 s     |
| `--cache`, nothing changed (`pnpm lint:cached`) | **3 s**  |

Where the rule time goes (`TIMING=all pnpm exec eslint .`, 30 s of rules in total; parsing and the
TypeScript program take the rest):

| Plugin            | Share                               |
| ----------------- | ----------------------------------- |
| SonarJS           | 24 %                                |
| typescript-eslint | 23 %                                |
| import-x          | 18 % (mostly `no-cycle`)            |
| Unicorn           | 12 % (300 rules: none is expensive) |
| Prettier          | 9 %                                 |
| JSDoc             | 9 %                                 |
| everything else   | 5 %                                 |

## What was done

- **The SonarJS AWS rules are off.** They only apply to AWS CDK infrastructure code, yet they cost about
  **20 %** of the lint time. Found with `TIMING`: always measure before blaming a plugin.
- **`--concurrency auto`**: ESLint lints files on every core. With type information, each thread builds its
  own TypeScript program: it takes more memory (fine with 64 GB) and saves 35 to 50 %.
- **Unicorn stays**: its reputation of being slow does not hold on measures; no rule of it is in the top 5.

## Tips

- Find the slow rules: `TIMING=20 pnpm exec eslint .` lists the 20 costliest.
- In the editor, the ESLint server keeps the TypeScript program in memory: only the first file is slow.
- `pnpm lint:cached` for quick local runs. The cache only knows file contents: a change of a type in one file
  does not invalidate the files using it, so the CI always runs the full `pnpm lint`.
- `import-x/no-cycle` is the costliest single rule on large projects; its `maxDepth` option limits the search
  if needed.
- Prettier inside ESLint costs about 10 %; running `prettier --check` as a separate step is an alternative.
- Stylelint is fast (under a second for a design system); it needs no tuning.
