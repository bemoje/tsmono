[@bemoje/api-util](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/index.md) / AbstractApiClient

# Class: AbstractApiClient

A class representing some kind of client retrieving resources over the internet, like an API or SQL server.

**`Remarks`**

In order to use this class, it must be extended first and then use the sendRequest method.

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#constructor)

### Properties

- [cache](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#cache)
- [cacheDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#cachedefaults)
- [events](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#events)
- [queue](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#queue)
- [retryDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#retrydefaults)
- [sendRequest](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#sendrequest)
- [concurrencyDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#concurrencydefaults)

### Accessors

- [eventNames](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#eventnames)

### Methods

- [emit](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#emit)
- [handleCacheOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#handlecacheoptions)
- [handleOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#handleoptions)
- [handleRetryOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/AbstractApiClient.md#handleretryoptions)

## Constructors

### constructor

• **new AbstractApiClient**(`options?`)

Create a new OpenaiApiClient instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IAbstractApiClientOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAbstractApiClientOptions.md) | The constructor options to use. |

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:100](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L100)

## Properties

### cache

• `Optional` `Readonly` **cache**: [`ApiReponseCache`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/classes/ApiReponseCache.md)<`any`\>

API response cache

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:34](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L34)

___

### cacheDefaults

• `Readonly` **cacheDefaults**: [`IResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IResponseCacheOptions.md)

Default options for caching for api requests.
Can be overriden in individual method calls.

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:56](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L56)

___

### events

• `Readonly` **events**: `EventEmitter`

Event emitter for cache events

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:22](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L22)

___

### queue

• `Readonly` **queue**: `PromiseQueue`<`IQueue`<() => `Promise`<`unknown`\>, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Global queue for sending requests to the openai api.

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:39](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L39)

___

### retryDefaults

• `Readonly` **retryDefaults**: [`IAsyncRetryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAsyncRetryOptions.md)

Default options for async retry for api requests.
Can be overriden in individual method calls.

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:45](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L45)

___

### sendRequest

• `Protected` `Readonly` **sendRequest**: <T\>(`options`: { `apiRequest`: () => `Promise`<`T`\> ; `args`: `any`[] ; `cache?`: [`IResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IResponseCacheOptions.md) ; `retry?`: [`IAsyncRetryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAsyncRetryOptions.md)  }) => `Promise`<`T`\>

#### Type declaration

▸ <`T`\>(`options`): `Promise`<`T`\>

Generic function for sending requests to the openai api.
This is used for all the API endpoints.
It handles retrying, cache, hashing, and emitting events.
This method is bound to the instance on initialization because it gets wrapped with a concurrency controller in the constructor.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.apiRequest` | () => `Promise`<`T`\> |
| `options.args` | `any`[] |
| `options.cache?` | [`IResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IResponseCacheOptions.md) |
| `options.retry?` | [`IAsyncRetryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAsyncRetryOptions.md) |

##### Returns

`Promise`<`T`\>

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:89](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L89)

___

### concurrencyDefaults

▪ `Static` `Readonly` **concurrencyDefaults**: `IPromiseQueueOptions`<`IQueue`<() => `Promise`<`unknown`\>, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Options for concurrency control. These affect all API requests.

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:63](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L63)

## Accessors

### eventNames

• `get` **eventNames**(): `string`[]

All emitted event names. Please note that the cache also emits events.

#### Returns

`string`[]

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:27](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L27)

## Methods

### emit

▸ `Protected` **emit**<`T`\>(`event`, `arg`): `T`

Emit an event but adds 'this' as an extra trailing argument.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The event name. |
| `arg` | `T` | The argument to emit. |

#### Returns

`T`

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:183](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L183)

___

### handleCacheOptions

▸ `Protected` **handleCacheOptions**(`cacheOptions?`): [`IResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IResponseCacheOptions.md)

Handle cache options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cacheOptions?` | [`IResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IResponseCacheOptions.md) | The cache options to handle. |

#### Returns

[`IResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IResponseCacheOptions.md)

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:174](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L174)

___

### handleOptions

▸ `Protected` **handleOptions**(`options`): [`IAbstractApiClientOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAbstractApiClientOptions.md)

Handle the options passed to the constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IAbstractApiClientOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAbstractApiClientOptions.md) | The options to handle. |

#### Returns

[`IAbstractApiClientOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAbstractApiClientOptions.md)

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:150](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L150)

___

### handleRetryOptions

▸ `Protected` **handleRetryOptions**(`retryOptions?`): [`IAsyncRetryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAsyncRetryOptions.md)

Handle retry options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `retryOptions?` | [`IAsyncRetryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAsyncRetryOptions.md) | The retry options to handle. |

#### Returns

[`IAsyncRetryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/api-util/interfaces/IAsyncRetryOptions.md)

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:166](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L166)
