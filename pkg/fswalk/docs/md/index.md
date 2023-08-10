@bemoje/fswalk

# @bemoje/fswalk

## Table of contents

### Interfaces

- [IWalkDirectoryOptions](/docs/md/interfaces/IWalkDirectoryOptions.md)

### Functions

- [convertFilter](/docs/md/index.md#convertfilter)
- [findFile](/docs/md/index.md#findfile)
- [walkDirectory](/docs/md/index.md#walkdirectory)
- [walkDirectoryEmitter](/docs/md/index.md#walkdirectoryemitter)
- [walkDirectorySync](/docs/md/index.md#walkdirectorysync)

## Functions

### convertFilter

▸ **convertFilter**(`filter`): (`directory`: `string`, `files`: `string`[]) => `string`[] \| `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`fullpath`: `string`, `stat`: `Stats`) => `boolean` |

#### Returns

`fn`

▸ (`directory`, `files`): `string`[] \| `Promise`<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `directory` | `string` |
| `files` | `string`[] |

##### Returns

`string`[] \| `Promise`<`string`[]\>

#### Defined in

pkg/fswalk/src/lib/core/convertFilter.ts:4

___

### findFile

▸ **findFile**(`dirpath`, `search`, `options?`): `Promise`<`string` \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `search` | `string` |
| `options` | [`IWalkDirectoryOptions`](/docs/md/interfaces/IWalkDirectoryOptions.md) |

#### Returns

`Promise`<`string` \| `undefined`\>

#### Defined in

pkg/fswalk/src/lib/findFile.ts:7

___

### walkDirectory

▸ **walkDirectory**(`dirpath`, `options?`, `callback?`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](/docs/md/interfaces/IWalkDirectoryOptions.md) |
| `callback?` | (`filepath`: `string`, `stat`: `Stats`) => `void` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

pkg/fswalk/src/lib/walkDirectory.ts:6

___

### walkDirectoryEmitter

▸ **walkDirectoryEmitter**(`dirpath`, `options?`): `walkdir.WalkEmitter`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](/docs/md/interfaces/IWalkDirectoryOptions.md) |

#### Returns

`walkdir.WalkEmitter`

#### Defined in

pkg/fswalk/src/lib/walkDirectoryEmitter.ts:5

___

### walkDirectorySync

▸ **walkDirectorySync**(`dirpath`, `options?`, `callback?`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](/docs/md/interfaces/IWalkDirectoryOptions.md) |
| `callback?` | (`filepath`: `string`, `stat`: `Stats`) => `void` |

#### Returns

`string`[]

#### Defined in

pkg/fswalk/src/lib/walkDirectorySync.ts:6
