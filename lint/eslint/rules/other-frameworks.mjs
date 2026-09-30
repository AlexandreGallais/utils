// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Other frameworks: Rules for frameworks this stack does not use (React, Vue, jQuery, Cypress, Lodash, AWS CDK): kept listed so that a plugin update never enables them silently.
// Rules of SonarJS on this subject (the Sonar way profile of SonarQube), every rule listed.

import sonarjs from 'eslint-plugin-sonarjs';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Other frameworks rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function otherFrameworksBlock() {
  return [
    {
      name: 'rules/other-frameworks',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // Off: AWS CDK infrastructure code only; together they cost about 20 % of the lint time.
        'sonarjs/aws-apigateway-public-api': ['off'],
        'sonarjs/aws-ec2-rds-dms-public': ['off'],
        'sonarjs/aws-ec2-unencrypted-ebs-volume': ['off'],
        'sonarjs/aws-efs-unencrypted': ['off'],
        'sonarjs/aws-iam-all-privileges': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
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
        'sonarjs/hooks-before-test-cases': ['warn'],
        'sonarjs/chai-determinate-assertion': ['warn'],
        'sonarjs/jsx-no-leaked-render': ['error'],
        'sonarjs/no-debounce-throttle-in-render': ['error'],
        'sonarjs/no-hook-setter-in-body': ['error'],
        'sonarjs/no-mutate-reactive-state-in-updated-hook': ['error'],
        'sonarjs/no-uniq-key': ['warn'],
        'sonarjs/no-useless-react-setstate': ['error'],
        'sonarjs/no-vue-class-component': ['warn'],
        'sonarjs/no-vue-mixins': ['warn'],
        'sonarjs/prefer-cypress-should': ['warn'],
        'sonarjs/prefer-native-axios-alternative': ['warn'],
        'sonarjs/prefer-native-jquery-alternative': ['warn'],
        'sonarjs/prefer-native-lodash-alternative': ['warn'],
        'sonarjs/prefer-read-only-props': ['warn'],
        'sonarjs/review-blockchain-mnemonic': ['error'],
      },
    },
  ];
}
