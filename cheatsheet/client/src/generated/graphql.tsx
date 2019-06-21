export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IMutation = {
  ping: Scalars["String"];
  createTask: ITask;
  updateTask?: Maybe<ITask>;
  deleteTask?: Maybe<ITask>;
};

export type IMutationCreateTaskArgs = {
  data: ITaskCreateInput;
};

export type IMutationUpdateTaskArgs = {
  data: ITaskUpdateInput;
  where: ITaskWhereUniqueInput;
};

export type IMutationDeleteTaskArgs = {
  where: ITaskWhereUniqueInput;
};

export type IQuery = {
  stage: Scalars["String"];
  task?: Maybe<ITask>;
  tasks: Array<ITask>;
};

export type IQueryTaskArgs = {
  where: ITaskWhereUniqueInput;
};

export type IQueryTasksArgs = {
  where?: Maybe<ITaskWhereInput>;
  orderBy?: Maybe<ITaskOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type ITask = {
  id: Scalars["ID"];
  content: Scalars["String"];
  isDone: Scalars["Boolean"];
};

export type ITaskCreateInput = {
  id?: Maybe<Scalars["ID"]>;
  content: Scalars["String"];
  isDone: Scalars["Boolean"];
};

export enum ITaskOrderByInput {
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  ContentAsc = "content_ASC",
  ContentDesc = "content_DESC",
  IsDoneAsc = "isDone_ASC",
  IsDoneDesc = "isDone_DESC",
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC",
  UpdatedAtAsc = "updatedAt_ASC",
  UpdatedAtDesc = "updatedAt_DESC"
}

export type ITaskUpdateInput = {
  content?: Maybe<Scalars["String"]>;
  isDone?: Maybe<Scalars["Boolean"]>;
};

export type ITaskWhereInput = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_contains?: Maybe<Scalars["ID"]>;
  id_not_contains?: Maybe<Scalars["ID"]>;
  id_starts_with?: Maybe<Scalars["ID"]>;
  id_not_starts_with?: Maybe<Scalars["ID"]>;
  id_ends_with?: Maybe<Scalars["ID"]>;
  id_not_ends_with?: Maybe<Scalars["ID"]>;
  content?: Maybe<Scalars["String"]>;
  content_not?: Maybe<Scalars["String"]>;
  content_in?: Maybe<Array<Scalars["String"]>>;
  content_not_in?: Maybe<Array<Scalars["String"]>>;
  content_lt?: Maybe<Scalars["String"]>;
  content_lte?: Maybe<Scalars["String"]>;
  content_gt?: Maybe<Scalars["String"]>;
  content_gte?: Maybe<Scalars["String"]>;
  content_contains?: Maybe<Scalars["String"]>;
  content_not_contains?: Maybe<Scalars["String"]>;
  content_starts_with?: Maybe<Scalars["String"]>;
  content_not_starts_with?: Maybe<Scalars["String"]>;
  content_ends_with?: Maybe<Scalars["String"]>;
  content_not_ends_with?: Maybe<Scalars["String"]>;
  isDone?: Maybe<Scalars["Boolean"]>;
  isDone_not?: Maybe<Scalars["Boolean"]>;
  AND?: Maybe<Array<ITaskWhereInput>>;
  OR?: Maybe<Array<ITaskWhereInput>>;
  NOT?: Maybe<Array<ITaskWhereInput>>;
};

export type ITaskWhereUniqueInput = {
  id?: Maybe<Scalars["ID"]>;
};
export type ICreateTaskMutationVariables = {
  data: ITaskCreateInput;
};

export type ICreateTaskMutation = { __typename?: "Mutation" } & {
  createTask: { __typename?: "Task" } & Pick<ITask, "id">;
};

export type IDeleteTaskMutationVariables = {
  where: ITaskWhereUniqueInput;
};

export type IDeleteTaskMutation = { __typename?: "Mutation" } & {
  deleteTask: Maybe<{ __typename?: "Task" } & Pick<ITask, "id">>;
};

export type IGetTasksQueryVariables = {};

export type IGetTasksQuery = { __typename?: "Query" } & {
  tasks: Array<
    { __typename?: "Task" } & Pick<ITask, "id" | "content" | "isDone">
  >;
};

export type IUpdateTaskMutationVariables = {
  data: ITaskUpdateInput;
  where: ITaskWhereUniqueInput;
};

export type IUpdateTaskMutation = { __typename?: "Mutation" } & {
  updateTask: Maybe<{ __typename?: "Task" } & Pick<ITask, "id">>;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CreateTaskDocument = gql`
  mutation createTask($data: TaskCreateInput!) {
    createTask(data: $data) {
      id
    }
  }
`;
export type ICreateTaskMutationFn = ReactApollo.MutationFn<
  ICreateTaskMutation,
  ICreateTaskMutationVariables
>;

export const CreateTaskComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        ICreateTaskMutation,
        ICreateTaskMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: ICreateTaskMutationVariables }
) => (
  <ReactApollo.Mutation<ICreateTaskMutation, ICreateTaskMutationVariables>
    mutation={CreateTaskDocument}
    {...props}
  />
);

