'use client';

import { useEffect, useRef, useState } from 'react';

import { Button, Flex } from '@mantine/core';

import { Task } from './page.types';

import { useRetrieveTasksLazyQuery } from '../../../types';

const Page = () => {
  const headerRef = useRef<HTMLDivElement>(null);

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
    console.log('Create task');
  };

  useEffect(() => {
    executeRetrieveTasksLazyQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerTopPosition = (headerRef.current?.clientHeight ?? 0) + 1;

  return (
    <>
      {isRetrieveTasksLoading && <div>Retrieving tasks, please wait...</div>}

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
