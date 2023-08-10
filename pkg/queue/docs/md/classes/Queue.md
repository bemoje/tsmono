[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md) / Queue

# Class: Queue<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#constructor)

### Properties

- [queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#queue)

### Accessors

- [size](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#size)

### Methods

- [[iterator]](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#[iterator])
- [dequeue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#dequeue)
- [enqueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#enqueue)
- [toArray](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#toarray)
- [toJSON](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#tojson)
- [from](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#from)
- [fromJSON](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md#fromjson)

## Constructors

### constructor

• **new Queue**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### queue

• `Protected` **queue**: `T`[] = `[]`

#### Defined in

pkg/queue/src/lib/Queue.ts:2

## Accessors

### size

• `get` **size**(): `number`

#### Returns

`number`

#### Defined in

pkg/queue/src/lib/Queue.ts:25

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<`T`, `any`, `undefined`\>

#### Returns

`Iterator`<`T`, `any`, `undefined`\>

#### Defined in

pkg/queue/src/lib/Queue.ts:37

___

### dequeue

▸ **dequeue**(): `T`

#### Returns

`T`

#### Defined in

pkg/queue/src/lib/Queue.ts:19

___

### enqueue

▸ **enqueue**(`item`): [`Queue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |

#### Returns

[`Queue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md)<`T`\>

#### Defined in

pkg/queue/src/lib/Queue.ts:14

___

### toArray

▸ **toArray**(): `T`[]

#### Returns

`T`[]

#### Defined in

pkg/queue/src/lib/Queue.ts:29

___

### toJSON

▸ **toJSON**(): `T`[]

#### Returns

`T`[]

#### Defined in

pkg/queue/src/lib/Queue.ts:33

___

### from

▸ `Static` **from**<`T`\>(`o`): [`Queue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Iterable`<`T`\> |

#### Returns

[`Queue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md)<`T`\>

#### Defined in

pkg/queue/src/lib/Queue.ts:4

___

### fromJSON

▸ `Static` **fromJSON**<`T`\>(`json`): [`Queue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `string` |

#### Returns

[`Queue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/Queue.md)<`T`\>

#### Defined in

pkg/queue/src/lib/Queue.ts:10
