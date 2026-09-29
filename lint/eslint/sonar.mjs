// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// SonarJS: the rules of SonarQube (bugs, code smells, security hotspots), every rule listed; duplicates of
// explicit rules are off. The AWS CDK rules are off: they do not apply outside infrastructure code and cost
// about 20 % of the lint time.

import sonarjs from 'eslint-plugin-sonarjs';
import { CODE_FILES } from './files.mjs';

/**
 * SonarJS rules, for any project.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function sonarBlock() {
  return [
    {
      name: 'sonar',
      files: CODE_FILES,
      extends: [sonarjs.configs.recommended],
      rules: {
        // Off: AWS CDK infrastructure code only; together they cost about 20 % of the lint time.
        'sonarjs/aws-apigateway-public-api': ['off'],
        'sonarjs/aws-ec2-rds-dms-public': ['off'],
        'sonarjs/aws-ec2-unencrypted-ebs-volume': ['off'],
        'sonarjs/aws-efs-unencrypted': ['off'],
        'sonarjs/aws-iam-all-privileges': ['off'],
        'sonarjs/aws-iam-all-resources-accessible': ['off'],
        'sonarjs/aws-iam-privilege-escalation': ['off'],
        'sonarjs/aws-iam-public-access': ['off'],
        'sonarjs/aws-opensearchservice-domain': ['off'],
        'sonarjs/aws-rds-unencrypted-databases': ['off'],
        'sonarjs/aws-restricted-ip-admin-access': ['off'],
        'sonarjs/aws-s3-bucket-granted-access': ['off'],
        'sonarjs/aws-s3-bucket-insecure-http': ['off'],
        'sonarjs/aws-s3-bucket-public-access': ['off'],
        'sonarjs/aws-s3-bucket-versioning': ['off'],
        'sonarjs/aws-sagemaker-unencrypted-notebook': ['off'],
        'sonarjs/aws-sns-unencrypted-topics': ['off'],
        'sonarjs/aws-sqs-unencrypted-queue': ['off'],
        // Custom: size limits, off in the preset; one function per file keeps files and functions short.
        'sonarjs/max-lines': ['error', { maximum: 200 }],
        'sonarjs/max-lines-per-function': ['error', { maximum: 60 }],
        'sonarjs/nested-control-flow': ['error'],
        // Custom: rules off in the preset, enabled for a strict library.
        'sonarjs/bool-param-default': ['error'],
        'sonarjs/class-prototype': ['error'],
        'sonarjs/destructuring-assignment-syntax': ['error'],
        'sonarjs/expression-complexity': ['error'],
        'sonarjs/max-union-size': ['error'],
        'sonarjs/no-built-in-override': ['error'],
        'sonarjs/no-commented-code': ['error'],
        'sonarjs/no-duplicate-string': ['error'],
        'sonarjs/no-incorrect-string-concat': ['error'],
        'sonarjs/no-nested-incdec': ['error'],
        'sonarjs/no-nested-switch': ['error'],
        'sonarjs/no-return-type-any': ['error'],
        'sonarjs/no-sonar-comments': ['error'],
        'sonarjs/non-number-in-arithmetic-expression': ['error'],
        'sonarjs/operation-returning-nan': ['error'],
        'sonarjs/prefer-immediate-return': ['error'],
        'sonarjs/prefer-object-literal': ['error'],
        'sonarjs/strings-comparison': ['error'],
        'sonarjs/too-many-break-or-continue-in-loop': ['error'],
        'sonarjs/useless-string-operation': ['error'],
        'sonarjs/values-not-convertible-to-numbers': ['error'],
        // Off: duplicate of array-callback-return.
        'sonarjs/array-callback-without-return': ['off'],
        // Off: duplicate of vitest/no-standalone-expect.
        'sonarjs/assertions-in-test-cases': ['off'],
        // Off: duplicate of vitest/expect-expect.
        'sonarjs/assertions-in-tests': ['off'],
        // Off: duplicate of block-scoped-var.
        'sonarjs/block-scoped-var': ['off'],
        // Off: duplicate of @typescript-eslint/naming-convention.
        'sonarjs/class-name': ['off'],
        // Off: duplicate of no-eval, no-new-func and no-implied-eval.
        'sonarjs/code-eval': ['off'],
        // Off: duplicate of no-new.
        'sonarjs/constructor-for-side-effects': ['off'],
        // Off: duplicate of @typescript-eslint/no-deprecated.
        'sonarjs/deprecation': ['off'],
        // Off: duplicate of no-warning-comments.
        'sonarjs/fixme-tag': ['off'],
        // Off: duplicate of no-loop-func.
        'sonarjs/function-inside-loop': ['off'],
        // Off: duplicate of require-yield.
        'sonarjs/generator-without-yield': ['off'],
        // Off: duplicate of vitest/prefer-hooks-on-top.
        'sonarjs/hooks-before-test-cases': ['off'],
        // Off: duplicate of no-labels.
        'sonarjs/label-position': ['off'],
        // Off: duplicate of @typescript-eslint/require-array-sort-compare.
        'sonarjs/no-alphabetical-sort': ['off'],
        // Off: duplicate of @typescript-eslint/no-array-delete.
        'sonarjs/no-array-delete': ['off'],
        // Off: duplicate of no-labels.
        'sonarjs/no-case-label-in-switch': ['off'],
        // Off: duplicate of no-control-regex.
        'sonarjs/no-control-regex': ['off'],
        // Off: duplicate of no-useless-assignment.
        'sonarjs/no-dead-store': ['off'],
        // Off: duplicate of no-delete-var.
        'sonarjs/no-delete-var': ['off'],
        // Off: duplicate of @typescript-eslint/no-duplicate-type-constituents.
        'sonarjs/no-duplicate-in-composite': ['off'],
        // Off: duplicate of vitest/no-identical-title.
        'sonarjs/no-duplicate-test-title': ['off'],
        // Off: duplicate of no-empty-character-class.
        'sonarjs/no-empty-character-class': ['off'],
        // Off: duplicate of vitest/valid-title.
        'sonarjs/no-empty-test-title': ['off'],
        // Off: duplicate of vitest/no-focused-tests.
        'sonarjs/no-exclusive-tests': ['off'],
        // Off: already a TypeScript compiler error.
        'sonarjs/no-extra-arguments': ['off'],
        // Off: duplicate of no-fallthrough.
        'sonarjs/no-fallthrough': ['off'],
        // Off: duplicate of no-shadow-restricted-names.
        'sonarjs/no-globals-shadowing': ['off'],
        // Off: duplicate of @typescript-eslint/no-unnecessary-condition.
        'sonarjs/no-gratuitous-expressions': ['off'],
        // Off: duplicate of no-dupe-else-if and no-duplicate-case.
        'sonarjs/no-identical-conditions': ['off'],
        // Off: duplicate of no-undef (and a TypeScript compiler error).
        'sonarjs/no-implicit-global': ['off'],
        // Off: duplicate of no-invalid-regexp.
        'sonarjs/no-invalid-regexp': ['off'],
        // Off: duplicate of no-labels.
        'sonarjs/no-labels': ['off'],
        // Off: duplicate of no-misleading-character-class.
        'sonarjs/no-misleading-character-class': ['off'],
        // Off: duplicate of no-nested-ternary.
        'sonarjs/no-nested-conditional': ['off'],
        // Off: duplicate of no-param-reassign.
        'sonarjs/no-parameter-reassignment': ['off'],
        // Off: duplicate of no-new-wrappers and @typescript-eslint/no-wrapper-object-types.
        'sonarjs/no-primitive-wrappers': ['off'],
        // Off: duplicate of @typescript-eslint/no-unnecessary-boolean-literal-compare.
        'sonarjs/no-redundant-boolean': ['off'],
        // Off: duplicate of no-regex-spaces.
        'sonarjs/no-regex-spaces': ['off'],
        // Off: duplicate of vitest/no-disabled-tests.
        'sonarjs/no-skipped-tests': ['off'],
        // Off: duplicate of curly.
        'sonarjs/no-unenclosed-multiline-block': ['off'],
        // Off: duplicate of no-new (which reports any `new` used for side effects).
        'sonarjs/no-unthrown-error': ['off'],
        // Off: duplicate of @typescript-eslint/no-unused-vars (which honours the `_` prefix).
        'sonarjs/no-unused-vars': ['off'],
        // Off: duplicate of @typescript-eslint/no-confusing-void-expression.
        'sonarjs/no-use-of-empty-return-value': ['off'],
        // Off: duplicate of no-useless-catch.
        'sonarjs/no-useless-catch': ['off'],
        // Off: duplicate of @typescript-eslint/prefer-regexp-exec.
        'sonarjs/prefer-regexp-exec': ['off'],
        // Off: duplicate of no-warning-comments.
        'sonarjs/todo-tag': ['off'],
        // Off: duplicate of @typescript-eslint/no-unused-vars.
        'sonarjs/unused-import': ['off'],
        // Off: duplicate of no-const-assign.
        'sonarjs/updated-const-var': ['off'],
      },
    },
  ];
}
