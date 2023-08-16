@bemoje/fswalk

# @bemoje/fswalk

## Table of contents

### Interfaces

- [IWalkDirectoryOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/interfaces/IWalkDirectoryOptions.md)

### Functions

- [convertFilter](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/index.md#convertfilter)
- [findFile](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/index.md#findfile)
- [walkDirectory](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/index.md#walkdirectory)
- [walkDirectoryEmitter](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/index.md#walkdirectoryemitter)
- [walkDirectorySync](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/index.md#walkdirectorysync)

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

[pkg/fswalk/src/lib/core/convertFilter.ts:4](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fswalk/src/lib/core/convertFilter.ts#L4)

___

### findFile

▸ **findFile**(`dirpath`, `search`, `options?`): `Promise`<`string` \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `search` | `string` |
| `options` | [`IWalkDirectoryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/interfaces/IWalkDirectoryOptions.md) |

#### Returns

`Promise`<`string` \| `undefined`\>

#### Defined in

[pkg/fswalk/src/lib/findFile.ts:7](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fswalk/src/lib/findFile.ts#L7)

___

### walkDirectory

▸ **walkDirectory**(`dirpath`, `options?`, `callback?`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/interfaces/IWalkDirectoryOptions.md) |
| `callback?` | (`filepath`: `string`, `stat`: `Stats`) => `void` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[pkg/fswalk/src/lib/walkDirectory.ts:6](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fswalk/src/lib/walkDirectory.ts#L6)

___

### walkDirectoryEmitter

▸ **walkDirectoryEmitter**(`dirpath`, `options?`): `walkdir.WalkEmitter`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/interfaces/IWalkDirectoryOptions.md) |

#### Returns

`walkdir.WalkEmitter`

#### Defined in

[pkg/fswalk/src/lib/walkDirectoryEmitter.ts:5](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fswalk/src/lib/walkDirectoryEmitter.ts#L5)

___

### walkDirectorySync

▸ **walkDirectorySync**(`dirpath`, `options?`, `callback?`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/fswalk/interfaces/IWalkDirectoryOptions.md) |
| `callback?` | (`filepath`: `string`, `stat`: `Stats`) => `void` |

#### Returns

`string`[]

#### Defined in

[pkg/fswalk/src/lib/walkDirectorySync.ts:6](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fswalk/src/lib/walkDirectorySync.ts#L6)
