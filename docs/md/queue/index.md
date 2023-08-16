@bemoje/queue

# @bemoje/queue

## Table of contents

### Classes

- [PriorityQueue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/classes/PriorityQueue.md)
- [PromiseQueue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/classes/PromiseQueue.md)
- [Queue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/classes/Queue.md)

### Interfaces

- [IPriorityQueueOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IPriorityQueueOptions.md)
- [IPromiseQueueOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IPromiseQueueOptions.md)
- [IQueue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueue.md)
- [IQueueAddOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueueAddOptions.md)
- [ITaskOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md)
- [ITimeoutOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md)

### Type Aliases

- [PromiseQueueEvent](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/index.md#promisequeueevent)
- [PromiseQueueTask](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/index.md#promisequeuetask)

## Type Aliases

### PromiseQueueEvent

Ƭ **PromiseQueueEvent**: ``"active"`` \| ``"idle"`` \| ``"empty"`` \| ``"add"`` \| ``"next"`` \| ``"completed"`` \| ``"error"``

#### Defined in

[pkg/queue/src/lib/types/PromiseQueueEvent.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/PromiseQueueEvent.ts#L1)

___

### PromiseQueueTask

Ƭ **PromiseQueueTask**<`TaskResultType`\>: (`options`: [`ITaskOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md)) => `PromiseLike`<`TaskResultType`\> \| (`options`: [`ITaskOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md)) => `TaskResultType`

#### Type parameters

| Name |
| :------ |
| `TaskResultType` |

#### Defined in

[pkg/queue/src/lib/types/PromiseQueueTask.ts:3](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/PromiseQueueTask.ts#L3)
