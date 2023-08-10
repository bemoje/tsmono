[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md) / IQueueAddOptions

# Interface: IQueueAddOptions

## Hierarchy

- [`ITaskOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITaskOptions.md)

- [`ITimeoutOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md)

  ↳ **`IQueueAddOptions`**

  ↳↳ [`IPriorityQueueOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPriorityQueueOptions.md)

## Table of contents

### Properties

- [priority](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md#priority)
- [signal](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md#signal)
- [throwOnTimeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md#throwontimeout)
- [timeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md#timeout)

## Properties

### priority

• `Optional` `Readonly` **priority**: `number`

Priority of operation. Operations with greater priority will be scheduled first.

**`Default`**

```ts
0
```

#### Defined in

pkg/queue/src/lib/types/IQueueAddOptions.ts:9

___

### signal

• `Optional` `Readonly` **signal**: `AbortSignal`

#### Inherited from

[ITaskOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITaskOptions.md).[signal](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITaskOptions.md#signal)

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

[ITimeoutOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md).[throwOnTimeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md#throwontimeout)

#### Defined in

pkg/queue/src/lib/types/ITimeoutOptions.ts:11

___

### timeout

• `Optional` **timeout**: `number`

Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.

#### Inherited from

[ITimeoutOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md).[timeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md#timeout)

#### Defined in

pkg/queue/src/lib/types/ITimeoutOptions.ts:5
