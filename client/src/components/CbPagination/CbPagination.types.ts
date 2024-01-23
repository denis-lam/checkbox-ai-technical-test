import { PaginationProps } from '@mantine/core';

import { CbTableProps } from '../CbTable';

export interface CbPaginationProps extends Omit<PaginationProps, 'onChange' | 'total'>, Pick<CbTableProps<object>, 'hasRetrievedData'> {
  description: string | undefined;
  onPageNumberChange: PaginationProps['onChange'];
  onPageSizeChange: (value: number) => void;
  pageSize: number;
  totalPages?: number;
  totalRecords?: number;
}
