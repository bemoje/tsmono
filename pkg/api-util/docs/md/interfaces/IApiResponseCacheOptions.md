[@bemoje/api-util](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/index.md) / IApiResponseCacheOptions

# Interface: IApiResponseCacheOptions

## Table of contents

### Properties

- [dirpath](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IApiResponseCacheOptions.md#dirpath)
- [enable](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IApiResponseCacheOptions.md#enable)
- [maxAgeMs](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IApiResponseCacheOptions.md#maxagems)
- [name](https://github.com/bemoje/tsmono/blob/main/pkg/api-util/docs/md/interfaces/IApiResponseCacheOptions.md#name)

## Properties

### dirpath

• `Optional` **dirpath**: `string`

Path to cache directory. Defaults to a directory named 'ApiReponseCache' in the logged in user's app data directory.

#### Defined in

pkg/api-util/src/lib/types/IApiResponseCacheOptions.ts:15

___

### enable

• `Optional` **enable**: `boolean`

Whether to enable the cache. Defaults to false.

#### Defined in

pkg/api-util/src/lib/types/IApiResponseCacheOptions.ts:5

___

### maxAgeMs

• `Optional` **maxAgeMs**: `number`

Max age of cached data in milliseconds. Defaults to 0 (no max age).

#### Defined in

pkg/api-util/src/lib/types/IApiResponseCacheOptions.ts:20

___

### name

• `Optional` **name**: `string`

Unique name to be used as the cache directory name.

#### Defined in

pkg/api-util/src/lib/types/IApiResponseCacheOptions.ts:10
