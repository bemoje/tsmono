import type { ITaskOptions } from './ITaskOptions'

export type PromiseQueueTask<TaskResultType> =
  | ((options: ITaskOptions) => PromiseLike<TaskResultType>)
  | ((options: ITaskOptions) => TaskResultType)
