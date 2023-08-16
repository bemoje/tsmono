# @bemoje/fspath
Nodejs filesystem paths made very convenient to use and navigate the path tree.

![GitHub Top Language](https://img.shields.io/github/languages/top/bemoje/https://github.com/bemoje/tsmono)

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/bemoje/https://github.com/bemoje/tsmono?color=red)
![GitHub Stars](https://img.shields.io/github/stars/bemoje/https://github.com/bemoje/tsmono)
![GitHub Forks](https://img.shields.io/github/forks/bemoje/https://github.com/bemoje/tsmono)
![GitHub Watchers](https://img.shields.io/github/watchers/bemoje/https://github.com/bemoje/tsmono)
![GitHub Repo Size](https://img.shields.io/github/repo-size/bemoje/https://github.com/bemoje/tsmono)

##### NPM
<span><a href="https://npmjs.org/@bemoje/fspath" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/fspath" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/@bemoje/fspath" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/@bemoje/fspath" alt="NPM Downloads" /></a></span>


##### Donate
<span><a href="https://www.patreon.com/user?u=40752770" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
```sh
npm install @bemoje/fspath
```


## Issues
Please let me know of any bugs or [issues](https://github.com/bemoje/https://github.com/bemoje/tsmono/issues).

## Contribute
Contributors are welcome to open a [pull request](https://github.com/bemoje/https://github.com/bemoje/tsmono/pulls).

## License
Released under the [MIT License](./LICENSE).

## Documentation
- [HTML](https://github.com/bemoje/tsmono/blob/main/docs/html/index.html)
- [Markdown](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/index.md)

### Classes

- [AbstractFsPath](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/AbstractFsPath.md)
- [BlockDevicePath](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/BlockDevicePath.md)
- [CharacterDevicePath](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/CharacterDevicePath.md)
- [DirectoryPath](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/DirectoryPath.md)
- [FIFOPath](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/FIFOPath.md)
- [FilePath](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/FilePath.md)
- [SocketPath](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/SocketPath.md)
- [SymbolicLinkPath](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/SymbolicLinkPath.md)

### Type Aliases

- [NodeJsBufferEncoding](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/index.md#nodejsbufferencoding)

### Functions

- [instantiateCorrectFsPathSubclass](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/index.md#instantiatecorrectfspathsubclass)

## Type Aliases

### NodeJsBufferEncoding

Ƭ **NodeJsBufferEncoding**: ``"ascii"`` \| ``"utf8"`` \| ``"utf-8"`` \| ``"utf16le"`` \| ``"ucs2"`` \| ``"ucs-2"`` \| ``"base64"`` \| ``"base64url"`` \| ``"latin1"`` \| ``"binary"`` \| ``"hex"``

#### Defined in

[pkg/fspath/src/lib/types/NodeJsBufferEncoding.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fspath/src/lib/types/NodeJsBufferEncoding.ts#L1)

## Functions

### instantiateCorrectFsPathSubclass

▸ **instantiateCorrectFsPathSubclass**(`absolute`, `stat`): [`AbstractFsPath`](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/AbstractFsPath.md)

Creates a new FsObject instance of the correct type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `absolute` | `string` | The absolute path to the filesystem object. |
| `stat` | `Stats` | The fs.Stats object of the filesystem object. |

#### Returns

[`AbstractFsPath`](https://github.com/bemoje/tsmono/blob/main/docs/md/fspath/classes/AbstractFsPath.md)

an instance of the correct subclass of

**`See`**

AbstractFsPath.

#### Defined in

[pkg/fspath/src/lib/core/instantiateCorrectFsPathSubclass.ts:17](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fspath/src/lib/core/instantiateCorrectFsPathSubclass.ts#L17)
