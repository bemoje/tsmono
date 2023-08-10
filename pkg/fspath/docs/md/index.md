@bemoje/fspath

# @bemoje/fspath

## Table of contents

### Classes

- [AbstractFsPath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/AbstractFsPath.md)
- [BlockDevicePath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/BlockDevicePath.md)
- [CharacterDevicePath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/CharacterDevicePath.md)
- [DirectoryPath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/DirectoryPath.md)
- [FIFOPath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/FIFOPath.md)
- [FilePath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/FilePath.md)
- [SocketPath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/SocketPath.md)
- [SymbolicLinkPath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/SymbolicLinkPath.md)

### Type Aliases

- [NodeJsBufferEncoding](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/index.md#nodejsbufferencoding)

### Functions

- [instantiateCorrectFsPathSubclass](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/index.md#instantiatecorrectfspathsubclass)

## Type Aliases

### NodeJsBufferEncoding

Ƭ **NodeJsBufferEncoding**: ``"ascii"`` \| ``"utf8"`` \| ``"utf-8"`` \| ``"utf16le"`` \| ``"ucs2"`` \| ``"ucs-2"`` \| ``"base64"`` \| ``"base64url"`` \| ``"latin1"`` \| ``"binary"`` \| ``"hex"``

#### Defined in

pkg/fspath/src/lib/types/NodeJsBufferEncoding.ts:1

## Functions

### instantiateCorrectFsPathSubclass

▸ **instantiateCorrectFsPathSubclass**(`absolute`, `stat`): [`AbstractFsPath`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/AbstractFsPath.md)

Creates a new FsObject instance of the correct type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `absolute` | `string` | The absolute path to the filesystem object. |
| `stat` | `Stats` | The fs.Stats object of the filesystem object. |

#### Returns

[`AbstractFsPath`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath/docs/md/classes/AbstractFsPath.md)

an instance of the correct subclass of

**`See`**

AbstractFsPath.

#### Defined in

pkg/fspath/src/lib/core/instantiateCorrectFsPathSubclass.ts:17
