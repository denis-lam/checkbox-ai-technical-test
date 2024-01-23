/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
export const namedOperations = {
  Query: {
    retrieveTasks: 'retrieveTasks'
  },
  Mutation: {
    createTask: 'createTask'
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type AffectedRowsOutput = {
  __typename?: 'AffectedRowsOutput';
  count: Scalars['Int']['output'];
};

export type AggregateTask = {
  __typename?: 'AggregateTask';
  _count?: Maybe<TaskCountAggregate>;
  _max?: Maybe<TaskMaxAggregate>;
  _min?: Maybe<TaskMinAggregate>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTimeISO']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  in?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  lt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  lte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  in?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  lt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  lte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyTask: AffectedRowsOutput;
  createOneTask: Task;
  deleteManyTask: AffectedRowsOutput;
  deleteOneTask?: Maybe<Task>;
  updateManyTask: AffectedRowsOutput;
  updateOneTask?: Maybe<Task>;
  upsertOneTask: Task;
};


export type MutationCreateManyTaskArgs = {
  data: Array<TaskCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateOneTaskArgs = {
  data: TaskCreateInput;
};


export type MutationDeleteManyTaskArgs = {
  where?: InputMaybe<TaskWhereInput>;
};


export type MutationDeleteOneTaskArgs = {
  where: TaskWhereUniqueInput;
};


export type MutationUpdateManyTaskArgs = {
  data: TaskUpdateManyMutationInput;
  where?: InputMaybe<TaskWhereInput>;
};


export type MutationUpdateOneTaskArgs = {
  data: TaskUpdateInput;
  where: TaskWhereUniqueInput;
};


export type MutationUpsertOneTaskArgs = {
  create: TaskCreateInput;
  update: TaskUpdateInput;
  where: TaskWhereUniqueInput;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  in?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  lt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  lte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  gte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  in?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  lt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  lte?: InputMaybe<Scalars['DateTimeISO']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  aggregateTask: AggregateTask;
  findFirstTask?: Maybe<Task>;
  findFirstTaskOrThrow?: Maybe<Task>;
  getTask?: Maybe<Task>;
  groupByTask: Array<TaskGroupBy>;
  task?: Maybe<Task>;
  tasks: Array<Task>;
};


export type QueryAggregateTaskArgs = {
  cursor?: InputMaybe<TaskWhereUniqueInput>;
  orderBy?: InputMaybe<Array<TaskOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
};


export type QueryFindFirstTaskArgs = {
  cursor?: InputMaybe<TaskWhereUniqueInput>;
  distinct?: InputMaybe<Array<TaskScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TaskOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
};


export type QueryFindFirstTaskOrThrowArgs = {
  cursor?: InputMaybe<TaskWhereUniqueInput>;
  distinct?: InputMaybe<Array<TaskScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TaskOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
};


export type QueryGetTaskArgs = {
  where: TaskWhereUniqueInput;
};


export type QueryGroupByTaskArgs = {
  by: Array<TaskScalarFieldEnum>;
  having?: InputMaybe<TaskScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<TaskOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
};


export type QueryTaskArgs = {
  where: TaskWhereUniqueInput;
};


export type QueryTasksArgs = {
  cursor?: InputMaybe<TaskWhereUniqueInput>;
  distinct?: InputMaybe<Array<TaskScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TaskOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
};

export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive'
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Task = {
  __typename?: 'Task';
  createdAtUtc: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  dueAtUtc: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type TaskCountAggregate = {
  __typename?: 'TaskCountAggregate';
  _all: Scalars['Int']['output'];
  createdAtUtc: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  dueAtUtc: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type TaskCountOrderByAggregateInput = {
  createdAtUtc?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  dueAtUtc?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TaskCreateInput = {
  createdAtUtc?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description: Scalars['String']['input'];
  dueAtUtc: Scalars['DateTimeISO']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type TaskCreateManyInput = {
  createdAtUtc?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description: Scalars['String']['input'];
  dueAtUtc: Scalars['DateTimeISO']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type TaskGroupBy = {
  __typename?: 'TaskGroupBy';
  _count?: Maybe<TaskCountAggregate>;
  _max?: Maybe<TaskMaxAggregate>;
  _min?: Maybe<TaskMinAggregate>;
  createdAtUtc: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  dueAtUtc: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type TaskMaxAggregate = {
  __typename?: 'TaskMaxAggregate';
  createdAtUtc?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueAtUtc?: Maybe<Scalars['DateTimeISO']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TaskMaxOrderByAggregateInput = {
  createdAtUtc?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  dueAtUtc?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TaskMinAggregate = {
  __typename?: 'TaskMinAggregate';
  createdAtUtc?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueAtUtc?: Maybe<Scalars['DateTimeISO']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TaskMinOrderByAggregateInput = {
  createdAtUtc?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  dueAtUtc?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TaskOrderByWithAggregationInput = {
  _count?: InputMaybe<TaskCountOrderByAggregateInput>;
  _max?: InputMaybe<TaskMaxOrderByAggregateInput>;
  _min?: InputMaybe<TaskMinOrderByAggregateInput>;
  createdAtUtc?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  dueAtUtc?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TaskOrderByWithRelationInput = {
  createdAtUtc?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  dueAtUtc?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export enum TaskScalarFieldEnum {
  createdAtUtc = 'createdAtUtc',
  description = 'description',
  dueAtUtc = 'dueAtUtc',
  id = 'id',
  name = 'name'
}

export type TaskScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TaskScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TaskScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TaskScalarWhereWithAggregatesInput>>;
  createdAtUtc?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  dueAtUtc?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
};

export type TaskUpdateInput = {
  createdAtUtc?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  dueAtUtc?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TaskUpdateManyMutationInput = {
  createdAtUtc?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  dueAtUtc?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TaskWhereInput = {
  AND?: InputMaybe<Array<TaskWhereInput>>;
  NOT?: InputMaybe<Array<TaskWhereInput>>;
  OR?: InputMaybe<Array<TaskWhereInput>>;
  createdAtUtc?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  dueAtUtc?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type TaskWhereUniqueInput = {
  AND?: InputMaybe<Array<TaskWhereInput>>;
  NOT?: InputMaybe<Array<TaskWhereInput>>;
  OR?: InputMaybe<Array<TaskWhereInput>>;
  createdAtUtc?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  dueAtUtc?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringFilter>;
};

export type CreateTaskMutationVariables = Exact<{
  data: TaskCreateInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createOneTask: { __typename?: 'Task', description: string, dueAtUtc: any, id: string, name: string } };

export type RetrieveTasksQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<TaskOrderByWithRelationInput> | TaskOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
}>;


export type RetrieveTasksQuery = { __typename?: 'Query', aggregateTask: { __typename?: 'AggregateTask', count?: { __typename?: 'TaskCountAggregate', total: number } | null }, tasks: Array<{ __typename?: 'Task', createdAtUtc: any, description: string, dueAtUtc: any, id: string, name: string }> };


export const CreateTaskDocument = gql`
    mutation createTask($data: TaskCreateInput!) {
  createOneTask(data: $data) {
    description
    dueAtUtc
    id
    name
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const RetrieveTasksDocument = gql`
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

/**
 * __useRetrieveTasksQuery__
 *
 * To run a query within a React component, call `useRetrieveTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveTasksQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRetrieveTasksQuery(baseOptions?: Apollo.QueryHookOptions<RetrieveTasksQuery, RetrieveTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RetrieveTasksQuery, RetrieveTasksQueryVariables>(RetrieveTasksDocument, options);
      }
export function useRetrieveTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RetrieveTasksQuery, RetrieveTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RetrieveTasksQuery, RetrieveTasksQueryVariables>(RetrieveTasksDocument, options);
        }
export function useRetrieveTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RetrieveTasksQuery, RetrieveTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RetrieveTasksQuery, RetrieveTasksQueryVariables>(RetrieveTasksDocument, options);
        }
export type RetrieveTasksQueryHookResult = ReturnType<typeof useRetrieveTasksQuery>;
export type RetrieveTasksLazyQueryHookResult = ReturnType<typeof useRetrieveTasksLazyQuery>;
export type RetrieveTasksSuspenseQueryHookResult = ReturnType<typeof useRetrieveTasksSuspenseQuery>;
export type RetrieveTasksQueryResult = Apollo.QueryResult<RetrieveTasksQuery, RetrieveTasksQueryVariables>;