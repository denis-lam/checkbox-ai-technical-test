import './CbTable.css';

import { Flex, Group, Table } from '@mantine/core';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { flexRender } from '@tanstack/react-table';

import { CbTableProps } from './CbTable.types';

const CbTable = <T,>({
  hasRetrievedData,
  headerGroups,
  noRecordsMessage = 'No records',
  onRowClick,
  rowModel: { rows },
  ...otherTableProps
}: CbTableProps<T>) => {
  return (
    <Table h={0} striped="even" {...otherTableProps}>
      <Table.Thead>
        {hasRetrievedData &&
          headerGroups.map(({ headers, id: headerGroupId }) => (
            <Table.Tr key={headerGroupId}>
              {headers.map(
                ({
                  column: {
                    columnDef: { header, meta },
                    getCanSort,
                    getIsSorted,
                    getSize,
                    getToggleSortingHandler,
                  },
                  getContext,
                  id: headerId,
                  isPlaceholder,
                }) => {
                  const { align } = (meta ?? {}) as { align: 'center' | 'right' };

                  const canSort = getCanSort();
                  const isSorted = getIsSorted();
                  const sortArrow =
                    canSort || isSorted
                      ? {
                          asc: <IconArrowUp size={18} />,
                          desc: <IconArrowDown size={18} />,
                        }[isSorted as string] ?? null
                      : null;
                  const width = getSize();

                  return (
                    <Table.Th
                      key={headerId}
                      style={{
                        cursor: canSort ? 'pointer' : 'default',
                        width: width === 0 ? undefined : width,
                      }}
                      onClick={(event) => {
                        const toggleSortingHandler = getToggleSortingHandler();
                        toggleSortingHandler?.(event);
                      }}
                    >
                      {isPlaceholder ? null : (
                        <Group align="center" justify={align} wrap="nowrap">
                          <Flex align="center">{flexRender(header, getContext())}</Flex>
                          {sortArrow && <Flex align="center">{sortArrow}</Flex>}
                        </Group>
                      )}
                    </Table.Th>
                  );
                },
              )}
            </Table.Tr>
          ))}
      </Table.Thead>
      <Table.Tbody>
        {hasRetrievedData && !rows.length ? (
          <Table.Tr>
            <Table.Td colSpan={headerGroups[0].headers.length}>{noRecordsMessage}</Table.Td>
          </Table.Tr>
        ) : (
          rows.map(({ getVisibleCells, id: rowId, original }) => {
            return (
              <Table.Tr
                key={`row-${rowId}`}
                // className={onRowClick ? 'table-clickable-row' : undefined}
                onClick={() => {
                  if (!onRowClick) {
                    return;
                  }

                  onRowClick(original);
                }}
              >
                {getVisibleCells().map(
                  ({
                    column: {
                      columnDef: { cell, meta },
                    },
                    getContext,
                    id: cellId,
                  }) => {
                    const { align } = (meta ?? {}) as { align: 'center' | 'right' };

                    return (
                      <Table.Td key={cellId}>
                        <Group
                          align="center"
                          justify={align}
                          style={{
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {flexRender(cell, getContext())}
                        </Group>
                      </Table.Td>
                    );
                  },
                )}
              </Table.Tr>
            );
          })
        )}
      </Table.Tbody>
    </Table>
  );
};

export { CbTable };
