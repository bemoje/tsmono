[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md) / PriorityQueue

# Class: PriorityQueue

A class representing a priority queue for async functions.

## Implements

- [`IQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md)<() => `Promise`<`unknown`\>, [`IPriorityQueueOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md)\>

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md#constructor)

### Properties

- [queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md#queue)

### Accessors

- [size](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md#size)

### Methods

- [dequeue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md#dequeue)
- [enqueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md#enqueue)
- [filter](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md#filter)

## Constructors

### constructor

• **new PriorityQueue**()

## Properties

### queue

• `Protected` `Readonly` **queue**: [`IPriorityQueueOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md) & { `run`: () => `Promise`<`unknown`\>  }[] = `[]`

Queue of functions to run

#### Defined in

[pkg/queue/src/lib/PriorityQueue.ts:12](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PriorityQueue.ts#L12)

## Accessors

### size

• `get` **size**(): `number`

Get the number of functions in the queue

#### Returns

`number`

#### Implementation of

[IQueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md).[size](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md#size)

#### Defined in

[pkg/queue/src/lib/PriorityQueue.ts:17](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PriorityQueue.ts#L17)

## Methods

### dequeue

▸ **dequeue**(): `undefined` \| () => `Promise`<`unknown`\>

Remove a function from the queue

#### Returns

`undefined` \| () => `Promise`<`unknown`\>

#### Implementation of

[IQueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md).[dequeue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md#dequeue)

#### Defined in

[pkg/queue/src/lib/PriorityQueue.ts:50](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PriorityQueue.ts#L50)

___

### enqueue

▸ **enqueue**(`run`, `options?`): `void`

Add a function to the queue

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `run` | () => `Promise`<`unknown`\> | Function to run |
| `options?` | `Partial`<[`IPriorityQueueOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md)\> | Options for the queue |

#### Returns

`void`

#### Implementation of

[IQueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md).[enqueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md#enqueue)

#### Defined in

[pkg/queue/src/lib/PriorityQueue.ts:26](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PriorityQueue.ts#L26)

___

### filter

▸ **filter**(`options`): () => `Promise`<`unknown`\>[]

Get the functions with the given priority.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Readonly`<`Partial`<[`IPriorityQueueOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md)\>\> | Options for the queue |

#### Returns

() => `Promise`<`unknown`\>[]

#### Implementation of

[IQueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md).[filter](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md#filter)

#### Defined in

[pkg/queue/src/lib/PriorityQueue.ts:59](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PriorityQueue.ts#L59)
