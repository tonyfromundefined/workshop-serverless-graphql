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
