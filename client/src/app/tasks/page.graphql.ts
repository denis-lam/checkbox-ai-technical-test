import { DocumentNode, gql } from '@apollo/client';

const retrieveTasksQuery: DocumentNode = gql`
  query retrieveTasks($orderBy: [TaskOrderByWithRelationInput!], $skip: Int, $take: Int, $where: TaskWhereInput) {
    tasks(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
      createdAtUtc
      description
      dueAtUtc
      id
      name
    }
  }
`;

export { retrieveTasksQuery };
