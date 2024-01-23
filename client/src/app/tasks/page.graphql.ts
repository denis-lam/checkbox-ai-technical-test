import { DocumentNode, gql } from '@apollo/client';

const taskFragment: DocumentNode = gql`
  fragment taskFragment on Task {
    createdAtUtc
    description
    dueAtUtc
    id
    name
  }
`;

const createTaskMutation: DocumentNode = gql`
  ${taskFragment}

  mutation createTask($data: TaskCreateInput!) {
    createOneTask(data: $data) {
      ...taskFragment
    }
  }
`;

const retrieveTaskQuery: DocumentNode = gql`
  ${taskFragment}

  query retrieveTask($where: TaskWhereUniqueInput!) {
    getTask(where: $where) {
      ...taskFragment
    }
  }
`;

const retrieveTasksQuery: DocumentNode = gql`
  ${taskFragment}

  query retrieveTasks($orderBy: [TaskOrderByWithRelationInput!], $skip: Int, $take: Int, $where: TaskWhereInput) {
    aggregateTask(where: $where) {
      count: _count {
        total: _all
      }
    }
    tasks(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
      ...taskFragment
    }
  }
`;

const updateTaskMutation: DocumentNode = gql`
  ${taskFragment}

  mutation updateTask($data: TaskUpdateInput!, $where: TaskWhereUniqueInput!) {
    updateOneTask(data: $data, where: $where) {
      ...taskFragment
    }
  }
`;

export { createTaskMutation, retrieveTaskQuery, retrieveTasksQuery, updateTaskMutation };
