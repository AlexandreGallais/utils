# Copyright headers

This library has no copyright header. A project that needs one keeps its text in **one file**, and a tool
writes it at the top of every file, as the comment of the file's language. The tool is
[`license-check-and-add`](https://www.npmjs.com/package/license-check-and-add): `add` inserts the header where
it is missing, `check` lists the files without it (and fails), `remove` removes it everywhere.

## Set-up

```sh
pnpm add -D license-check-and-add
```

The text, without any comment syntax, in `COPYRIGHT_HEADER.txt`. `##…##` marks a pattern, so any year
matches when checking:

```txt
Copyright (c) ##[0-9]{4}## Company name. All rights reserved.
```

`license-config.json`: the comment of each file type.

```json
{
  "license": "COPYRIGHT_HEADER.txt",
  "regexIdentifier": "##",
  "trailingWhitespace": "TRIM",
  "ignoreFile": ".gitignore",
  "ignore": ["**/*.json", "**/*.md", "**/*.yml", "**/*.yaml", "**/*.txt", "pnpm-lock.yaml", "**/.*"],
  "licenseFormats": {
    "ts|mts|js|mjs|scss|css": {
      "prepend": "/*",
      "append": " */",
      "eachLine": { "prepend": " * " }
    },
    "html|svg": {
      "prepend": "<!--",
      "append": "-->",
      "eachLine": { "prepend": "  " }
    }
  }
}
```

JSON has no comments, and the Markdown and YAML files are documentation and configuration: they are ignored.

Scripts in `package.json` (`-r` gives the year written by `add`):

```json
{
  "scripts": {
    "copyright:add": "license-check-and-add add -f license-config.json -r $(date +%Y)",
    "copyright:check": "license-check-and-add check -f license-config.json"
  }
}
```

## When it runs

- **Before each commit**, so nobody has to think about it: a pre-commit hook runs `pnpm copyright:add` and
  adds the files it changed. With [`simple-git-hooks`](https://www.npmjs.com/package/simple-git-hooks):

  ```json
  {
    "simple-git-hooks": {
      "pre-commit": "pnpm copyright:add && git add -u"
    }
  }
  ```

  then `pnpm simple-git-hooks` once to install the hook.

- **In the CI**, which catches a commit made without the hook (`--no-verify`, another machine): add
  `pnpm copyright:check` to `pnpm check`.

- **At save**, for TypeScript only: `sonarjs/file-header` (SonarQube S1451) reports a missing header, and
  [`eslint-plugin-headers`](https://www.npmjs.com/package/eslint-plugin-headers) writes it with `--fix`, so on
  save when the editor applies ESLint fixes. No lint rule covers HTML and SCSS: the hook is the reliable way.

## Notes

- The header is a plain block comment (`/*`, not `/**`): JSDoc does not read it as the documentation of the
  first export, and Prettier keeps it as is.
- `license-check-and-add` has not changed since 2022; it is small and has no framework dependency.
  [`addlicense`](https://github.com/google/addlicense) (Google, a Go binary) does the same with `-f` for the
  text file and `-check` for the CI, but must be installed on every machine.
