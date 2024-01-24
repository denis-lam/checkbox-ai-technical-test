import { z } from 'zod';

import { UseEnvironmentVariable } from './useEnvironmentVariables.types';

const useEnvironmentVariables = (): UseEnvironmentVariable => {
  // TODO: This could be improved
  const zodResolver = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string().min(10, {
      message: 'NEXT_PUBLIC_API_BASE_URL is required',
    }),
    NEXT_PUBLIC_API_ENDPOINT_PATH_GRAPHQL: z.string().min(7, {
      message: 'NEXT_PUBLIC_API_ENDPOINT_PATH_GRAPHQL is required',
    }),
    NEXT_PUBLIC_DATE_FORMAT: z.string().min(6, {
      message: 'NEXT_PUBLIC_DATE_FORMAT is required',
    }),
    NEXT_PUBLIC_DEFAULT_TABLE_PAGE_SIZE: z.number({
      required_error: 'NEXT_PUBLIC_DEFAULT_TABLE_PAGE_SIZE is required',
    }),
    NEXT_PUBLIC_MAX_TABLE_PAGE_SIZE: z.number({
      required_error: 'NEXT_PUBLIC_MAX_TABLE_PAGE_SIZE is required',
    }),
  });

  const parseEnvironmentVariable: UseEnvironmentVariable['parseEnvironmentVariable'] = ({ key, value }) => {
    return zodResolver.shape[key].parse(value);
  };

  return {
    parseEnvironmentVariable,
  };
};

export { useEnvironmentVariables };
