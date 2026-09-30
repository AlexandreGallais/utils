# Transfer folders

At work, files cannot be downloaded, but text can be pasted. `pnpm transfer` packs folders into **one text
file** that recreates them: paste its text into a file there, run it with Node, and the folders are back with
their whole tree.

```sh
pnpm transfer                  # transfer/lint.mjs: the lint/ folder
pnpm transfer src/svg src/dom  # transfer/src-svg+src-dom.mjs: two themes, and the themes they import
```

On the other machine:

```sh
node lint.mjs                  # writes lint/ in the current folder
node lint.mjs ../my-workspace  # or in another folder
node lint.mjs --force          # replaces the files that already exist (kept otherwise)
```

- A folder of `src/` brings the folders of `src/` it imports (`src/svg` brings `src/geometry`, `src/math`,
  `src/angle`, `src/format` and `src/internal`), so that the copy compiles. Their `index.ts` come along: the
  imports go through them.
- The file is plain JavaScript text: every file of the folders is a string inside it. It can be read before it
  is run.
- `transfer/` is ignored by Git.

After transferring `lint/`, install the tools it uses (see [Write the config](./linting/write-config.md)).
