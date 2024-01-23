'use client';

import { useEffect, useState } from 'react';

import { Flex } from '@mantine/core';

import { Task } from './page.types';

import { useRetrieveTasksLazyQuery } from '../../../types';

const Page = () => {
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

  useEffect(() => {
    executeRetrieveTasksLazyQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isRetrieveTasksLoading && <div>Retrieving tasks, please wait...</div>}

      <Flex p="lg">
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
