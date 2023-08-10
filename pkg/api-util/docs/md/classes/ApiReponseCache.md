[@bemoje/api-util](/docs/md/index.md) / ApiReponseCache

# Class: ApiReponseCache<V\>

Persistent API response cache based on level-db.

## Type parameters

| Name |
| :------ |
| `V` |

## Table of contents

### Constructors

- [constructor](/docs/md/classes/ApiReponseCache.md#constructor)

### Properties

- [db](/docs/md/classes/ApiReponseCache.md#db)
- [events](/docs/md/classes/ApiReponseCache.md#events)
- [maxAgeMs](/docs/md/classes/ApiReponseCache.md#maxagems)
- [optionsDefaults](/docs/md/classes/ApiReponseCache.md#optionsdefaults)

### Accessors

- [eventNames](/docs/md/classes/ApiReponseCache.md#eventnames)

### Methods

- [delete](/docs/md/classes/ApiReponseCache.md#delete)
- [deleteEverything](/docs/md/classes/ApiReponseCache.md#deleteeverything)
- [deleteExpired](/docs/md/classes/ApiReponseCache.md#deleteexpired)
- [emit](/docs/md/classes/ApiReponseCache.md#emit)
- [ensureNotExpired](/docs/md/classes/ApiReponseCache.md#ensurenotexpired)
- [entries](/docs/md/classes/ApiReponseCache.md#entries)
- [get](/docs/md/classes/ApiReponseCache.md#get)
- [getOrElse](/docs/md/classes/ApiReponseCache.md#getorelse)
- [getSafe](/docs/md/classes/ApiReponseCache.md#getsafe)
- [has](/docs/md/classes/ApiReponseCache.md#has)
- [hashKey](/docs/md/classes/ApiReponseCache.md#hashkey)
- [isExpired](/docs/md/classes/ApiReponseCache.md#isexpired)
- [keys](/docs/md/classes/ApiReponseCache.md#keys)
- [orThrow](/docs/md/classes/ApiReponseCache.md#orthrow)
- [parseSerializedTimestamp](/docs/md/classes/ApiReponseCache.md#parseserializedtimestamp)
- [parseSerializedValue](/docs/md/classes/ApiReponseCache.md#parseserializedvalue)
- [put](/docs/md/classes/ApiReponseCache.md#put)
- [serializeValue](/docs/md/classes/ApiReponseCache.md#serializevalue)
- [size](/docs/md/classes/ApiReponseCache.md#size)
- [values](/docs/md/classes/ApiReponseCache.md#values)

## Constructors

### constructor

• **new ApiReponseCache**<`V`\>(`options`)

Create a new instance.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IApiResponseCacheOptions`](/docs/md/interfaces/IApiResponseCacheOptions.md) | Options for creating a new instance. |

**`Emits`**

options - the options used to create the instance.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:49

## Properties

### db

• `Readonly` **db**: `Level`<`string`, `string`\>

Level database instance

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:16

___

### events

• `Readonly` **events**: `EventEmitter`

Event emitter for cache events

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:21

___

### maxAgeMs

• `Readonly` **maxAgeMs**: `number`

Max age of cached data in milliseconds. Defaults to 0 (no max age).

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:33

___

### optionsDefaults

▪ `Static` `Readonly` **optionsDefaults**: `Object`

Default options for creating new instances

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `maxAgeMs` | `number` |
| `name` | `string` |

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:38

## Accessors

### eventNames

• `get` **eventNames**(): `string`[]

All emitted event names.

#### Returns

`string`[]

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:26

## Methods

### delete

▸ **delete**(`hash`): `Promise`<`void`\>

Delete a given value for a given hash key if it exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The hash key. |

#### Returns

`Promise`<`void`\>

**`Remarks`**

No error is thrown if no value exists for the given hash.

**`Emits`**

error - if deletion fails.

**`Emits`**

delete - if deletion succeeds.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:155

___

### deleteEverything

▸ **deleteEverything**(): `Promise`<`void`\>

Delete all cached API responses.

#### Returns

`Promise`<`void`\>

**`Emits`**

delete - if deletion succeeds.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:176

___

### deleteExpired

▸ **deleteExpired**(): `Promise`<[`ApiReponseCache`](/docs/md/classes/ApiReponseCache.md)<`V`\>\>

Delete all expired data.

#### Returns

`Promise`<[`ApiReponseCache`](/docs/md/classes/ApiReponseCache.md)<`V`\>\>

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:165

___

### emit

▸ `Protected` **emit**<`T`\>(`eventName`, `arg`): `T`

Emit an event but this automatically adds 'this' as an extra argument.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The event name. |
| `arg` | `T` | - |

#### Returns

`T`

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:306

___

### ensureNotExpired

▸ `Protected` **ensureNotExpired**(`hash`, `serialized`): `Promise`<`void`\>

Deletes a value from the cache if it is expired.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The hash key. |
| `serialized` | `string` | The serialized value. |

#### Returns

`Promise`<`void`\>

**`Emits`**

expired - if the value is expired.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:246

___

### entries

▸ **entries**(): `AsyncIterableIterator`<[`string`, `V`]\>

Iterate over all [key, value] pairs in the cache.

#### Returns

`AsyncIterableIterator`<[`string`, `V`]\>

**`Remarks`**

This data entries are expired, they are deleted and not yielded.

**`Emits`**

error - if iteration encounters an error.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:188

___

### get

▸ **get**(`hash`): `Promise`<`V`\>

Get a value for a given hash key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The hash key. |

#### Returns

`Promise`<`V`\>

**`Emits`**

error - if the value does not exist for the give hash.

**`Emits`**

get - if the value exists for the given hash.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:94

___

### getOrElse

▸ **getOrElse**(`hash`, `apiRequest`): `Promise`<`V`\>

Get a value for a given hash key if it exists.
If the does not exist, returns a value from the api by invoking the provided function and then stores that value in the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The hash key. |
| `apiRequest` | () => `V` \| `Promise`<`V`\> | function that returns a new value for a given key if it doesn't exist in the cache. |

#### Returns

`Promise`<`V`\>

**`Emits`**

hit - if the value exists in the cache.

**`Emits`**

miss - if the value does not exist in the cache.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:76

___

### getSafe

▸ **getSafe**(`hash`): `Promise`<`undefined` \| `V`\>

Get a value for a given hash key or undefined if it does not exist or an error occurs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The hash key. |

#### Returns

`Promise`<`undefined` \| `V`\>

**`Emits`**

get - if the value exists for the given hash.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:108

___

### has

▸ **has**(`hash`): `Promise`<`boolean`\>

Returns whether a value exists for a given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The hash key. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:123

___

### hashKey

▸ **hashKey**(`key`): `string`

Hash any type of key to a base64 string, using the SHA1 algorithm.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `any` | The key to hash. |

#### Returns

`string`

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:64

___

### isExpired

▸ `Protected` **isExpired**(`serialized`): `boolean`

Check if a still raw serialized value string is expired.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serialized` | `string` | The serialized value. |

#### Returns

`boolean`

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:258

___

### keys

▸ **keys**(): `AsyncIterableIterator`<`string`\>

Iterate over all keys in the cache.

#### Returns

`AsyncIterableIterator`<`string`\>

**`Emits`**

error - if iteration encounters an error.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:205

___

### orThrow

▸ `Protected` **orThrow**<`T`\>(`fn`): `T` \| `Promise`<`T`\>

Shorthand for try/catch block with error-handling.
Wrap a function call in a try catch block and emit an error event if an error occurs.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `T` \| `Promise`<`T`\> | The function to wrap. |

#### Returns

`T` \| `Promise`<`T`\>

The return value of the provided function.

**`Emits`**

error - if the provided function throws an error.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:294

___

### parseSerializedTimestamp

▸ `Protected` **parseSerializedTimestamp**(`serialized`): `number`

Parse the timestamp part of a raw serialized value string from the database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serialized` | `string` | The serialized value. |

#### Returns

`number`

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:275

___

### parseSerializedValue

▸ `Protected` **parseSerializedValue**(`serialized`): `V`

Parse the json part of a raw serialized value string from the database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serialized` | `string` | The serialized value. |

#### Returns

`V`

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:283

___

### put

▸ **put**(`hash`, `value`): `Promise`<`V`\>

Set a given value for a given hash key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The hash key. |
| `value` | `V` | The value to store. |

#### Returns

`Promise`<`V`\>

**`Emits`**

put - if insertion succeeds.

**`Emits`**

error - if insertion fails.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:139

___

### serializeValue

▸ `Protected` **serializeValue**(`value`): `string`

Custom JSON stringify function that prepends a timestamp to the stringified object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | The value to serialize. |

#### Returns

`string`

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:267

___

### size

▸ **size**(): `Promise`<`number`\>

Get the number of entries in the cache.

#### Returns

`Promise`<`number`\>

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:232

___

### values

▸ **values**(): `AsyncIterableIterator`<`V`\>

Iterate over all values in the cache.

#### Returns

`AsyncIterableIterator`<`V`\>

**`Emits`**

error - if iteration encounters an error.

#### Defined in

pkg/api-util/src/lib/ApiReponseCache.ts:219
