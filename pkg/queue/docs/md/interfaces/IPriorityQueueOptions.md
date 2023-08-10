[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md) / IPriorityQueueOptions

# Interface: IPriorityQueueOptions

## Hierarchy

- [`IQueueAddOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md)

  ↳ **`IPriorityQueueOptions`**

## Table of contents

### Properties

- [priority](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md#priority)
- [signal](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md#signal)
- [throwOnTimeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md#throwontimeout)
- [timeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md#timeout)

## Properties

### priority

• `Optional` **priority**: `number`

Priority of operation. Operations with greater priority will be scheduled first.

**`Default`**

```ts
0
```

#### Overrides

[IQueueAddOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md).[priority](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md#priority)

#### Defined in

pkg/queue/src/lib/types/IPriorityQueueOptions.ts:4

___

### signal

• `Optional` `Readonly` **signal**: `AbortSignal`

#### Inherited from

[IQueueAddOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md).[signal](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md#signal)

#### Defined in

pkg/queue/src/lib/types/ITaskOptions.ts:2

___

### throwOnTimeout

• `Optional` **throwOnTimeout**: `boolean`

Whether or not a timeout is considered an exception.

**`Default`**

```ts
false
```

#### Inherited from

[IQueueAddOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md).[throwOnTimeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md#throwontimeout)

#### Defined in

pkg/queue/src/lib/types/ITimeoutOptions.ts:11

___

### timeout

• `Optional` **timeout**: `number`

Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.

#### Inherited from

[IQueueAddOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md).[timeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md#timeout)

#### Defined in

pkg/queue/src/lib/types/ITimeoutOptions.ts:5
