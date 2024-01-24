import isNil from 'lodash.isnil';
import pluralize from 'pluralize';

import { useEnvironmentVariables } from '../useEnvironmentVariables';

import { UseTablePagination, UseTablePaginationOptions } from './useTablePagination.types';

const useTablePagination = (options: UseTablePaginationOptions): UseTablePagination => {
  const { defaultPageSize } = options ?? {};

  const { parseEnvironmentVariable } = useEnvironmentVariables();

  const calculatePageNumber: UseTablePagination['calculatePageNumber'] = (pageNumber, totalPages = 1) => {
    const castedPageNumber = Number(pageNumber);

    if (!Number.isInteger(castedPageNumber)) {
      return 1;
    }

    if (castedPageNumber < 0) {
      return 1;
    }

    if (castedPageNumber > totalPages) {
      return totalPages;
    }

    return castedPageNumber;
  };

  const calculateRecordsToSkip: UseTablePagination['calculateRecordsToSkip'] = (pageNumber, pageSize) => {
    return pageNumber === 0 || pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize;
  };

  const calculateTotalPages: UseTablePagination['calculateTotalPages'] = (pageSize, totalRecords) => {
    const minimumPages = Math.floor(totalRecords / pageSize);
    const remainder = totalRecords % pageSize;

    return remainder === 0 ? minimumPages : minimumPages + 1;
  };

  const canPaginate: UseTablePagination['canPaginate'] = (pageSize, totalRecords) => {
    if (!totalRecords) {
      return false;
    }

    return pageSize < totalRecords;
  };

  const generatePaginationResultsDescription: UseTablePagination['generatePaginationResultsDescription'] = ({
    pageNumber,
    pageSize,
    recordNumber = 0,
    totalRecords = 0,
  }) => {
    if (!totalRecords) {
      return undefined;
    }

    const maxPaginationEnd = pageSize * (pageNumber === 0 ? 1 : pageNumber);
    const paginationEnd = maxPaginationEnd > totalRecords ? totalRecords : maxPaginationEnd;
    const paginationStart = isNil(recordNumber) ? 1 : recordNumber + 1;

    return `Showing ${paginationStart}-${paginationEnd} of ${totalRecords} ${pluralize('record', totalRecords)}`;
  };

  const getInitialPageSize: UseTablePagination['getInitialPageSize'] = (value) => {
    const castedPageSize = Number(value);

    if (!Number.isInteger(castedPageSize) || !castedPageSize) {
      return defaultPageSize;
    }

    const maxPageSize = getMaxPageSize();

    if (castedPageSize > maxPageSize) {
      return maxPageSize;
    }

    return castedPageSize;
  };

  const getMaxPageSize: UseTablePagination['getMaxPageSize'] = () => {
    return Number(
      parseEnvironmentVariable({
        key: 'NEXT_PUBLIC_MAX_TABLE_PAGE_SIZE',
        value: Number(process.env.NEXT_PUBLIC_MAX_TABLE_PAGE_SIZE),
      }),
    );
  };

  return {
    calculatePageNumber,
    calculateRecordsToSkip,
    calculateTotalPages,
    canPaginate,
    generatePaginationResultsDescription,
    getInitialPageSize,
    getMaxPageSize,
  };
};

export { useTablePagination };
