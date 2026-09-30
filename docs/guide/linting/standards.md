# Standards and SonarQube

## Where the rules come from

Every rule of every plugin kept is listed, and the comment above a rule is its justification: `Custom:` a
project choice (an option, such as the naming convention), `Off:` disabled on purpose (most often **a
duplicate** of a rule of another plugin, so a mistake gives one message, not two), `Deprecated:` replaced by a
newer rule, `Warn:` the exception that justifies disabling it. The [rule reference](/lint-rules/) lists every
rule with its reason and a link to its documentation; a rule without reason (—) keeps the plugin's default.

The standard of each plugin (`eslint:recommended`, typescript-eslint `strict-type-checked`, SonarJS Sonar
way, angular-eslint `recommended` and `accessibility`) is included: one of its rules is off only with a
written reason (a duplicate, formatting left to Prettier, an API newer than the target).

## SonarQube: the Sonar way profile

SonarQube analyses JavaScript and TypeScript with the same rules as `eslint-plugin-sonarjs`; its default
quality profile, **Sonar way**, is the plugin's `recommended` config. Code that passes the lint passes Sonar
way:

- every Sonar way rule is **on**, or
- **off as a duplicate** of a rule that is on (`sonarjs/no-labels` → `no-labels`,
  `sonarjs/no-dead-store` → `no-useless-assignment`): the code already meets it, SonarQube will not report it,
  and the developer sees one message instead of two;
- or checked by the **TypeScript compiler** (`sonarjs/no-extra-arguments`).

`pnpm lint:presets` proves it on every run: it resolves the config of an Angular file and of a spec, and fails
if a Sonar way rule is off without an enabled rule covering it. The AWS rules are the exception: they only
check AWS CDK infrastructure code.

The SonarJS rules **outside** Sonar way are off (`Off: not in the Sonar way profile`), except the size
limits that replace a core rule, like SonarQube does. When the SonarQube profile is hardened, turn the new
rules on in `lint/eslint/rules/`: they are all listed there, by concept, under `// ---- SonarJS ----`.

## Turning a plugin off

SonarJS is always on; Storybook comes with the Storybook presets. To remove
another plugin, `setup/without-plugins.mjs` takes the keyword of its rules (`import-x`, `@angular-eslint`…),
after the preset; the rules turned off because the removed plugin covered them come back on. A
`// eslint-disable-next-line` left for a removed rule becomes an error: delete it. Do not remove `sonarjs`
from a project analysed by SonarQube.

## Copyright headers

See [Copyright headers](./copyright.md): one text file, the right comment for each file type, added before
each commit and checked in the CI.
