[@bemoje/log](/docs/md/index.md) / ILogOptions

# Interface: ILogOptions

## Table of contents

### Properties

- [consoleLogLevel](/docs/md/interfaces/ILogOptions.md#consoleloglevel)
- [debugColor](/docs/md/interfaces/ILogOptions.md#debugcolor)
- [deleteFilesOlderThan](/docs/md/interfaces/ILogOptions.md#deletefilesolderthan)
- [errorColor](/docs/md/interfaces/ILogOptions.md#errorcolor)
- [fileLogLevel](/docs/md/interfaces/ILogOptions.md#fileloglevel)
- [infoColor](/docs/md/interfaces/ILogOptions.md#infocolor)
- [logDirpath](/docs/md/interfaces/ILogOptions.md#logdirpath)
- [warnColor](/docs/md/interfaces/ILogOptions.md#warncolor)

## Properties

### consoleLogLevel

• `Optional` **consoleLogLevel**: [`LogLevel`](/docs/md/enums/LogLevel.md)

The log level for console output. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.

#### Defined in

lib/types/ILogOptions.ts:8

___

### debugColor

• `Optional` **debugColor**: `Format`

Color format for debug messages when logged to console.

#### Defined in

lib/types/ILogOptions.ts:28

___

### deleteFilesOlderThan

• `Optional` **deleteFilesOlderThan**: `number`

Max age of log files in days. If specified, existing log files older than this will be deleted.

#### Defined in

lib/types/ILogOptions.ts:23

___

### errorColor

• `Optional` **errorColor**: `Format`

Color format for error messages when logged to console.

#### Defined in

lib/types/ILogOptions.ts:43

___

### fileLogLevel

• `Optional` **fileLogLevel**: [`LogLevel`](/docs/md/enums/LogLevel.md)

The log level for the logfile. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.

#### Defined in

lib/types/ILogOptions.ts:13

___

### infoColor

• `Optional` **infoColor**: `Format`

Color format for info messages when logged to console.

#### Defined in

lib/types/ILogOptions.ts:33

___

### logDirpath

• `Optional` **logDirpath**: `string`

The directory path of the log files.

#### Defined in

lib/types/ILogOptions.ts:18

___

### warnColor

• `Optional` **warnColor**: `Format`

Color format for warning messages when logged to console.

#### Defined in

lib/types/ILogOptions.ts:38
