/* eslint-disable import/no-default-export */
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: ['./src/app/**/*.graphql.ts'],
  generates: {
    'types/index.ts': {
      config: {
        namingConvention: {
          enumValues: 'keep',
        },
      },
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'named-operations-object',
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  ignoreNoDocuments: true,
  overwrite: true,
  schema: 'http://localhost:3100/graphql',
};

export default config;
