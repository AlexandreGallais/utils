# Standards and SonarQube

## Where the rules come from

The blocks are **stricter than the recommended configs** of the plugins, not looser: every rule of every
plugin is listed and **on**, unless a comment above it says otherwise. The comment is the justification:
`Custom:` a project choice (an option, such as the naming convention), `Off:` disabled on purpose (most often
**a duplicate** of a rule of another plugin that checks the same thing, so a mistake gives one message, not
two), `Deprecated:` replaced by a newer rule. The [rule reference](/lint-rules/) lists every rule with its
reason and a link to its documentation; a rule without reason (—) is on with the plugin's default options.

So the standard of each plugin (`eslint:recommended`, typescript-eslint `strict-type-checked`, SonarJS Sonar
way, angular-eslint `recommended` and `accessibility`, Unicorn and regexp `recommended`) is included: one of its rules is off only with a written reason (a
duplicate, formatting left to Prettier, an API newer than the target), and a rule outside it is on too. Stylelint extends `stylelint-config-standard-scss` and `recess-order`.

## SonarQube: the Sonar way profile

SonarQube analyses JavaScript and TypeScript with the same rules as `eslint-plugin-sonarjs`; its default
quality profile, **Sonar way**, is the plugin's `recommended` config. Code that passes the lint passes Sonar
way:

- every Sonar way rule is **on**, or
- **off as a duplicate** of a rule that is on (`sonarjs/no-labels` → `no-labels`, `sonarjs/no-skipped-tests`
  → `vitest/no-disabled-tests`): the code already meets it, SonarQube will not report it, and the developer
  sees one message instead of two;
- or checked by the **TypeScript compiler** (`sonarjs/no-extra-arguments`).

`pnpm lint:presets` proves it on every run: it resolves the config of an Angular file and of a spec, and fails
if a Sonar way rule is off without an enabled rule covering it. The AWS rules are the exception: they only
check AWS CDK infrastructure code.

The profiles also turn on the SonarJS rules **outside** Sonar way (`sonarjs/no-duplicate-string`,
`sonarjs/expression-complexity`, `sonarjs/max-union-size`…): if the SonarQube profile is hardened later,
the code already follows these rules.

## Turning a plugin off

A project that does not want a plugin (yet) removes it by keyword, after its profile:

```js
import { defineConfig } from 'eslint/config';
import withoutPlugins from './lint/eslint/setup/without-plugins.mjs';
import angularAppProfile from './lint/profiles/eslint-angular-app.mjs';

export default defineConfig([...withoutPlugins(angularAppProfile({ … }), ['unicorn', 'regexp'])]);
```

- The keywords are the prefixes of the rules: `unicorn`, `sonarjs`, `regexp`, `jsdoc`, `vitest`,
  `import-x`, `check-file`, `rxjs-x`, `boundaries`, `@ngrx`, `no-unsanitized`… An unknown keyword throws
  with the list of the removable ones; `@typescript-eslint` cannot be removed (it holds the parser).
- The rules turned off **because** the removed plugin covered them come back on: without `regexp`,
  `require-unicode-regexp` is on again. Nothing is left unchecked by accident.
- A `// eslint-disable-next-line unicorn/…` left in the code becomes an unused directive (an error):
  `eslint --fix` removes it.
- Do not remove `sonarjs` from a project analysed by SonarQube.

`pnpm lint:presets` lints the example design system without Unicorn and SonarJS to prove it.

## Copyright headers

See [Copyright headers](./copyright.md): one text file, the right comment for each file type, added before
each commit and checked in the CI.