export type ICreateTaskProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ICreateTaskMutation, ICreateTaskMutationVariables>
> &
  TChildProps;
export function withCreateTask<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ICreateTaskMutation,
    ICreateTaskMutationVariables,
    ICreateTaskProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ICreateTaskMutation,
    ICreateTaskMutationVariables,
    ICreateTaskProps<TChildProps>
  >(CreateTaskDocument, {
    alias: "withCreateTask",
    ...operationOptions
  });
}

export function useCreateTaskMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ICreateTaskMutation,
    ICreateTaskMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ICreateTaskMutation,
    ICreateTaskMutationVariables
  >(CreateTaskDocument, baseOptions);
}
export const DeleteTaskDocument = gql`
  mutation deleteTask($where: TaskWhereUniqueInput!) {
    deleteTask(where: $where) {
      id
    }
  }
`;
export type IDeleteTaskMutationFn = ReactApollo.MutationFn<
  IDeleteTaskMutation,
  IDeleteTaskMutationVariables
>;

export const DeleteTaskComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        IDeleteTaskMutation,
        IDeleteTaskMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: IDeleteTaskMutationVariables }
) => (
  <ReactApollo.Mutation<IDeleteTaskMutation, IDeleteTaskMutationVariables>
    mutation={DeleteTaskDocument}
    {...props}
  />
);

export type IDeleteTaskProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<IDeleteTaskMutation, IDeleteTaskMutationVariables>
> &
  TChildProps;
export function withDeleteTask<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IDeleteTaskMutation,
    IDeleteTaskMutationVariables,
    IDeleteTaskProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    IDeleteTaskMutation,
    IDeleteTaskMutationVariables,
    IDeleteTaskProps<TChildProps>
  >(DeleteTaskDocument, {
    alias: "withDeleteTask",
    ...operationOptions
  });
}

export function useDeleteTaskMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    IDeleteTaskMutation,
    IDeleteTaskMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    IDeleteTaskMutation,
    IDeleteTaskMutationVariables
  >(DeleteTaskDocument, baseOptions);
}
export const GetTasksDocument = gql`
  query getTasks {
    tasks {
      id
      content
      isDone
    }
  }
`;

export const GetTasksComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<IGetTasksQuery, IGetTasksQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables?: IGetTasksQueryVariables }
) => (
  <ReactApollo.Query<IGetTasksQuery, IGetTasksQueryVariables>
    query={GetTasksDocument}
    {...props}
  />
);

export type IGetTasksProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IGetTasksQuery, IGetTasksQueryVariables>
> &
  TChildProps;
export function withGetTasks<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IGetTasksQuery,
    IGetTasksQueryVariables,
    IGetTasksProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IGetTasksQuery,
    IGetTasksQueryVariables,
    IGetTasksProps<TChildProps>
  >(GetTasksDocument, {
    alias: "withGetTasks",
    ...operationOptions
  });
}

export function useGetTasksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IGetTasksQueryVariables>
) {
  return ReactApolloHooks.useQuery<IGetTasksQuery, IGetTasksQueryVariables>(
    GetTasksDocument,
    baseOptions
  );
}
export const UpdateTaskDocument = gql`
  mutation updateTask($data: TaskUpdateInput!, $where: TaskWhereUniqueInput!) {
    updateTask(data: $data, where: $where) {
      id
    }
  }
`;
export type IUpdateTaskMutationFn = ReactApollo.MutationFn<
  IUpdateTaskMutation,
  IUpdateTaskMutationVariables
>;

export const UpdateTaskComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        IUpdateTaskMutation,
        IUpdateTaskMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: IUpdateTaskMutationVariables }
) => (
  <ReactApollo.Mutation<IUpdateTaskMutation, IUpdateTaskMutationVariables>
    mutation={UpdateTaskDocument}
    {...props}
  />
);

export type IUpdateTaskProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<IUpdateTaskMutation, IUpdateTaskMutationVariables>
> &
  TChildProps;
export function withUpdateTask<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IUpdateTaskMutation,
    IUpdateTaskMutationVariables,
    IUpdateTaskProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    IUpdateTaskMutation,
    IUpdateTaskMutationVariables,
    IUpdateTaskProps<TChildProps>
  >(UpdateTaskDocument, {
    alias: "withUpdateTask",
    ...operationOptions
  });
}

export function useUpdateTaskMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    IUpdateTaskMutation,
    IUpdateTaskMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    IUpdateTaskMutation,
    IUpdateTaskMutationVariables
  >(UpdateTaskDocument, baseOptions);
}
