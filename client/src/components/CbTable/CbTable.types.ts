import { TableProps } from '@mantine/core';
import { HeaderGroup, RowModel } from '@tanstack/react-table';

export interface CbTableProps<T> extends Omit<TableProps, 'striped'> {
  hasRetrievedData: boolean;
  headerGroups: HeaderGroup<T>[];
  noRecordsMessage?: string;
  onRowClick?: (rowData: T) => void;
  rowModel: RowModel<T>;
}
