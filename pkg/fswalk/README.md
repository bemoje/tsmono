# @bemoje/fswalk
Various utilities related to filesystem traversal

![GitHub Top Language](https://img.shields.io/github/languages/top/bemoje/https://github.com/bemoje/tsmono)

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/bemoje/https://github.com/bemoje/tsmono?color=red)
![GitHub Stars](https://img.shields.io/github/stars/bemoje/https://github.com/bemoje/tsmono)
![GitHub Forks](https://img.shields.io/github/forks/bemoje/https://github.com/bemoje/tsmono)
![GitHub Watchers](https://img.shields.io/github/watchers/bemoje/https://github.com/bemoje/tsmono)
![GitHub Repo Size](https://img.shields.io/github/repo-size/bemoje/https://github.com/bemoje/tsmono)

##### NPM
<span><a href="https://npmjs.org/@bemoje/fswalk" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/fswalk" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/@bemoje/fswalk" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/@bemoje/fswalk" alt="NPM Downloads" /></a></span>


##### Donate
<span><a href="https://www.patreon.com/user?u=40752770" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
```sh
npm install @bemoje/fswalk
```


## Issues
Please let me know of any bugs or [issues](https://github.com/bemoje/https://github.com/bemoje/tsmono/issues).

## Contribute
Contributors are welcome to open a [pull request](https://github.com/bemoje/https://github.com/bemoje/tsmono/pulls).

## License
Released under the [MIT License](./LICENSE).

## Documentation
- [HTML](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/html/index.html)
- [Markdown](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/index.md)

### Interfaces

- [IWalkDirectoryOptions](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/interfaces/IWalkDirectoryOptions.md)

### Functions

- [convertFilter](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/index.md#convertfilter)
- [findFile](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/index.md#findfile)
- [walkDirectory](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/index.md#walkdirectory)
- [walkDirectoryEmitter](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/index.md#walkdirectoryemitter)
- [walkDirectorySync](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/index.md#walkdirectorysync)

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

[pkg/fswalk/src/lib/core/convertFilter.ts:4](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fswalk/src/lib/core/convertFilter.ts#L4)

___

### findFile

▸ **findFile**(`dirpath`, `search`, `options?`): `Promise`<`string` \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `search` | `string` |
| `options` | [`IWalkDirectoryOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/interfaces/IWalkDirectoryOptions.md) |

#### Returns

`Promise`<`string` \| `undefined`\>

#### Defined in

[pkg/fswalk/src/lib/findFile.ts:7](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fswalk/src/lib/findFile.ts#L7)

___

### walkDirectory

▸ **walkDirectory**(`dirpath`, `options?`, `callback?`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/interfaces/IWalkDirectoryOptions.md) |
| `callback?` | (`filepath`: `string`, `stat`: `Stats`) => `void` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[pkg/fswalk/src/lib/walkDirectory.ts:6](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fswalk/src/lib/walkDirectory.ts#L6)

___

### walkDirectoryEmitter

▸ **walkDirectoryEmitter**(`dirpath`, `options?`): `walkdir.WalkEmitter`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/interfaces/IWalkDirectoryOptions.md) |

#### Returns

`walkdir.WalkEmitter`

#### Defined in

[pkg/fswalk/src/lib/walkDirectoryEmitter.ts:5](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fswalk/src/lib/walkDirectoryEmitter.ts#L5)

___

### walkDirectorySync

▸ **walkDirectorySync**(`dirpath`, `options?`, `callback?`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |
| `options` | [`IWalkDirectoryOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fswalk/docs/md/interfaces/IWalkDirectoryOptions.md) |
| `callback?` | (`filepath`: `string`, `stat`: `Stats`) => `void` |

#### Returns

`string`[]

#### Defined in

[pkg/fswalk/src/lib/walkDirectorySync.ts:6](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fswalk/src/lib/walkDirectorySync.ts#L6)
