[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md) / IQueue

# Interface: IQueue<Element, Options\>

## Type parameters

| Name |
| :------ |
| `Element` |
| `Options` |

## Implemented by

- [`PriorityQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md)

## Table of contents

### Properties

- [dequeue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md#dequeue)
- [enqueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md#enqueue)
- [filter](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md#filter)
- [size](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md#size)

## Properties

### dequeue

• **dequeue**: () => `undefined` \| `Element`

#### Type declaration

▸ (): `undefined` \| `Element`

##### Returns

`undefined` \| `Element`

#### Defined in

[pkg/queue/src/lib/types/IQueue.ts:4](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IQueue.ts#L4)

___

### enqueue

• **enqueue**: (`run`: `Element`, `options?`: `Partial`<`Options`\>) => `void`

#### Type declaration

▸ (`run`, `options?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `run` | `Element` |
| `options?` | `Partial`<`Options`\> |

##### Returns

`void`

#### Defined in

[pkg/queue/src/lib/types/IQueue.ts:5](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IQueue.ts#L5)

___

### filter

• **filter**: (`options`: `Partial`<`Options`\>) => `Element`[]

#### Type declaration

▸ (`options`): `Element`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`<`Options`\> |

##### Returns

`Element`[]

#### Defined in

[pkg/queue/src/lib/types/IQueue.ts:3](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IQueue.ts#L3)

___

### size

• **size**: `number`

#### Defined in

[pkg/queue/src/lib/types/IQueue.ts:2](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IQueue.ts#L2)
