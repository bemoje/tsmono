[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/index.md) / IQueueAddOptions

# Interface: IQueueAddOptions

## Hierarchy

- [`ITaskOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md)

- [`ITimeoutOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md)

  ↳ **`IQueueAddOptions`**

  ↳↳ [`IPriorityQueueOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IPriorityQueueOptions.md)

## Table of contents

### Properties

- [priority](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueueAddOptions.md#priority)
- [signal](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueueAddOptions.md#signal)
- [throwOnTimeout](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueueAddOptions.md#throwontimeout)
- [timeout](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueueAddOptions.md#timeout)

## Properties

### priority

• `Optional` `Readonly` **priority**: `number`

Priority of operation. Operations with greater priority will be scheduled first.

**`Default`**

```ts
0
```

#### Defined in

[pkg/queue/src/lib/types/IQueueAddOptions.ts:9](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/IQueueAddOptions.ts#L9)

___

### signal

• `Optional` `Readonly` **signal**: `AbortSignal`

#### Inherited from

[ITaskOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md).[signal](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md#signal)

#### Defined in

[pkg/queue/src/lib/types/ITaskOptions.ts:2](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/ITaskOptions.ts#L2)

___

### throwOnTimeout

• `Optional` **throwOnTimeout**: `boolean`

Whether or not a timeout is considered an exception.

**`Default`**

```ts
false
```

#### Inherited from

[ITimeoutOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md).[throwOnTimeout](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md#throwontimeout)

#### Defined in

[pkg/queue/src/lib/types/ITimeoutOptions.ts:11](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/ITimeoutOptions.ts#L11)

___

### timeout

• `Optional` **timeout**: `number`

Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.

#### Inherited from

[ITimeoutOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md).[timeout](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md#timeout)

#### Defined in

[pkg/queue/src/lib/types/ITimeoutOptions.ts:5](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/ITimeoutOptions.ts#L5)
