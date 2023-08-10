[@bemoje/api-util](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/index.md) / IAbstractApiClientOptions

# Interface: IAbstractApiClientOptions

Options for creating a new instance of AbstractApiClient.

**`See`**

AbstractApiClient

## Table of contents

### Properties

- [cache](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IAbstractApiClientOptions.md#cache)
- [cacheDefaults](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IAbstractApiClientOptions.md#cachedefaults)
- [concurrency](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IAbstractApiClientOptions.md#concurrency)
- [retryDefaults](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IAbstractApiClientOptions.md#retrydefaults)

## Properties

### cache

• `Optional` **cache**: [`IApiResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IApiResponseCacheOptions.md)

Options for initialization the cache

#### Defined in

[pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:14](https://github.com/bemoje/tsmono/blob/5043a85/pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts#L14)

___

### cacheDefaults

• `Optional` **cacheDefaults**: [`IResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IResponseCacheOptions.md)

Defaults for API request cache behaviour. Can be overriden in individual method calls.

#### Defined in

[pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:29](https://github.com/bemoje/tsmono/blob/5043a85/pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts#L29)

___

### concurrency

• `Optional` **concurrency**: `IPromiseQueueOptions`<`IQueue`<`RunFunction`, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Global options for concurrency control. These affect all API requests.

#### Defined in

[pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:19](https://github.com/bemoje/tsmono/blob/5043a85/pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts#L19)

___

### retryDefaults

• `Optional` **retryDefaults**: [`IAsyncRetryOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IAsyncRetryOptions.md)

Defaults for API request retry behaviour. Can be overriden in individual method calls.

#### Defined in

[pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:24](https://github.com/bemoje/tsmono/blob/5043a85/pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts#L24)
