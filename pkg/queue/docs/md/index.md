@bemoje/queue

# @bemoje/queue

## Table of contents

### Classes

- [PriorityQueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md)
- [PromiseQueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)
- [Queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md)

### Interfaces

- [IPriorityQueueOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md)
- [IPromiseQueueOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md)
- [IQueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md)
- [IQueueAddOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md)
- [ITaskOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITaskOptions.md)
- [ITimeoutOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md)

### Type Aliases

- [PromiseQueueEvent](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md#promisequeueevent)
- [PromiseQueueTask](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md#promisequeuetask)

## Type Aliases

### PromiseQueueEvent

Ƭ **PromiseQueueEvent**: ``"active"`` \| ``"idle"`` \| ``"empty"`` \| ``"add"`` \| ``"next"`` \| ``"completed"`` \| ``"error"``

#### Defined in

pkg/queue/src/lib/types/PromiseQueueEvent.ts:1

___

### PromiseQueueTask

Ƭ **PromiseQueueTask**<`TaskResultType`\>: (`options`: [`ITaskOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITaskOptions.md)) => `PromiseLike`<`TaskResultType`\> \| (`options`: [`ITaskOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITaskOptions.md)) => `TaskResultType`

#### Type parameters

| Name |
| :------ |
| `TaskResultType` |

#### Defined in

pkg/queue/src/lib/types/PromiseQueueTask.ts:3
