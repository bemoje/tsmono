[@bemoje/api-util](/docs/md/index.md) / IAbstractApiClientOptions

# Interface: IAbstractApiClientOptions

Options for creating a new instance of AbstractApiClient.

**`See`**

AbstractApiClient

## Table of contents

### Properties

- [cache](/docs/md/interfaces/IAbstractApiClientOptions.md#cache)
- [cacheDefaults](/docs/md/interfaces/IAbstractApiClientOptions.md#cachedefaults)
- [concurrency](/docs/md/interfaces/IAbstractApiClientOptions.md#concurrency)
- [retryDefaults](/docs/md/interfaces/IAbstractApiClientOptions.md#retrydefaults)

## Properties

### cache

• `Optional` **cache**: [`IApiResponseCacheOptions`](/docs/md/interfaces/IApiResponseCacheOptions.md)

Options for initialization the cache

#### Defined in

pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:14

___

### cacheDefaults

• `Optional` **cacheDefaults**: [`IResponseCacheOptions`](/docs/md/interfaces/IResponseCacheOptions.md)

Defaults for API request cache behaviour. Can be overriden in individual method calls.

#### Defined in

pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:29

___

### concurrency

• `Optional` **concurrency**: `IPromiseQueueOptions`<`IQueue`<`RunFunction`, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Global options for concurrency control. These affect all API requests.

#### Defined in

pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:19

___

### retryDefaults

• `Optional` **retryDefaults**: [`IAsyncRetryOptions`](/docs/md/interfaces/IAsyncRetryOptions.md)

Defaults for API request retry behaviour. Can be overriden in individual method calls.

#### Defined in

pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:24
