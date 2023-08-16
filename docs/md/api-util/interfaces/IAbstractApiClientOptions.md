[@bemoje/api-util](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/index.md) / IAbstractApiClientOptions

# Interface: IAbstractApiClientOptions

Options for creating a new instance of AbstractApiClient.

**`See`**

AbstractApiClient

## Table of contents

### Properties

- [cache](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAbstractApiClientOptions.md#cache)
- [cacheDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAbstractApiClientOptions.md#cachedefaults)
- [concurrency](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAbstractApiClientOptions.md#concurrency)
- [retryDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAbstractApiClientOptions.md#retrydefaults)

## Properties

### cache

• `Optional` **cache**: [`IApiResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IApiResponseCacheOptions.md)

Options for initialization the cache

#### Defined in

[pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:14](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts#L14)

___

### cacheDefaults

• `Optional` **cacheDefaults**: [`IResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IResponseCacheOptions.md)

Defaults for API request cache behaviour. Can be overriden in individual method calls.

#### Defined in

[pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:29](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts#L29)

___

### concurrency

• `Optional` **concurrency**: `IPromiseQueueOptions`<`IQueue`<() => `Promise`<`unknown`\>, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Global options for concurrency control. These affect all API requests.

#### Defined in

[pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:19](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts#L19)

___

### retryDefaults

• `Optional` **retryDefaults**: [`IAsyncRetryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAsyncRetryOptions.md)

Defaults for API request retry behaviour. Can be overriden in individual method calls.

#### Defined in

[pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:24](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts#L24)
