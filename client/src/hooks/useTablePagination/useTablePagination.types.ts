export interface UseTablePagination {
  calculatePageNumber: (pageNumber: number | string | null, totalPages?: number) => number;
  calculateRecordsToSkip: (pageNumber: number, pageSize: number) => number | undefined;
  calculateTotalPages: (pageSize: number, totalRecords: number) => number;
  canPaginate: (pageSize: number, totalRecords: number) => boolean;
  generatePaginationResultsDescription: ({
    pageNumber,
    pageSize,
    recordNumber,
    totalRecords,
  }: {
    pageNumber: number;
    pageSize: number;
    recordNumber?: number;
    totalRecords?: number;
  }) => string | undefined;
  getInitialPageSize: (value: number | string | null) => number;
}

export interface UseTablePaginationOptions {
  defaultPageSize: number;
}
