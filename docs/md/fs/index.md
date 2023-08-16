@bemoje/fs

# @bemoje/fs

## Table of contents

### Interfaces

- [IEnsureValidWindowsPathOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/interfaces/IEnsureValidWindowsPathOptions.md)

### Functions

- [absoluteToRelativePath](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#absolutetorelativepath)
- [appendLineToFile](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#appendlinetofile)
- [cleanDirectorySync](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#cleandirectorysync)
- [createDirectory](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#createdirectory)
- [createDirectorySync](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#createdirectorysync)
- [createFileExtensionFilter](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#createfileextensionfilter)
- [cwdpath](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#cwdpath)
- [deleteDirectory](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#deletedirectory)
- [deleteDirectorySafe](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#deletedirectorysafe)
- [deleteDirectorySafeSync](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#deletedirectorysafesync)
- [deleteDirectorySync](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#deletedirectorysync)
- [ensureValidWindowsPath](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#ensurevalidwindowspath)
- [getDiskDrivesWindows](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#getdiskdriveswindows)
- [getDownloadsDirectory](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#getdownloadsdirectory)
- [getHomeDirectory](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#gethomedirectory)
- [getLastMofifiedFileIn](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#getlastmofifiedfilein)
- [getRootDir](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#getrootdir)
- [isWindows](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#iswindows)
- [normalizeFileExtension](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#normalizefileextension)
- [readJsonFile](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#readjsonfile)
- [readJsonFileSync](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#readjsonfilesync)
- [readPackageJson](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#readpackagejson)
- [removeIllegalFilenameCharacters](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#removeillegalfilenamecharacters)
- [unzipFile](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#unzipfile)
- [unzipMergeFiles](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#unzipmergefiles)
- [wipeDirectorySafe](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#wipedirectorysafe)
- [writeJsonFile](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#writejsonfile)
- [writeJsonFileSync](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/index.md#writejsonfilesync)

## Functions

### absoluteToRelativePath

▸ **absoluteToRelativePath**(`absolute`, `workingDirectory?`): `string`

If the filepath is somewhere in the current working directory, it can be converted into a relative path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `absolute` | `string` | the absolute filepath to convert. |
| `workingDirectory` | `string` | The directory relative to which the path should be converted. Defaults to the current working directory. |

#### Returns

`string`

The relative path.

**`Remarks`**

This function takes an absolute path as input and returns a relative path. It replaces the current working directory in the path with an empty string,
replaces all backslashes with forward slashes, and removes any leading forward slashes.

**`Example`**

```ts
absoluteToRelativePath(__filename)
//=> 'src/absoluteToRelativePath.ts'
```

#### Defined in

[lib/absoluteToRelativePath.ts:16](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/absoluteToRelativePath.ts#L16)

___

### appendLineToFile

▸ **appendLineToFile**(`filepath`, `line`, `linebreakBefore?`): `Promise`<`void`\>

Append a line to a file. Creates the file if it does not exist.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filepath` | `string` | `undefined` | The path of the file. |
| `line` | `string` | `undefined` | The string data to append. |
| `linebreakBefore` | `boolean` | `false` | - |

#### Returns

`Promise`<`void`\>

A Promise that resolves when the line has been appended to the file.

**`Throws`**

Will throw an error if the operation fails.

**`Example`**

```ts
await appendLineToFile('/path/to/file', 'This is a new line')
```

#### Defined in

[lib/appendLineToFile.ts:15](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/appendLineToFile.ts#L15)

___

### cleanDirectorySync

▸ **cleanDirectorySync**(`dirpath`, `predicate`): `void`

Synchronously cleans a directory by removing files that satisfy a given predicate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dirpath` | `string` | The path to the directory that needs to be cleaned. |
| `predicate` | (`filepath`: `string`, `stat`: `Stats`) => `boolean` | A function that takes a filepath and its stats as arguments and returns a boolean. If the function returns true for a file, that file is removed from the directory. |

#### Returns

`void`

**`Remarks`**

This function is a part of the File System module.

**`Throws`**

If the directory at the provided path does not exist or cannot be read.

**`Example`**

```ts
import { Stats } from 'fs';
const dirpath = './my-directory';
const predicate = (filepath: string, stat: Stats) => stat.size > 1024;
cleanDirectorySync(dirpath, predicate);
```

#### Defined in

[lib/cleanDirectorySync.ts:18](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/cleanDirectorySync.ts#L18)

___

### createDirectory

▸ **createDirectory**(`dirpath`): `Promise`<`string`\>

Create a directory at a given path if it does not exist.
Automatically creates parent directories if they do not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dirpath` | `string` | The path where the directory should be created. |

#### Returns

`Promise`<`string`\>

The path of the directory.

**`Throws`**

Will throw an error if the directory cannot be created.

**`Example`**

```ts
createDirectory('/path/to/directory').then((dirpath) => {
  //=> `Directory created at ${dirpath}`
});
```

#### Defined in

[lib/createDirectory.ts:14](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/createDirectory.ts#L14)

___

### createDirectorySync

▸ **createDirectorySync**(`dirpath`): `string`

Create a directory at a given path if it does not exist.
Automatically creates parent directories if they do not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dirpath` | `string` | The path where the directory should be created. |

#### Returns

`string`

The path of the directory.

**`Example`**

```ts
createDirectorySync('/path/to/directory')
```

#### Defined in

[lib/createDirectorySync.ts:12](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/createDirectorySync.ts#L12)

___

### createFileExtensionFilter

▸ **createFileExtensionFilter**(`...fileExtensions`): (`filepath`: `string`) => `boolean`

Takes a list of file extensions and returns a filter function that returns true if a filepath/filename passed to it contains one of the given file extensions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...fileExtensions` | `string`[] | file extensions |

#### Returns

`fn`

A function that takes a filepath and returns true if the filepath has one of the specified file extensions, false otherwise.

▸ (`filepath`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |

##### Returns

`boolean`

**`Remarks`**

If no file extensions are provided, the filter will always return true.

**`Example`**

```ts
createFileExtensionFilter('.ts', '.tsx')('index.ts');;
//=> true
createFileExtensionFilter('.ts', '.tsx')('index.js');;
//=> false
```

#### Defined in

[lib/createFileExtensionFilter.ts:16](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/createFileExtensionFilter.ts#L16)

___

### cwdpath

▸ **cwdpath**(`...paths`): `string`

Joins the given path segments to the current working directory path, and normalizes the resulting path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...paths` | `string`[] | The path segments to join to the current working directory path. |

#### Returns

`string`

The resulting path.

**`Remarks`**

The function uses the `path.join` method from the Node.js `path` module, and the `process.cwd` method from the Node.js `process` module.

**`Example`**

```ts
console.log(cwdpath('src', 'index.ts'));
//=> '{working_directory}/src/index.ts'
```

#### Defined in

[lib/cwdpath.ts:14](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/cwdpath.ts#L14)

___

### deleteDirectory

▸ **deleteDirectory**(`dirpath`): `Promise`<`void`\>

Deletes a directory and all of its contents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dirpath` | `string` | The path to the directory to delete. |

#### Returns

`Promise`<`void`\>

A Promise that resolves when the directory has been deleted.

**`Remarks`**

This function uses Node.js's `fs.promises.rm` method with the `recursive` and `force` options set to `true`.
This means it will delete the directory and all of its contents, even if the directory is not empty.

**`Throws`**

Will throw an error if the directory does not exist, or if there was a problem deleting the directory.

**`Example`**

```ts
deleteDirectory('/path/to/directory');
```

#### Defined in

[lib/deleteDirectory.ts:14](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/deleteDirectory.ts#L14)

___

### deleteDirectorySafe

▸ **deleteDirectorySafe**(`dirpath`): `Promise`<`void`\>

Deletes a directory safely if it exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dirpath` | `string` | The path of the directory to delete. |

#### Returns

`Promise`<`void`\>

A promise that resolves to `void` when the directory has been deleted.

**`Remarks`**

This function uses Node.js' `fs.promises.rm` method with the `recursive` and `force` options set to `true`.
This means it will delete the directory and all its contents, even if the directory is not empty.

**`Throws`**

Will throw an error if the `fs.promises.rm` operation fails.

**`Example`**

```ts
deleteDirectorySafe('/path/to/directory');;
//=> undefined
```

#### Defined in

[lib/deleteDirectorySafe.ts:15](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/deleteDirectorySafe.ts#L15)

___

### deleteDirectorySafeSync

▸ **deleteDirectorySafeSync**(`dirpath`): `string`

Deletes a directory synchronously in a safe manner. If the directory does not exist, it will simply return the directory path without throwing an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dirpath` | `string` | The path of the directory to be deleted. |

#### Returns

`string`

The path of the directory that was intended to be deleted.

**`Throws`**

Will throw an error if the operation fails for reasons other than the directory not existing.

**`Example`**

```ts
deleteDirectorySafeSync('/path/to/directory');;
//=> undefined
```

#### Defined in

[lib/deleteDirectorySafeSync.ts:13](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/deleteDirectorySafeSync.ts#L13)

___

### deleteDirectorySync

▸ **deleteDirectorySync**(`dirpath`): `string`

Deletes a directory synchronously.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dirpath` | `string` | The path of the directory to delete. |

#### Returns

`string`

The path of the deleted directory.

**`Remarks`**

This function uses Node.js's `fs.rmSync` method with the options `{ recursive: true, force: true }`.

**`Throws`**

Will throw an error if the directory does not exist or if the process lacks permissions to delete it.

**`Example`**

```ts
deleteDirectorySync('/path/to/directory');;
//=> undefined
```

#### Defined in

[lib/deleteDirectorySync.ts:14](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/deleteDirectorySync.ts#L14)

___

### ensureValidWindowsPath

▸ **ensureValidWindowsPath**(`path`, `options?`): `boolean`

Check whether a provided windows filesystem path string is valid according to:
https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to validate. |
| `options?` | [`IEnsureValidWindowsPathOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/fs/interfaces/IEnsureValidWindowsPathOptions.md) | An optional object that may contain the following properties: - `assert`: If true, the function will throw an error if the path is invalid. Default is false. - `extendedMaxLength`: If true, the function will allow paths up to 32767 characters long. Default is false. |

#### Returns

`boolean`

A boolean indicating whether the path is valid. If the `assert` option is true, the function will throw an error instead of returning false.

**`Throws`**

Will throw an error if the `assert` option is true and the path is invalid.

**`Example`**

```ts
ensureValidWindowsPath('C:\\Users\\User\\Documents\\file.txt');;
//=> true
ensureValidWindowsPath('C:/Users/User/Documents/file.txt');;
//=> false
ensureValidWindowsPath('C:\\Users\\User\\Documents\\file.txt', { assert: true });;
//=> throws an error
ensureValidWindowsPath('C:\\Users\\User\\Documents\\file.txt', { extendedMaxLength: true });;
//=> true
```

#### Defined in

[lib/ensureValidWindowsPath.ts:23](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/ensureValidWindowsPath.ts#L23)

___

### getDiskDrivesWindows

▸ **getDiskDrivesWindows**(): `string`[]

#### Returns

`string`[]

#### Defined in

[lib/getDiskDrivesWindows.ts:5](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/getDiskDrivesWindows.ts#L5)

___

### getDownloadsDirectory

▸ **getDownloadsDirectory**(): `string`

#### Returns

`string`

#### Defined in

[lib/getDownloadsDirectory.ts:4](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/getDownloadsDirectory.ts#L4)

___

### getHomeDirectory

▸ **getHomeDirectory**(): `string`

#### Returns

`string`

#### Defined in

[lib/getHomeDirectory.ts:3](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/getHomeDirectory.ts#L3)

___

### getLastMofifiedFileIn

▸ **getLastMofifiedFileIn**(`dirpath`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[lib/getLastMofifiedFileIn.ts:4](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/getLastMofifiedFileIn.ts#L4)

___

### getRootDir

▸ **getRootDir**(): `string`

#### Returns

`string`

#### Defined in

[lib/getRootDir.ts:3](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/getRootDir.ts#L3)

___

### isWindows

▸ **isWindows**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/isWindows.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/isWindows.ts#L1)

___

### normalizeFileExtension

▸ **normalizeFileExtension**(`ext`): `string`

Normalize a file extension to the form: .[ext]
Anything before the last "." is not returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ext` | `string` | file extension |

#### Returns

`string`

The normalized file extension.

**`Throws`**

If the extension contains illegal characters.

**`Example`**

```ts
normalizeFileExtension('jpg');;
//=> '.jpg'
normalizeFileExtension('.jpg');;
//=> '.jpg'
normalizeFileExtension('..jpg');;
//=> '.jpg'
normalizeFileExtension('');;
//=> ''
normalizeFileExtension('.');;
//=> ''
normalizeFileExtension('jpg|png');;
//=> Error
```

#### Defined in

[lib/normalizeFileExtension.ts:22](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/normalizeFileExtension.ts#L22)

___

### readJsonFile

▸ **readJsonFile**<`T`\>(`filepath`): `Promise`<`T`\>

Reads a JSON file from the given filepath and returns its content as a Promise.
The Promise will resolve with the parsed JSON content as an object of type T.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The expected return type of the JSON object. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path to the JSON file to read. |

#### Returns

`Promise`<`T`\>

A Promise that resolves with the parsed JSON content as an object of type T.

**`Throws`**

Will throw an error if reading the file fails for any reason.

**`Example`**

```ts
const data: MyType = await readJsonFile<MyType>('path/to/myfile.json');
```

#### Defined in

[lib/readJsonFile.ts:14](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/readJsonFile.ts#L14)

___

### readJsonFileSync

▸ **readJsonFileSync**<`T`\>(`filepath`): `T`

Reads a JSON file synchronously and returns a Promise that resolves with the parsed JSON data.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The expected return type of the JSON data. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path to the JSON file to read. |

#### Returns

`T`

A Promise that resolves with the parsed JSON data.

**`Throws`**

If the file cannot be read or the content cannot be parsed as JSON.

**`Example`**

```ts
const data = await readJsonFileSync<MyType>('/path/to/file.json');
console.log(data);
```

#### Defined in

[lib/readJsonFileSync.ts:14](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/readJsonFileSync.ts#L14)

___

### readPackageJson

▸ **readPackageJson**(`projectRoot?`): `Record`<`string`, `any`\> \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `projectRoot` | `string` |

#### Returns

`Record`<`string`, `any`\> \| `undefined`

#### Defined in

[lib/readPackageJson.ts:5](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/readPackageJson.ts#L5)

___

### removeIllegalFilenameCharacters

▸ **removeIllegalFilenameCharacters**(`string`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`string`

#### Defined in

[lib/removeIllegalFilenameCharacters.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/removeIllegalFilenameCharacters.ts#L1)

___

### unzipFile

▸ **unzipFile**(`filepath`, `outdir`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |
| `outdir` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/unzipFile.ts:3](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/unzipFile.ts#L3)

___

### unzipMergeFiles

▸ **unzipMergeFiles**(`source`, `target`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` \| `string`[] | Either a directory containing zip files or an array of zip file paths. |
| `target` | `string` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/unzipMergeFiles.ts:8](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/unzipMergeFiles.ts#L8)

___

### wipeDirectorySafe

▸ **wipeDirectorySafe**(`dirpath`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/wipeDirectorySafe.ts:4](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/wipeDirectorySafe.ts#L4)

___

### writeJsonFile

▸ **writeJsonFile**<`T`\>(`filepath`, `data`, `pretty?`): `Promise`<`void`\>

Writes a JSON file to the specified filepath. The data to be written is passed as an argument.
If the 'pretty' argument is set to true, the JSON data will be formatted in a more human-readable way.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the data to be written to the file. |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filepath` | `string` | `undefined` | The path to the file where the data should be written. |
| `data` | `T` | `undefined` | The data to be written to the file. |
| `pretty` | `boolean` | `false` | Optional. If set to true, formats the JSON data in a more human-readable way. Default is false. |

#### Returns

`Promise`<`void`\>

A Promise that resolves when the file has been successfully written.

**`Example`**

```ts
const data = { name: 'John', age: 30 };
await writeJsonFile('./data.json', data, true);
```

#### Defined in

[lib/writeJsonFile.ts:16](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/writeJsonFile.ts#L16)

___

### writeJsonFileSync

▸ **writeJsonFileSync**<`T`\>(`filepath`, `data`, `pretty?`): `void`

Writes a JSON object to a file synchronously.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the JSON object. |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filepath` | `string` | `undefined` | The path of the file where the JSON object will be written. |
| `data` | `T` | `undefined` | The JSON object that will be written to the file. |
| `pretty` | `boolean` | `false` | If true, the JSON object will be formatted with indentation and line breaks. Default is false. |

#### Returns

`void`

**`Throws`**

If the file cannot be written.

**`Example`**

```ts
const data = { name: 'John', age: 30 };
writeJsonFileSync('./data.json', data, true);
```

#### Defined in

[lib/writeJsonFileSync.ts:15](https://github.com/bemoje/tsmono/blob/87185a0/pkg/fs/src/lib/writeJsonFileSync.ts#L15)
