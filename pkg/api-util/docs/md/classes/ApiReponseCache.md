[@bemoje/api-util](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/index.md) / ApiReponseCache

# Class: ApiReponseCache<V\>

Persistent API response cache based on level-db.

## Type parameters

| Name |
| :------ |
| `V` |

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#constructor)

### Properties

- [db](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#db)
- [events](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#events)
- [maxAgeMs](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#maxagems)
- [optionsDefaults](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#optionsdefaults)

### Accessors

- [eventNames](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#eventnames)

### Methods

- [delete](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#delete)
- [deleteEverything](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#deleteeverything)
- [deleteExpired](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#deleteexpired)
- [emit](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#emit)
- [ensureNotExpired](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#ensurenotexpired)
- [entries](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#entries)
- [get](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#get)
- [getOrElse](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#getorelse)
- [getSafe](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#getsafe)
- [has](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#has)
- [hashKey](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#hashkey)
- [isExpired](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#isexpired)
- [keys](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#keys)
- [orThrow](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#orthrow)
- [parseSerializedTimestamp](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#parseserializedtimestamp)
- [parseSerializedValue](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#parseserializedvalue)
- [put](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#put)
- [serializeValue](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#serializevalue)
- [size](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#size)
- [values](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md#values)

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
| `options` | [`IApiResponseCacheOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IApiResponseCacheOptions.md) | Options for creating a new instance. |

**`Emits`**

options - the options used to create the instance.

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:49](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L49)

## Properties

### db

• `Readonly` **db**: `Level`<`string`, `string`\>

Level database instance

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:16](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L16)

___

### events

• `Readonly` **events**: `EventEmitter`

Event emitter for cache events

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:21](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L21)

___

### maxAgeMs

• `Readonly` **maxAgeMs**: `number`

Max age of cached data in milliseconds. Defaults to 0 (no max age).

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:33](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L33)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:38](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L38)

## Accessors

### eventNames

• `get` **eventNames**(): `string`[]

All emitted event names.

#### Returns

`string`[]

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:26](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L26)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:155](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L155)

___

### deleteEverything

▸ **deleteEverything**(): `Promise`<`void`\>

Delete all cached API responses.

#### Returns

`Promise`<`void`\>

**`Emits`**

delete - if deletion succeeds.

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:176](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L176)

___

### deleteExpired

▸ **deleteExpired**(): `Promise`<[`ApiReponseCache`](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md)<`V`\>\>

Delete all expired data.

#### Returns

`Promise`<[`ApiReponseCache`](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/classes/ApiReponseCache.md)<`V`\>\>

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:165](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L165)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:306](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L306)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:246](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L246)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:188](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L188)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:94](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L94)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:76](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L76)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:108](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L108)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:123](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L123)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:64](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L64)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:258](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L258)

___

### keys

▸ **keys**(): `AsyncIterableIterator`<`string`\>

Iterate over all keys in the cache.

#### Returns

`AsyncIterableIterator`<`string`\>

**`Emits`**

error - if iteration encounters an error.

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:205](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L205)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:294](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L294)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:275](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L275)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:283](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L283)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:139](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L139)

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

[pkg/api-util/src/lib/ApiReponseCache.ts:267](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L267)

___

### size

▸ **size**(): `Promise`<`number`\>

Get the number of entries in the cache.

#### Returns

`Promise`<`number`\>

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:232](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L232)

___

### values

▸ **values**(): `AsyncIterableIterator`<`V`\>

Iterate over all values in the cache.

#### Returns

`AsyncIterableIterator`<`V`\>

**`Emits`**

error - if iteration encounters an error.

#### Defined in

[pkg/api-util/src/lib/ApiReponseCache.ts:219](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/api-util/src/lib/ApiReponseCache.ts#L219)
