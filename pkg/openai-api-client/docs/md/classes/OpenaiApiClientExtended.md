[@bemoje/openai-api-client](/docs/md/index.md) / OpenaiApiClientExtended

# Class: OpenaiApiClientExtended

A class representing an OpenAI API client but with already prompt-egineered utilities.

## Hierarchy

- [`OpenaiApiClient`](/docs/md/classes/OpenaiApiClient.md)

  ↳ **`OpenaiApiClientExtended`**

## Table of contents

### Constructors

- [constructor](/docs/md/classes/OpenaiApiClientExtended.md#constructor)

### Properties

- [apiDefaults](/docs/md/classes/OpenaiApiClientExtended.md#apidefaults)
- [cache](/docs/md/classes/OpenaiApiClientExtended.md#cache)
- [cacheDefaults](/docs/md/classes/OpenaiApiClientExtended.md#cachedefaults)
- [client](/docs/md/classes/OpenaiApiClientExtended.md#client)
- [concurrencyJustReduced](/docs/md/classes/OpenaiApiClientExtended.md#concurrencyjustreduced)
- [events](/docs/md/classes/OpenaiApiClientExtended.md#events)
- [queue](/docs/md/classes/OpenaiApiClientExtended.md#queue)
- [retryDefaults](/docs/md/classes/OpenaiApiClientExtended.md#retrydefaults)
- [sendRequest](/docs/md/classes/OpenaiApiClientExtended.md#sendrequest)
- [concurrencyDefaults](/docs/md/classes/OpenaiApiClientExtended.md#concurrencydefaults)

### Accessors

- [eventNames](/docs/md/classes/OpenaiApiClientExtended.md#eventnames)

### Methods

- [\_chat](/docs/md/classes/OpenaiApiClientExtended.md#_chat)
- [\_completion](/docs/md/classes/OpenaiApiClientExtended.md#_completion)
- [\_transcribe](/docs/md/classes/OpenaiApiClientExtended.md#_transcribe)
- [assertReponseDataComplete](/docs/md/classes/OpenaiApiClientExtended.md#assertreponsedatacomplete)
- [completion](/docs/md/classes/OpenaiApiClientExtended.md#completion)
- [countTokens](/docs/md/classes/OpenaiApiClientExtended.md#counttokens)
- [deleteDefaultOrUndefinedOptions](/docs/md/classes/OpenaiApiClientExtended.md#deletedefaultorundefinedoptions)
- [emit](/docs/md/classes/OpenaiApiClientExtended.md#emit)
- [gpt3\_16k](/docs/md/classes/OpenaiApiClientExtended.md#gpt3_16k)
- [gpt3\_8k](/docs/md/classes/OpenaiApiClientExtended.md#gpt3_8k)
- [gpt4\_8k](/docs/md/classes/OpenaiApiClientExtended.md#gpt4_8k)
- [handleApiError](/docs/md/classes/OpenaiApiClientExtended.md#handleapierror)
- [handleCacheOptions](/docs/md/classes/OpenaiApiClientExtended.md#handlecacheoptions)
- [handleChatOptions](/docs/md/classes/OpenaiApiClientExtended.md#handlechatoptions)
- [handleCompletionOptions](/docs/md/classes/OpenaiApiClientExtended.md#handlecompletionoptions)
- [handleOptions](/docs/md/classes/OpenaiApiClientExtended.md#handleoptions)
- [handleRetryOptions](/docs/md/classes/OpenaiApiClientExtended.md#handleretryoptions)
- [handleTranscribeOptions](/docs/md/classes/OpenaiApiClientExtended.md#handletranscribeoptions)
- [lowerConcurrency](/docs/md/classes/OpenaiApiClientExtended.md#lowerconcurrency)
- [parseChoices](/docs/md/classes/OpenaiApiClientExtended.md#parsechoices)
- [proofread](/docs/md/classes/OpenaiApiClientExtended.md#proofread)
- [proofreadEnglish](/docs/md/classes/OpenaiApiClientExtended.md#proofreadenglish)
- [stringTokens](/docs/md/classes/OpenaiApiClientExtended.md#stringtokens)
- [transcribe](/docs/md/classes/OpenaiApiClientExtended.md#transcribe)
- [translateEnglishTo](/docs/md/classes/OpenaiApiClientExtended.md#translateenglishto)
- [translateFromTo](/docs/md/classes/OpenaiApiClientExtended.md#translatefromto)

## Constructors

### constructor

• **new OpenaiApiClientExtended**(`options?`)

Create a new OpenAiApiClient instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IOpenaiApiClientOptions`](/docs/md/interfaces/IOpenaiApiClientOptions.md) |

**`Example`**

```ts
const openai = new OpenaiAPIClient({ apiKey: "API_KEY" })
```

#### Overrides

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[constructor](/docs/md/classes/OpenaiApiClient.md#constructor)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClientExtended.ts:16

## Properties

### apiDefaults

• `Readonly` **apiDefaults**: [`IOpenaiApiClientApiDefaultsOptions`](/docs/md/interfaces/IOpenaiApiClientApiDefaultsOptions.md)

Defaults for API requests. Can be overriden in individual method calls.

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[apiDefaults](/docs/md/classes/OpenaiApiClient.md#apidefaults)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:27

___

### cache

• `Optional` `Readonly` **cache**: `ApiReponseCache`<`any`\>

API response cache

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[cache](/docs/md/classes/OpenaiApiClient.md#cache)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:33

___

### cacheDefaults

• `Readonly` **cacheDefaults**: `IResponseCacheOptions`

Default options for caching for api requests.
Can be overriden in individual method calls.

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[cacheDefaults](/docs/md/classes/OpenaiApiClient.md#cachedefaults)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:55

___

### client

• `Readonly` **client**: `OpenAIApi`

API client instance

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[client](/docs/md/classes/OpenaiApiClient.md#client)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:22

___

### concurrencyJustReduced

• `Protected` **concurrencyJustReduced**: `boolean` = `false`

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[concurrencyJustReduced](/docs/md/classes/OpenaiApiClient.md#concurrencyjustreduced)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:35

___

### events

• `Readonly` **events**: `EventEmitter`

Event emitter for cache events

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[events](/docs/md/classes/OpenaiApiClient.md#events)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:21

___

### queue

• `Readonly` **queue**: `PromiseQueue`<`IQueue`<`RunFunction`, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Global queue for sending requests to the openai api.

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[queue](/docs/md/classes/OpenaiApiClient.md#queue)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:38

___

### retryDefaults

• `Readonly` **retryDefaults**: `Options`

Default options for async retry for api requests.
Can be overriden in individual method calls.

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[retryDefaults](/docs/md/classes/OpenaiApiClient.md#retrydefaults)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:44

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

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[sendRequest](/docs/md/classes/OpenaiApiClient.md#sendrequest)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:85

___

### concurrencyDefaults

▪ `Static` `Readonly` **concurrencyDefaults**: `IPromiseQueueOptions`<`IQueue`<`RunFunction`, `IQueueAddOptions`\>, `IQueueAddOptions`\>

Options for concurrency control. These affect all API requests.

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[concurrencyDefaults](/docs/md/classes/OpenaiApiClient.md#concurrencydefaults)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:62

## Accessors

### eventNames

• `get` **eventNames**(): `string`[]

All emitted event names. Please note that the cache also emits events.

#### Returns

`string`[]

#### Inherited from

OpenaiApiClient.eventNames

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:26

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[_chat](/docs/md/classes/OpenaiApiClient.md#_chat)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:186

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[_completion](/docs/md/classes/OpenaiApiClient.md#_completion)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:162

___

### \_transcribe

▸ `Protected` **_transcribe**(`request`, `retry`, `cache`): `Promise`<`string`\>

Send transcribe (speech to text) request to the openai API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`IOpenaiTranscribeRequest`](/docs/md/interfaces/IOpenaiTranscribeRequest.md) | The request object to send to the openai api. |
| `retry` | `Options` | The retry options. |
| `cache` | `IResponseCacheOptions` | The cache options. |

#### Returns

`Promise`<`string`\>

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[_transcribe](/docs/md/classes/OpenaiApiClient.md#_transcribe)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:215

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[assertReponseDataComplete](/docs/md/classes/OpenaiApiClient.md#assertreponsedatacomplete)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:327

___

### completion

▸ **completion**(`options`): `Promise`<`string`\>

Send a completion request to the openai api.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiCompletionRequestOptions`](/docs/md/interfaces/IOpenaiCompletionRequestOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[completion](/docs/md/classes/OpenaiApiClient.md#completion)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:51

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[countTokens](/docs/md/classes/OpenaiApiClient.md#counttokens)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:349

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[deleteDefaultOrUndefinedOptions](/docs/md/classes/OpenaiApiClient.md#deletedefaultorundefinedoptions)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:303

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

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[emit](/docs/md/classes/OpenaiApiClient.md#emit)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:179

___

### gpt3\_16k

▸ **gpt3_16k**(`options`): `Promise`<`string`\>

Send a chat completion request to the openai api with a max_tokens cap of 16384.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiChatRequestOptions`](/docs/md/interfaces/IOpenaiChatRequestOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[gpt3_16k](/docs/md/classes/OpenaiApiClient.md#gpt3_16k)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:67

___

### gpt3\_8k

▸ **gpt3_8k**(`options`): `Promise`<`string`\>

Send a chat completion request to the openai api with a max_tokens cap of 4096.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiChatRequestOptions`](/docs/md/interfaces/IOpenaiChatRequestOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[gpt3_8k](/docs/md/classes/OpenaiApiClient.md#gpt3_8k)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:59

___

### gpt4\_8k

▸ **gpt4_8k**(`options`): `Promise`<`string`\>

Send a gpt4 chat completion request to the openai api with a max_tokens cap of 8k.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiChatRequestOptions`](/docs/md/interfaces/IOpenaiChatRequestOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[gpt4_8k](/docs/md/classes/OpenaiApiClient.md#gpt4_8k)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:76

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[handleApiError](/docs/md/classes/OpenaiApiClient.md#handleapierror)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:248

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

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[handleCacheOptions](/docs/md/classes/OpenaiApiClient.md#handlecacheoptions)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:170

___

### handleChatOptions

▸ `Protected` **handleChatOptions**(`options`): [`CreateChatCompletionRequest`, `Options`, `IResponseCacheOptions`]

Handle chat options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiChatRequestOptions`](/docs/md/interfaces/IOpenaiChatRequestOptions.md) | The options to handle. |

#### Returns

[`CreateChatCompletionRequest`, `Options`, `IResponseCacheOptions`]

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[handleChatOptions](/docs/md/classes/OpenaiApiClient.md#handlechatoptions)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:122

___

### handleCompletionOptions

▸ `Protected` **handleCompletionOptions**(`options`): [`CreateCompletionRequest`, `Options`, `IResponseCacheOptions`]

Handle completion options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiCompletionRequestOptions`](/docs/md/interfaces/IOpenaiCompletionRequestOptions.md) | The options to handle. |

#### Returns

[`CreateCompletionRequest`, `Options`, `IResponseCacheOptions`]

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[handleCompletionOptions](/docs/md/classes/OpenaiApiClient.md#handlecompletionoptions)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:93

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

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[handleOptions](/docs/md/classes/OpenaiApiClient.md#handleoptions)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:146

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

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[handleRetryOptions](/docs/md/classes/OpenaiApiClient.md#handleretryoptions)

#### Defined in

pkg/api-util/src/lib/AbstractApiClient.ts:162

___

### handleTranscribeOptions

▸ `Protected` **handleTranscribeOptions**(`options`): [[`IOpenaiTranscribeRequest`](/docs/md/interfaces/IOpenaiTranscribeRequest.md), `Options`, `IResponseCacheOptions`]

Handle transcribe options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiTranscribeOptions`](/docs/md/interfaces/IOpenaiTranscribeOptions.md) | The options to handle. |

#### Returns

[[`IOpenaiTranscribeRequest`](/docs/md/interfaces/IOpenaiTranscribeRequest.md), `Options`, `IResponseCacheOptions`]

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[handleTranscribeOptions](/docs/md/classes/OpenaiApiClient.md#handletranscribeoptions)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:146

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[lowerConcurrency](/docs/md/classes/OpenaiApiClient.md#lowerconcurrency)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:265

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[parseChoices](/docs/md/classes/OpenaiApiClient.md#parsechoices)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:284

___

### proofread

▸ **proofread**(`language`, `prompt`, `options?`): `Promise`<`string`\>

Proofread in a given language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | The language of the input. |
| `prompt` | `string` | The input string. |
| `options` | [`IOpenaiChatRequestOptions`](/docs/md/interfaces/IOpenaiChatRequestOptions.md) | - |

#### Returns

`Promise`<`string`\>

**`Example`**

```ts
await openai.proofread('english', 'I no have more money.')
await openai.proofread('java', `System.out.println("Hello")`)
```

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClientExtended.ts:29

___

### proofreadEnglish

▸ **proofreadEnglish**(`prompt`, `options?`): `Promise`<`string`\>

Proofread in English.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prompt` | `string` | The input string. |
| `options` | [`IOpenaiChatRequestOptions`](/docs/md/interfaces/IOpenaiChatRequestOptions.md) | - |

#### Returns

`Promise`<`string`\>

**`Example`**

```ts
await openai.proofread('english', 'I no have more money.')
await openai.proofread('java', `System.out.println("Hello")`)
```

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClientExtended.ts:50

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

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[stringTokens](/docs/md/classes/OpenaiApiClient.md#stringtokens)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:341

___

### transcribe

▸ **transcribe**(`options`): `Promise`<`string`\>

Send a transcribe completion request to the openai api.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOpenaiTranscribeOptions`](/docs/md/interfaces/IOpenaiTranscribeOptions.md) | The options to use. |

#### Returns

`Promise`<`string`\>

#### Inherited from

[OpenaiApiClient](/docs/md/classes/OpenaiApiClient.md).[transcribe](/docs/md/classes/OpenaiApiClient.md#transcribe)

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClient.ts:85

___

### translateEnglishTo

▸ **translateEnglishTo**(`language`, `prompt`, `options?`): `Promise`<`string`\>

Translate text from English to a given language.
For short input text, use options.instruction to provide context.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |
| `prompt` | `string` |
| `options` | [`IOpenaiChatRequestOptions`](/docs/md/interfaces/IOpenaiChatRequestOptions.md) |

#### Returns

`Promise`<`string`\>

**`Example`**

```ts
await openai.translateEnglishTo('Spanish', 'Clear', { instruction: 'This is a color.' })
```

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClientExtended.ts:85

___

### translateFromTo

▸ **translateFromTo**(`fromLanguage`, `toLanguage`, `prompt`, `options?`): `Promise`<`string`\>

Translate text from one language to another.
For short input text, use options.instruction to provide context.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromLanguage` | `string` | - |
| `toLanguage` | `string` | - |
| `prompt` | `string` | The text to translate. |
| `options` | [`IOpenaiChatRequestOptions`](/docs/md/interfaces/IOpenaiChatRequestOptions.md) | - |

#### Returns

`Promise`<`string`\>

**`Example`**

```ts
await openai.translateFrom('English', 'Spanish', 'Clear', { instruction: 'This is a color.' })
```

#### Defined in

pkg/openai-api-client/src/lib/OpenaiApiClientExtended.ts:62
