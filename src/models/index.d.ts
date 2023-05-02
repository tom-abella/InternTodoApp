import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerCompletedTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CompletedTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Task?: string | null;
  readonly Deadline?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCompletedTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CompletedTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Task?: string | null;
  readonly Deadline?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CompletedTask = LazyLoading extends LazyLoadingDisabled ? EagerCompletedTask : LazyCompletedTask

export declare const CompletedTask: (new (init: ModelInit<CompletedTask>) => CompletedTask) & {
  copyOf(source: CompletedTask, mutator: (draft: MutableModel<CompletedTask>) => MutableModel<CompletedTask> | void): CompletedTask;
}

type EagerTodoTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TodoTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Task?: string | null;
  readonly Deadline?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodoTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TodoTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Task?: string | null;
  readonly Deadline?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TodoTask = LazyLoading extends LazyLoadingDisabled ? EagerTodoTask : LazyTodoTask

export declare const TodoTask: (new (init: ModelInit<TodoTask>) => TodoTask) & {
  copyOf(source: TodoTask, mutator: (draft: MutableModel<TodoTask>) => MutableModel<TodoTask> | void): TodoTask;
}