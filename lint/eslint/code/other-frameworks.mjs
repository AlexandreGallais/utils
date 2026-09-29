// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Other frameworks: Rules for frameworks this stack does not use (React, Vue, jQuery, Cypress, Lodash, AWS CDK): kept listed so that a plugin update never enables them silently.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Other frameworks rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function otherFrameworksBlock() {
  return [
    {
      name: 'code/other-frameworks',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- SonarJS ----
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
        // Off: duplicate of vitest/prefer-hooks-on-top.
        'sonarjs/hooks-before-test-cases': ['off'],
        'sonarjs/chai-determinate-assertion': ['error'],
        'sonarjs/jsx-no-leaked-render': ['error'],
        'sonarjs/no-debounce-throttle-in-render': ['error'],
        'sonarjs/no-hook-setter-in-body': ['error'],
        'sonarjs/no-mutate-reactive-state-in-updated-hook': ['error'],
        'sonarjs/no-uniq-key': ['error'],
        'sonarjs/no-useless-react-setstate': ['error'],
        'sonarjs/no-vue-class-component': ['error'],
        'sonarjs/no-vue-mixins': ['error'],
        'sonarjs/prefer-cypress-should': ['error'],
        'sonarjs/prefer-native-axios-alternative': ['error'],
        'sonarjs/prefer-native-jquery-alternative': ['error'],
        'sonarjs/prefer-native-lodash-alternative': ['error'],
        'sonarjs/prefer-read-only-props': ['error'],
        'sonarjs/review-blockchain-mnemonic': ['error'],
        // ---- Unicorn ----
        'unicorn/consistent-optional-chaining': ['error'],
        'unicorn/no-chained-comparison': ['error'],
        'unicorn/no-optional-chaining-on-undeclared-variable': ['error'],
        'unicorn/require-frontmatter-fields': ['off'],
      },
    },
  ];
}
