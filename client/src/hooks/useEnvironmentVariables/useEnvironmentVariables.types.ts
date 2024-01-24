export type EnvironmentVariableNames =
  | 'NEXT_PUBLIC_API_BASE_URL'
  | 'NEXT_PUBLIC_API_ENDPOINT_PATH_GRAPHQL'
  | 'NEXT_PUBLIC_DATE_FORMAT'
  | 'NEXT_PUBLIC_DEFAULT_TABLE_PAGE_SIZE'
  | 'NEXT_PUBLIC_MAX_TABLE_PAGE_SIZE';

export interface UseEnvironmentVariable {
  parseEnvironmentVariable: ({ key, value }: { key: EnvironmentVariableNames; value: unknown }) => string | number;
}
