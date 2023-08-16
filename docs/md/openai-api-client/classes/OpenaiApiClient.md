[@bemoje/openai-api-client](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/index.md) / OpenaiApiClient

# Class: OpenaiApiClient

A class representing an OpenAI API client.

## Hierarchy

- `AbstractApiClient`

  ↳ **`OpenaiApiClient`**

  ↳↳ [`OpenaiApiClientExtended`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClientExtended.md)

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#constructor)

### Properties

- [apiDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#apidefaults)
- [cache](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#cache)
- [cacheDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#cachedefaults)
- [client](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#client)
- [concurrencyJustReduced](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#concurrencyjustreduced)
- [events](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#events)
- [queue](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#queue)
- [retryDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#retrydefaults)
- [sendRequest](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#sendrequest)
- [concurrencyDefaults](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#concurrencydefaults)

### Accessors

- [eventNames](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#eventnames)

### Methods

- [\_chat](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#_chat)
- [\_completion](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#_completion)
- [\_transcribe](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#_transcribe)
- [assertReponseDataComplete](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#assertreponsedatacomplete)
- [completion](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#completion)
- [countTokens](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#counttokens)
- [deleteDefaultOrUndefinedOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#deletedefaultorundefinedoptions)
- [emit](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#emit)
- [gpt3\_16k](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#gpt3_16k)
- [gpt3\_8k](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#gpt3_8k)
- [gpt4\_8k](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#gpt4_8k)
- [handleApiError](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#handleapierror)
- [handleCacheOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#handlecacheoptions)
- [handleChatOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#handlechatoptions)
- [handleCompletionOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#handlecompletionoptions)
- [handleOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#handleoptions)
- [handleRetryOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#handleretryoptions)
- [handleTranscribeOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#handletranscribeoptions)
- [lowerConcurrency](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#lowerconcurrency)
- [parseChoices](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#parsechoices)
- [stringTokens](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#stringtokens)
- [transcribe](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/classes/OpenaiApiClient.md#transcribe)

## Constructors

### constructor

• **new OpenaiApiClient**(`options?`)

Create a new OpenaiApiClient instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiApiClientOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiApiClientOptions.md) | The constructor options to use. |

#### Overrides

AbstractApiClient.constructor

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:41](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L41)

## Properties

### apiDefaults

• `Readonly` **apiDefaults**: [`IOpenaiApiClientApiDefaultsOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiApiClientApiDefaultsOptions.md)

Defaults for API requests. Can be overriden in individual method calls.

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:27](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L27)

___

### cache

• `Optional` `Readonly` **cache**: `ApiReponseCache`<`any`\>

API response cache

#### Inherited from

AbstractApiClient.cache

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:34](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L34)

___

### cacheDefaults

• `Readonly` **cacheDefaults**: `IResponseCacheOptions`

Default options for caching for api requests.
Can be overriden in individual method calls.

#### Inherited from

AbstractApiClient.cacheDefaults

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:56](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L56)

___

### client

• `Readonly` **client**: `OpenAIApi`

API client instance

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:22](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L22)

___

### concurrencyJustReduced

• `Protected` **concurrencyJustReduced**: `boolean` = `false`

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:35](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L35)

___

### events

• `Readonly` **events**: `EventEmitter`

Event emitter for cache events

#### Inherited from

AbstractApiClient.events

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:22](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L22)

___

### queue

• `Readonly` **queue**: `PromiseQueue`<`IQueue`<() => `Promise`<`unknown`\>, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Global queue for sending requests to the openai api.

#### Inherited from

AbstractApiClient.queue

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:39](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L39)

___

### retryDefaults

• `Readonly` **retryDefaults**: `Options`

Default options for async retry for api requests.
Can be overriden in individual method calls.

#### Inherited from

AbstractApiClient.retryDefaults

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:45](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L45)

___

### sendRequest

• `Protected` `Readonly` **sendRequest**: <T\>(`options`: { `apiRequest`: () => `Promise`<`T`\> ; `args`: `any`[] ; `cache?`: `IResponseCacheOptions` ; `retry?`: `Options`  }) => `Promise`<`T`\>

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
| `options.cache?` | `IResponseCacheOptions` |
| `options.retry?` | `Options` |

##### Returns

`Promise`<`T`\>

#### Inherited from

AbstractApiClient.sendRequest

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:89](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L89)

___

### concurrencyDefaults

▪ `Static` `Readonly` **concurrencyDefaults**: `IPromiseQueueOptions`<`IQueue`<() => `Promise`<`unknown`\>, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Options for concurrency control. These affect all API requests.

#### Inherited from

AbstractApiClient.concurrencyDefaults

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:63](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L63)

## Accessors

### eventNames

• `get` **eventNames**(): `string`[]

All emitted event names. Please note that the cache also emits events.

#### Returns

`string`[]

#### Inherited from

AbstractApiClient.eventNames

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:27](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L27)

## Methods

### \_chat

▸ `Protected` **_chat**(`request`, `retry`, `cache`): `Promise`<`string`\>

Send chat request to the openai API.
This is used by all the preset methods, the public methods: chat3_8, chat3_16, and chat4_8.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `CreateChatCompletionRequest` | The request object to send to the openai api. |
| `retry` | `Options` | The retry options. |
| `cache` | `IResponseCacheOptions` | The cache options. |

#### Returns

`Promise`<`string`\>

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:186](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L186)

___

### \_completion

▸ `Protected` **_completion**(`request`, `retry`, `cache`): `Promise`<`string`\>

Send completion request to the openai API.
This is used by all the preset methods, the public methods: completion.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `CreateCompletionRequest` | The request object to send to the openai api. |
| `retry` | `Options` | The retry options. |
| `cache` | `IResponseCacheOptions` | The cache options. |

#### Returns

`Promise`<`string`\>

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:162](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L162)

___

### \_transcribe

▸ `Protected` **_transcribe**(`request`, `retry`, `cache`): `Promise`<`string`\>

Send transcribe (speech to text) request to the openai API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IOpenaiTranscribeRequest`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiTranscribeRequest.md) | The request object to send to the openai api. |
| `retry` | `Options` | The retry options. |
| `cache` | `IResponseCacheOptions` | The cache options. |

#### Returns

`Promise`<`string`\>

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:215](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L215)

___

### assertReponseDataComplete

▸ `Protected` **assertReponseDataComplete**(`data`): `void`

Assert that the response data is complete by verifying that all returned choices have finish_reason: stop.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `CreateChatCompletionResponse` \| `CreateCompletionResponse` |

#### Returns

`void`

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:327](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L327)

___

### completion

▸ **completion**(`options`): `Promise`<`string`\>

Send a completion request to the openai api.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiCompletionRequestOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiCompletionRequestOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:51](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L51)

___

### countTokens

▸ **countTokens**(`string`): `number`

Count the number of tokens in a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to count tokens in. |

#### Returns

`number`

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:349](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L349)

___

### deleteDefaultOrUndefinedOptions

▸ `Protected` **deleteDefaultOrUndefinedOptions**<`T`\>(`options`, `defaults?`): `T`

Delete all options that are undefined or equal to the default value.
The response cache uses hashed options to determine if the request has already been made.
Removing default values and undefined values normalizes the options object so it hashes the same.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `T` | The options to delete from. |
| `defaults` | `Record`<`string`, `any`\> | The default values to compare against. |

#### Returns

`T`

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:303](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L303)

___

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

#### Inherited from

AbstractApiClient.emit

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:183](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L183)

___

### gpt3\_16k

▸ **gpt3_16k**(`options`): `Promise`<`string`\>

Send a chat completion request to the openai api with a max_tokens cap of 16384.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiChatRequestOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiChatRequestOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:67](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L67)

___

### gpt3\_8k

▸ **gpt3_8k**(`options`): `Promise`<`string`\>

Send a chat completion request to the openai api with a max_tokens cap of 4096.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiChatRequestOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiChatRequestOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:59](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L59)

___

### gpt4\_8k

▸ **gpt4_8k**(`options`): `Promise`<`string`\>

Send a gpt4 chat completion request to the openai api with a max_tokens cap of 8k.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiChatRequestOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiChatRequestOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:76](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L76)

___

### handleApiError

▸ `Protected` **handleApiError**(`error`): `void`

Parses API error codes.
When the error is a rate limit error, lowers the concurrency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `any` | The error to parse. |

#### Returns

`void`

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:248](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L248)

___

### handleCacheOptions

▸ `Protected` **handleCacheOptions**(`cacheOptions?`): `IResponseCacheOptions`

Handle cache options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cacheOptions?` | `IResponseCacheOptions` | The cache options to handle. |

#### Returns

`IResponseCacheOptions`

#### Inherited from

AbstractApiClient.handleCacheOptions

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:174](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L174)

___

### handleChatOptions

▸ `Protected` **handleChatOptions**(`options`): [`CreateChatCompletionRequest`, `Options`, `IResponseCacheOptions`]

Handle chat options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiChatRequestOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiChatRequestOptions.md) | The options to handle. |

#### Returns

[`CreateChatCompletionRequest`, `Options`, `IResponseCacheOptions`]

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:122](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L122)

___

### handleCompletionOptions

▸ `Protected` **handleCompletionOptions**(`options`): [`CreateCompletionRequest`, `Options`, `IResponseCacheOptions`]

Handle completion options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiCompletionRequestOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiCompletionRequestOptions.md) | The options to handle. |

#### Returns

[`CreateCompletionRequest`, `Options`, `IResponseCacheOptions`]

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:93](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L93)

___

### handleOptions

▸ `Protected` **handleOptions**(`options`): `IAbstractApiClientOptions`

Handle the options passed to the constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `IAbstractApiClientOptions` | The options to handle. |

#### Returns

`IAbstractApiClientOptions`

#### Inherited from

AbstractApiClient.handleOptions

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:150](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L150)

___

### handleRetryOptions

▸ `Protected` **handleRetryOptions**(`retryOptions?`): `Options`

Handle retry options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `retryOptions?` | `Options` | The retry options to handle. |

#### Returns

`Options`

#### Inherited from

AbstractApiClient.handleRetryOptions

#### Defined in

[pkg/api-util/src/lib/AbstractApiClient.ts:166](https://github.com/bemoje/tsmono/blob/87185a0/pkg/api-util/src/lib/AbstractApiClient.ts#L166)

___

### handleTranscribeOptions

▸ `Protected` **handleTranscribeOptions**(`options`): [[`IOpenaiTranscribeRequest`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiTranscribeRequest.md), `Options`, `IResponseCacheOptions`]

Handle transcribe options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiTranscribeOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiTranscribeOptions.md) | The options to handle. |

#### Returns

[[`IOpenaiTranscribeRequest`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiTranscribeRequest.md), `Options`, `IResponseCacheOptions`]

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:146](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L146)

___

### lowerConcurrency

▸ `Protected` **lowerConcurrency**(`lowerBy?`, `raiseAgainBy?`, `delay?`): `void`

Lower the concurrency to prevent rate limiting.
Automatically raises the concurrency again after a delay.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `lowerBy` | `number` | `7` | The amount to lower the concurrency by. |
| `raiseAgainBy` | `number` | `6` | The amount to raise the concurrency by after a delay. |
| `delay` | `number` | `undefined` | The delay to wait before raising the concurrency again. This is randomized by +/- 5 seconds to prevent multiple requests from affecting the concurrency at the same time. |

#### Returns

`void`

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:265](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L265)

___

### parseChoices

▸ `Protected` **parseChoices**(`choices`): `string`[]

Extract the actual concent from the 'choices' object from the response data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `choices` | `CreateChatCompletionResponseChoicesInner`[] \| `CreateCompletionResponseChoicesInner`[] | The choices object from the response data. |

#### Returns

`string`[]

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:284](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L284)

___

### stringTokens

▸ **stringTokens**(`string`): `number`[]

Encode a string into tokens.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to encode. |

#### Returns

`number`[]

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:341](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L341)

___

### transcribe

▸ **transcribe**(`options`): `Promise`<`string`\>

Send a transcribe completion request to the openai api.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiTranscribeOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/openai-api-client/interfaces/IOpenaiTranscribeOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Defined in

[pkg/openai-api-client/src/lib/OpenaiApiClient.ts:85](https://github.com/bemoje/tsmono/blob/87185a0/pkg/openai-api-client/src/lib/OpenaiApiClient.ts#L85)
