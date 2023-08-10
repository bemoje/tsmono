[@bemoje/api-util](/docs/md/index.md) / IAsyncRetryOptions

# Interface: IAsyncRetryOptions

## Hierarchy

- `WrapOptions`

  ↳ **`IAsyncRetryOptions`**

## Table of contents

### Properties

- [factor](/docs/md/interfaces/IAsyncRetryOptions.md#factor)
- [forever](/docs/md/interfaces/IAsyncRetryOptions.md#forever)
- [maxRetryTime](/docs/md/interfaces/IAsyncRetryOptions.md#maxretrytime)
- [maxTimeout](/docs/md/interfaces/IAsyncRetryOptions.md#maxtimeout)
- [minTimeout](/docs/md/interfaces/IAsyncRetryOptions.md#mintimeout)
- [onRetry](/docs/md/interfaces/IAsyncRetryOptions.md#onretry)
- [randomize](/docs/md/interfaces/IAsyncRetryOptions.md#randomize)
- [retries](/docs/md/interfaces/IAsyncRetryOptions.md#retries)
- [unref](/docs/md/interfaces/IAsyncRetryOptions.md#unref)

## Properties

### factor

• `Optional` **factor**: `number`

The exponential factor to use.

**`Default`**

```ts
2
```

#### Inherited from

WrapOptions.factor

#### Defined in

node_modules/@types/retry/index.d.ts:127

___

### forever

• `Optional` **forever**: `boolean`

Whether to retry forever.

**`Default`**

```ts
false
```

#### Inherited from

WrapOptions.forever

#### Defined in

node_modules/@types/retry/index.d.ts:90

___

### maxRetryTime

• `Optional` **maxRetryTime**: `number`

The maximum time (in milliseconds) that the retried operation is allowed to run.

**`Default`**

```ts
Infinity
```

#### Inherited from

WrapOptions.maxRetryTime

#### Defined in

node_modules/@types/retry/index.d.ts:100

___

### maxTimeout

• `Optional` **maxTimeout**: `number`

The maximum number of milliseconds between two retries.

**`Default`**

```ts
Infinity
```

#### Inherited from

WrapOptions.maxTimeout

#### Defined in

node_modules/@types/retry/index.d.ts:137

___

### minTimeout

• `Optional` **minTimeout**: `number`

The number of milliseconds before starting the first retry.

**`Default`**

```ts
1000
```

#### Inherited from

WrapOptions.minTimeout

#### Defined in

node_modules/@types/retry/index.d.ts:132

___

### onRetry

• `Optional` **onRetry**: (`e`: `Error`, `attempt`: `number`) => `any`

#### Type declaration

▸ (`e`, `attempt`): `any`

An optional function that is invoked after a new retry is performed. It's passed the
`Error` that triggered it as a parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `Error` |
| `attempt` | `number` |

##### Returns

`any`

#### Defined in

node_modules/@types/async-retry/index.d.ts:45

___

### randomize

• `Optional` **randomize**: `boolean`

Randomizes the timeouts by multiplying a factor between 1-2.

**`Default`**

```ts
false
```

#### Inherited from

WrapOptions.randomize

#### Defined in

node_modules/@types/retry/index.d.ts:142

___

### retries

• `Optional` **retries**: `number`

The maximum amount of times to retry the operation.

**`Default`**

```ts
10
```

#### Inherited from

WrapOptions.retries

#### Defined in

node_modules/@types/retry/index.d.ts:111

___

### unref

• `Optional` **unref**: `boolean`

Whether to [unref](https://nodejs.org/api/timers.html#timers_unref) the setTimeout's.

**`Default`**

```ts
false
```

#### Inherited from

WrapOptions.unref

#### Defined in

node_modules/@types/retry/index.d.ts:95
