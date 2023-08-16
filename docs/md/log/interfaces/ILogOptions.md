[@bemoje/log](https://github.com/bemoje/tsmono/blob/main/docs/md/log/index.md) / ILogOptions

# Interface: ILogOptions

## Table of contents

### Properties

- [consoleLogLevel](https://github.com/bemoje/tsmono/blob/main/docs/md/log/interfaces/ILogOptions.md#consoleloglevel)
- [debugColor](https://github.com/bemoje/tsmono/blob/main/docs/md/log/interfaces/ILogOptions.md#debugcolor)
- [deleteFilesOlderThan](https://github.com/bemoje/tsmono/blob/main/docs/md/log/interfaces/ILogOptions.md#deletefilesolderthan)
- [errorColor](https://github.com/bemoje/tsmono/blob/main/docs/md/log/interfaces/ILogOptions.md#errorcolor)
- [fileLogLevel](https://github.com/bemoje/tsmono/blob/main/docs/md/log/interfaces/ILogOptions.md#fileloglevel)
- [infoColor](https://github.com/bemoje/tsmono/blob/main/docs/md/log/interfaces/ILogOptions.md#infocolor)
- [logDirpath](https://github.com/bemoje/tsmono/blob/main/docs/md/log/interfaces/ILogOptions.md#logdirpath)
- [warnColor](https://github.com/bemoje/tsmono/blob/main/docs/md/log/interfaces/ILogOptions.md#warncolor)

## Properties

### consoleLogLevel

• `Optional` **consoleLogLevel**: [`LogLevel`](https://github.com/bemoje/tsmono/blob/main/docs/md/log/enums/LogLevel.md)

The log level for console output. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.

#### Defined in

[lib/types/ILogOptions.ts:8](https://github.com/bemoje/tsmono/blob/87185a0/pkg/log/src/lib/types/ILogOptions.ts#L8)

___

### debugColor

• `Optional` **debugColor**: `Format`

Color format for debug messages when logged to console.

#### Defined in

[lib/types/ILogOptions.ts:28](https://github.com/bemoje/tsmono/blob/87185a0/pkg/log/src/lib/types/ILogOptions.ts#L28)

___

### deleteFilesOlderThan

• `Optional` **deleteFilesOlderThan**: `number`

Max age of log files in days. If specified, existing log files older than this will be deleted.

#### Defined in

[lib/types/ILogOptions.ts:23](https://github.com/bemoje/tsmono/blob/87185a0/pkg/log/src/lib/types/ILogOptions.ts#L23)

___

### errorColor

• `Optional` **errorColor**: `Format`

Color format for error messages when logged to console.

#### Defined in

[lib/types/ILogOptions.ts:43](https://github.com/bemoje/tsmono/blob/87185a0/pkg/log/src/lib/types/ILogOptions.ts#L43)

___

### fileLogLevel

• `Optional` **fileLogLevel**: [`LogLevel`](https://github.com/bemoje/tsmono/blob/main/docs/md/log/enums/LogLevel.md)

The log level for the logfile. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.

#### Defined in

[lib/types/ILogOptions.ts:13](https://github.com/bemoje/tsmono/blob/87185a0/pkg/log/src/lib/types/ILogOptions.ts#L13)

___

### infoColor

• `Optional` **infoColor**: `Format`

Color format for info messages when logged to console.

#### Defined in

[lib/types/ILogOptions.ts:33](https://github.com/bemoje/tsmono/blob/87185a0/pkg/log/src/lib/types/ILogOptions.ts#L33)

___

### logDirpath

• `Optional` **logDirpath**: `string`

The directory path of the log files.

#### Defined in

[lib/types/ILogOptions.ts:18](https://github.com/bemoje/tsmono/blob/87185a0/pkg/log/src/lib/types/ILogOptions.ts#L18)

___

### warnColor

• `Optional` **warnColor**: `Format`

Color format for warning messages when logged to console.

#### Defined in

[lib/types/ILogOptions.ts:38](https://github.com/bemoje/tsmono/blob/87185a0/pkg/log/src/lib/types/ILogOptions.ts#L38)
