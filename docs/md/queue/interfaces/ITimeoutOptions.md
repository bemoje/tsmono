[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/index.md) / ITimeoutOptions

# Interface: ITimeoutOptions

## Hierarchy

- **`ITimeoutOptions`**

  ↳ [`IPromiseQueueOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IPromiseQueueOptions.md)

  ↳ [`IQueueAddOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueueAddOptions.md)

## Table of contents

### Properties

- [throwOnTimeout](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md#throwontimeout)
- [timeout](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md#timeout)

## Properties

### throwOnTimeout

• `Optional` **throwOnTimeout**: `boolean`

Whether or not a timeout is considered an exception.

**`Default`**

```ts
false
```

#### Defined in

[pkg/queue/src/lib/types/ITimeoutOptions.ts:11](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/ITimeoutOptions.ts#L11)

___

### timeout

• `Optional` **timeout**: `number`

Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.

#### Defined in

[pkg/queue/src/lib/types/ITimeoutOptions.ts:5](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/ITimeoutOptions.ts#L5)
