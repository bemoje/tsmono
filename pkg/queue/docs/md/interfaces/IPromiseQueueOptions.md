[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md) / IPromiseQueueOptions

# Interface: IPromiseQueueOptions<QueueType, QueueOptions\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `QueueType` | extends [`IQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md)<() => `Promise`<`unknown`\>, `QueueOptions`\> |
| `QueueOptions` | extends [`IQueueAddOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md) |

## Hierarchy

- [`ITimeoutOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md)

  ↳ **`IPromiseQueueOptions`**

## Table of contents

### Properties

- [autoStart](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md#autostart)
- [carryoverConcurrencyCount](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md#carryoverconcurrencycount)
- [concurrency](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md#concurrency)
- [interval](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md#interval)
- [intervalCap](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md#intervalcap)
- [queueClass](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md#queueclass)
- [throwOnTimeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md#throwontimeout)
- [timeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md#timeout)

## Properties

### autoStart

• `Optional` `Readonly` **autoStart**: `boolean`

Whether queue tasks within concurrency limit, are auto-executed as soon as they're added.

**`Default`**

```ts
true
```

#### Defined in

[pkg/queue/src/lib/types/IPromiseQueueOptions.ts:20](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IPromiseQueueOptions.ts#L20)

___

### carryoverConcurrencyCount

• `Optional` `Readonly` **carryoverConcurrencyCount**: `boolean`

Whether the task must finish in the given interval or will be carried over into the next interval count.

**`Default`**

```ts
false
```

#### Defined in

[pkg/queue/src/lib/types/IPromiseQueueOptions.ts:45](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IPromiseQueueOptions.ts#L45)

___

### concurrency

• `Optional` `Readonly` **concurrency**: `number`

Concurrency limit.
Minimum: `1`.

**`Default`**

```ts
Infinity
```

#### Defined in

[pkg/queue/src/lib/types/IPromiseQueueOptions.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IPromiseQueueOptions.ts#L14)

___

### interval

• `Optional` `Readonly` **interval**: `number`

The length of time in milliseconds before the interval count resets. Must be finite.
	Minimum: `0`.

**`Default`**

```ts
0
```

#### Defined in

[pkg/queue/src/lib/types/IPromiseQueueOptions.ts:39](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IPromiseQueueOptions.ts#L39)

___

### intervalCap

• `Optional` `Readonly` **intervalCap**: `number`

The max number of runs in the given interval of time.
Minimum: `1`.

**`Default`**

```ts
Infinity
```

#### Defined in

[pkg/queue/src/lib/types/IPromiseQueueOptions.ts:32](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IPromiseQueueOptions.ts#L32)

___

### queueClass

• `Optional` `Readonly` **queueClass**: () => `QueueType`

#### Type declaration

• **new queueClass**()

Class with a `enqueue` and `dequeue` method, and a `size` getter. See the [Custom QueueClass](https://github.com/sindresorhus/p-queue#custom-queueclass) section.

#### Defined in

[pkg/queue/src/lib/types/IPromiseQueueOptions.ts:25](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/IPromiseQueueOptions.ts#L25)

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

[pkg/queue/src/lib/types/ITimeoutOptions.ts:11](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/ITimeoutOptions.ts#L11)

___

### timeout

• `Optional` **timeout**: `number`

Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.

#### Inherited from

[ITimeoutOptions](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md).[timeout](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/ITimeoutOptions.md#timeout)

#### Defined in

[pkg/queue/src/lib/types/ITimeoutOptions.ts:5](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/types/ITimeoutOptions.ts#L5)
