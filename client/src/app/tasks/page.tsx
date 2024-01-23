'use client';

import { useEffect, useRef, useState } from 'react';

import { Badge, Button, Flex, Stack } from '@mantine/core';
import { createId } from '@paralleldrive/cuid2';
import { SortingState, Updater, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { capitalCase, sentenceCase } from 'change-case';
import dayjs from 'dayjs';
import compact from 'lodash.compact';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TASK_STATUS_TO_MANTINE_COLOR_MAP } from './page.constants';
import { Task, TaskAction, TaskStatus } from './page.types';

import { useCreateTaskMutation, useRetrieveTasksLazyQuery } from '../../../types';
import { CbLoader, CbLoadingOverlay, CbModal, CbPagination, CbTable, ErrorAlert, TaskForm } from '@/components';
import { useTablePagination } from '@/hooks';

const Page = () => {
  const route = usePathname();
  const searchParams = useSearchParams();

  const footerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { push } = useRouter();
  const {
    calculatePageNumber,
    calculateRecordsToSkip,
    calculateTotalPages,
    canPaginate,
    generatePaginationResultsDescription,
    getInitialPageSize,
  } = useTablePagination({
    defaultPageSize: Number(process.env.NEXT_PUBLIC_DEFAULT_TABLE_PAGE_SIZE),
  });

  const [action, setAction] = useState<TaskAction>('create');
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(calculatePageNumber(searchParams.get('pageNumber')));
  const [currentPageSize, setCurrentPageSize] = useState<number>(getInitialPageSize(searchParams.get('pageSize')));
  const [errorMessage, setErrorMessage] = useState<string>();
  const [hasRetrievedData, setHasRetrievedData] = useState<boolean>(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [sortingState, setSortingState] = useState<SortingState>([
    {
      desc: false,
      id: 'dueAtUtc',
    },
  ]);
  const [tasks, setTasks] = useState<Task[]>();
  const [totalPages, setTotalPages] = useState<number>();
  const [totalRecords, setTotalRecords] = useState<number>();

  const [executeCreateTaskMutation, { loading: isCreateTaskLoading }] = useCreateTaskMutation({
    onCompleted: () => {
      refetchTasks();
      setIsTaskModalOpen(false);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const [executeRetrieveTasksLazyQuery, { loading: isRetrieveTasksLoading, refetch: refetchTasks }] = useRetrieveTasksLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ aggregateTask: { count }, tasks: returnedTasks }) => {
      const { total: totalCount = 0 } = count ?? {};

      const calculatedTotalPages = calculateTotalPages(currentPageSize, totalCount);

      setHasRetrievedData(true);

      setTasks(
        returnedTasks.map((task) => {
          return {
            ...task,
            status: determineTaskStatus(task.dueAtUtc),
          };
        }),
      );

      setTotalPages(calculatedTotalPages);
      setTotalRecords(totalCount);

      const pageNumber = canPaginate(currentPageSize, totalCount)
        ? calculatePageNumber(currentPageNumber, calculatedTotalPages)
        : undefined;

      const querystringParams = compact([pageNumber ? `pageNumber=${pageNumber}` : undefined, `pageSize=${currentPageSize}`]);

      push(`${route}?${querystringParams.join('&')}`);
    },
    onError: ({ message }) => {
      console.error(message);
    },
  });

  const determineTaskStatus = (dueDate: string): TaskStatus => {
    const DAYS_TIL_DUE_SOON_STATUS = 7;

    const currentDateUtc = dayjs().startOf('day');
    const dueDateUtc = dayjs(dueDate).startOf('day');

    if (currentDateUtc > dueDateUtc) {
      return 'Overdue';
    }

    const dayDiff = Math.abs(currentDateUtc.diff(dueDateUtc, 'day'));

    if (dayDiff >= 0 && dayDiff <= DAYS_TIL_DUE_SOON_STATUS) {
      return 'DueSoon';
    }

    return 'NotUrgent';
  };

  const getTableColumns = (pageSize: number, records: number | undefined) => {
    const columnHelper = createColumnHelper<Task>();
    const isSortingEnabled = pageSize > 1 && (records ? records > 1 : false);

    return [
      columnHelper.accessor('name', {
        cell: ({ getValue }) => getValue(),
        enableSorting: false,
        header: 'Name',
        size: 200,
        sortDescFirst: false,
      }),
      columnHelper.accessor('description', {
        cell: ({ getValue }) => getValue() ?? '-',
        enableSorting: false,
        header: 'Description',
        size: 200,
      }),
      columnHelper.accessor('status', {
        cell: ({ getValue }) => {
          const status = getValue();

          return <Badge color={TASK_STATUS_TO_MANTINE_COLOR_MAP[status]}>{sentenceCase(status)}</Badge>;
        },
        enableSorting: false,
        header: 'Status',
        meta: {
          align: 'center',
        },
        size: 120,
        sortDescFirst: false,
      }),
      columnHelper.accessor('dueAtUtc', {
        cell: ({ getValue }) => dayjs(getValue()).toDate().toLocaleDateString(),
        enableSorting: isSortingEnabled,
        header: 'Due date',
        size: 150,
        sortDescFirst: false,
      }),
      columnHelper.accessor('createdAtUtc', {
        cell: ({ getValue }) => dayjs(getValue()).toDate().toLocaleDateString(),
        enableSorting: isSortingEnabled,
        header: 'Created date',
        size: 150,
        sortDescFirst: false,
      }),
    ];
  };

  const handleCreateTaskButtonClick = () => {
    setAction('create');
    setIsTaskModalOpen(true);
  };

  const handleCreateTaskModalClose = () => {
    setIsTaskModalOpen(false);
  };

  const handlePageNumberChange = (number: number) => {
    setCurrentPageNumber(number);
  };

  const handlePageSizeChange = (number: number) => {
    setCurrentPageNumber(1);
    setCurrentPageSize(number);
  };

  const handleSortColumnChange = (sortingState: Updater<SortingState>) => {
    setSortingState(sortingState);
  };

  const handleTaskRowClick = (id: Task['id']) => {
    console.log({ id });
    setAction('update');
  };

  const { getHeaderGroups, getRowModel } = useReactTable<Task>({
    columns: getTableColumns(currentPageSize, totalRecords),
    data: tasks ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange: handleSortColumnChange,
    state: {
      sorting: sortingState,
    },
  });

  const [firstSortingState] = sortingState;
  const { desc: isDescendingSort, id: sortField } = firstSortingState ?? {};

  useEffect(() => {
    executeRetrieveTasksLazyQuery({
      variables: {
        orderBy: sortField
          ? {
              [sortField]: isDescendingSort ? 'desc' : 'asc',
            }
          : undefined,
        skip: calculateRecordsToSkip(currentPageNumber, currentPageSize),
        take: currentPageSize,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageNumber, currentPageSize, isDescendingSort, sortField]);

  const footerHeight = footerRef.current?.clientHeight ?? 0;
  const headerTopPosition = (headerRef.current?.clientHeight ?? 0) + 1;

  return (
    <>
      {isRetrieveTasksLoading && <CbLoadingOverlay message="Retrieving tasks, please wait..." />}

      <CbModal
        opened={isTaskModalOpen}
        size={650}
        title={`${capitalCase(action)} task`}
        closeOnClickOutside
        withCloseButton
        onClose={handleCreateTaskModalClose}
      >
        <Stack h={450} w="100%">
          {isCreateTaskLoading ? (
            <Stack align="center" h="100%" justify="center">
              <CbLoader message="Saving task, please wait..." />
            </Stack>
          ) : (
            <Stack h="100%" justify="flex-start">
              <TaskForm
                defaultValues={{
                  description: undefined,
                  name: undefined,
                  dueAtUtc: undefined,
                }}
                onSubmit={({ description, dueAtUtc, name }) => {
                  executeCreateTaskMutation({
                    variables: {
                      data: {
                        description,
                        dueAtUtc: dayjs(dueAtUtc).toISOString(),
                        id: createId(),
                        name,
                      },
                    },
                  });
                }}
              />

              {errorMessage && (
                <ErrorAlert mt="lg" w="100%">
                  {errorMessage}
                </ErrorAlert>
              )}
            </Stack>
          )}
        </Stack>
      </CbModal>

      <Flex
        ref={headerRef}
        direction="row"
        gap="lg"
        justify="flex-end"
        p="lg"
        style={({ colors }) => ({
          backgroundColor: colors.gray[1],
          borderBottom: `1px solid ${colors.gray[3]}`,
          position: 'fixed',
          top: 0,
          width: '100%',
        })}
      >
        <Button type="button" onClick={handleCreateTaskButtonClick}>
          Create task
        </Button>
      </Flex>

      <Flex
        p="lg"
        style={() => ({
          height: `calc(100% - (${headerTopPosition}px + ${footerHeight}px))`,
          overflowY: 'scroll',
          position: 'fixed',
          top: headerTopPosition,
          width: '100%',
        })}
      >
        <CbTable<Task>
          hasRetrievedData={hasRetrievedData}
          headerGroups={getHeaderGroups()}
          rowModel={getRowModel()}
          onRowClick={({ id }) => handleTaskRowClick(id)}
        />
      </Flex>

      <Flex
        ref={footerRef}
        p="lg"
        style={({ colors }) => ({
          backgroundColor: colors.gray[1],
          borderTop: `1px solid ${colors.gray[3]}`,
          bottom: 0,
          position: 'fixed',
          width: '100%',
        })}
      >
        <CbPagination
          description={generatePaginationResultsDescription({
            pageNumber: currentPageNumber,
            pageSize: currentPageSize,
            recordNumber: calculateRecordsToSkip(currentPageNumber, currentPageSize),
            totalRecords,
          })}
          hasRetrievedData={hasRetrievedData}
          pageSize={currentPageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          value={currentPageNumber}
          onPageNumberChange={handlePageNumberChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Flex>
    </>
  );
};

export default Page;
