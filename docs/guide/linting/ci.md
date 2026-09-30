# CI: warnings on main

Errors always fail. Warnings are informations while a branch is being worked on, and a gate before `main`:

| Where                            | Command                                       | Fails on            |
| -------------------------------- | --------------------------------------------- | ------------------- |
| Every push (a branch, `develop`) | `pnpm lint` and `pnpm lint:css`               | errors              |
| A merge request to `main`        | `pnpm lint:strict` and `pnpm lint:css:strict` | errors and warnings |

On `main`, a warning is either fixed or justified on its line (`// eslint-disable-next-line <rule> -- <reason>`,
`// stylelint-disable-next-line <rule> -- <reason>`). The infos never fail: the command line does not even see
them (`ESLINT_INFO_RULES=off`).

The scripts, in `package.json`:

```json
{
  "scripts": {
    "lint": "ESLINT_INFO_RULES=off eslint . --concurrency auto",
    "lint:strict": "pnpm lint --max-warnings 0",
    "lint:css": "stylelint \"**/*.scss\"",
    "lint:css:strict": "pnpm lint:css --max-warnings 0"
  }
}
```

With GitLab CI, for instance:

```yaml
lint:
  script:
    - pnpm lint
    - pnpm lint:css

lint-main:
  rules:
    - if: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "main"
  script:
    - pnpm lint:strict
    - pnpm lint:css:strict
```

This repository runs the strict commands in `pnpm check`.
