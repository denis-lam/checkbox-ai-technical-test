'use client';

import { useEffect, useRef, useState } from 'react';

import { Button, Flex, Stack } from '@mantine/core';
import { capitalCase } from 'change-case';

import { Task, TaskAction } from './page.types';

import { useRetrieveTasksLazyQuery } from '../../../types';
import { CbLoadingOverlay, CbModal } from '@/components';

const Page = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const [action, setAction] = useState<TaskAction>('create');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>();

  const [executeRetrieveTasksLazyQuery, { loading: isRetrieveTasksLoading }] = useRetrieveTasksLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ tasks: returnedTasks }) => {
      setTasks(returnedTasks);
    },
    onError: ({ message }) => {
      console.error(message);
    },
  });

  const handleCreateTaskButtonClick = () => {
    setAction('create');
    setIsTaskModalOpen(true);
  };

  const handleCreateTaskModalClose = () => {
    setIsTaskModalOpen(false);
  };

  useEffect(() => {
    executeRetrieveTasksLazyQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Stack h={450} w="100%" />
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
          height: `calc(100% - ${headerTopPosition}px)`,
          overflowY: 'scroll',
          position: 'fixed',
          top: headerTopPosition,
          width: '100%',
        })}
      >
        {tasks && (
          <>
            {tasks.length ? (
              <ul>
                {tasks?.map(({ description, id, name }) => {
                  return (
                    <li key={`task-${id}`}>
                      {name} - {description}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </>
        )}
      </Flex>
    </>
  );
};

export default Page;
