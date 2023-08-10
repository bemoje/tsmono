[@bemoje/openai-api-client](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/index.md) / IOpenaiApiClientOptions

# Interface: IOpenaiApiClientOptions

## Hierarchy

- `IAbstractApiClientOptions`

  ↳ **`IOpenaiApiClientOptions`**

## Table of contents

### Properties

- [apiKey](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientOptions.md#apikey)
- [cache](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientOptions.md#cache)
- [cacheDefaults](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientOptions.md#cachedefaults)
- [concurrency](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientOptions.md#concurrency)
- [retryDefaults](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientOptions.md#retrydefaults)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

OpenAI API key

#### Defined in

pkg/openai-api-client/src/lib/types/IOpenaiApiClientOptions.ts:7

___

### cache

• `Optional` **cache**: `IApiResponseCacheOptions`

Options for initialization the cache

#### Inherited from

IAbstractApiClientOptions.cache

#### Defined in

pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:14

___

### cacheDefaults

• `Optional` **cacheDefaults**: `IResponseCacheOptions`

Defaults for API request cache behaviour. Can be overriden in individual method calls.

#### Inherited from

IAbstractApiClientOptions.cacheDefaults

#### Defined in

pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:29

___

### concurrency

• `Optional` **concurrency**: `IPromiseQueueOptions`<`IQueue`<`RunFunction`, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Global options for concurrency control. These affect all API requests.

#### Inherited from

IAbstractApiClientOptions.concurrency

#### Defined in

pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:19

___

### retryDefaults

• `Optional` **retryDefaults**: `Options`

Defaults for API request retry behaviour. Can be overriden in individual method calls.

#### Inherited from

IAbstractApiClientOptions.retryDefaults

#### Defined in

pkg/api-util/src/lib/types/IAbstractApiClientOptions.ts:24
