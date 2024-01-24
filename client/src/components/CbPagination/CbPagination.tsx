import { FC } from 'react';

import { Flex, Group, Pagination, Text } from '@mantine/core';

import { TablePageSizeForm } from '../TablePageSizeForm';

import { CbPaginationProps } from './CbPagination.types';

import { useTablePagination } from '@/hooks';

const CbPagination: FC<CbPaginationProps> = ({
  description,
  hasRetrievedData,
  onPageNumberChange,
  onPageSizeChange,
  pageSize,
  totalPages = 0,
  totalRecords = 0,
  value,
  ...otherProps
}) => {
  const { canPaginate } = useTablePagination({
    defaultPageSize: pageSize,
  });

  const isPaginationComponentVisible = canPaginate(pageSize, totalRecords);

  return (
    <>
      {hasRetrievedData && (
        <Flex direction="row" w="100%">
          <Group>
            <TablePageSizeForm
              defaultValues={{
                pageSize,
              }}
              onInputChange={onPageSizeChange}
            />
          </Group>

          <Group justify="right" w="100%">
            {description && (
              <Flex align="center" mb={!isPaginationComponentVisible ? 3 : undefined} mr={isPaginationComponentVisible ? 10 : undefined}>
                <Text size="sm">{description}</Text>
              </Flex>
            )}

            {isPaginationComponentVisible && (
              <Flex align="center">
                <Pagination
                  siblings={2}
                  size="sm"
                  total={totalPages}
                  value={value}
                  withEdges
                  onChange={onPageNumberChange}
                  {...otherProps}
                />
              </Flex>
            )}
          </Group>
        </Flex>
      )}
    </>
  );
};

export { CbPagination };
