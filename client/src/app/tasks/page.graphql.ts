import { DocumentNode, gql } from '@apollo/client';

const createTaskMutation: DocumentNode = gql`
  mutation createTask($data: TaskCreateInput!) {
    createOneTask(data: $data) {
      description
      dueAtUtc
      id
      name
    }
  }
`;

const retrieveTasksQuery: DocumentNode = gql`
  query retrieveTasks($orderBy: [TaskOrderByWithRelationInput!], $skip: Int, $take: Int, $where: TaskWhereInput) {
    aggregateTask(where: $where) {
      count: _count {
        total: _all
      }
    }
    tasks(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
      createdAtUtc
      description
      dueAtUtc
      id
      name
    }
  }
`;

export { createTaskMutation, retrieveTasksQuery };
