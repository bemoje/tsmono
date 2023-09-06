import { ITaskOptions } from './ITaskOptions'
import { ITimeoutOptions } from './ITimeoutOptions'

export interface IQueueAddOptions extends ITaskOptions, ITimeoutOptions {
  /**
   * Priority of operation. Operations with greater priority will be scheduled first.
   * @default 0
   */
  readonly priority?: number
}
