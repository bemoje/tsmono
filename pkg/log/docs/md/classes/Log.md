[@bemoje/log](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/index.md) / Log

# Class: Log

This class is a utility for logging messages to the console and/or a log file.
It supports different log levels ('NONE', 'DEBUG', 'INFO', 'WARN', 'ERROR') for both console and file logging.
It also supports color formatting for console messages. Different colors can be specified for each log level.

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#constructor)

### Properties

- [consoleLogLevel](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#consoleloglevel)
- [debugColor](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#debugcolor)
- [debugToConsole](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#debugtoconsole)
- [debugToFile](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#debugtofile)
- [errorColor](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#errorcolor)
- [errorToConsole](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#errortoconsole)
- [errorToFile](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#errortofile)
- [fileLogLevel](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#fileloglevel)
- [infoColor](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#infocolor)
- [infoToConsole](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#infotoconsole)
- [infoToFile](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#infotofile)
- [logDirpath](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#logdirpath)
- [logFilepath](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#logfilepath)
- [warnColor](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#warncolor)
- [warnToConsole](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#warntoconsole)
- [warnToFile](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#warntofile)
- [optionDefaults](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#optiondefaults)

### Methods

- [\_logToConsole](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#_logtoconsole)
- [\_logToFile](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#_logtofile)
- [dashline](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#dashline)
- [debug](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#debug)
- [deleteLogFiles](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#deletelogfiles)
- [error](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#error)
- [getProperties](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#getproperties)
- [info](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#info)
- [initialize](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#initialize)
- [logEmitterEvents](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#logemitterevents)
- [newline](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#newline)
- [task](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#task)
- [taskSync](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#tasksync)
- [warn](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/classes/Log.md#warn)

## Constructors

### constructor

• **new Log**(`options?`)

Create a new instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ILogOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogOptions.md) | Options for creating a new instance. |

#### Defined in

[lib/Log.ts:124](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L124)

## Properties

### consoleLogLevel

• `Protected` **consoleLogLevel**: [`LogLevel`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/enums/LogLevel.md)

The log level for console output. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.

#### Defined in

[lib/Log.ts:29](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L29)

___

### debugColor

• `Protected` **debugColor**: `Format`

Color format for debug messages when logged to console.

#### Defined in

[lib/Log.ts:89](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L89)

___

### debugToConsole

• `Protected` **debugToConsole**: `boolean`

Whether to debug info to console.

#### Defined in

[lib/Log.ts:34](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L34)

___

### debugToFile

• `Protected` **debugToFile**: `boolean`

Whether to log debug info to the logfile.

#### Defined in

[lib/Log.ts:59](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L59)

___

### errorColor

• `Protected` **errorColor**: `Format`

Color format for error messages when logged to console.

#### Defined in

[lib/Log.ts:104](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L104)

___

### errorToConsole

• `Protected` **errorToConsole**: `boolean`

Whether to log errors to console.

#### Defined in

[lib/Log.ts:49](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L49)

___

### errorToFile

• `Protected` **errorToFile**: `boolean`

Whether to log errors to the logfile.

#### Defined in

[lib/Log.ts:74](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L74)

___

### fileLogLevel

• `Protected` **fileLogLevel**: [`LogLevel`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/enums/LogLevel.md)

The log level for the logfile. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.

#### Defined in

[lib/Log.ts:54](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L54)

___

### infoColor

• `Protected` **infoColor**: `Format`

Color format for info messages when logged to console.

#### Defined in

[lib/Log.ts:94](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L94)

___

### infoToConsole

• `Protected` **infoToConsole**: `boolean`

Whether to log info to console.

#### Defined in

[lib/Log.ts:39](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L39)

___

### infoToFile

• `Protected` **infoToFile**: `boolean`

Whether to log info to the logfile.

#### Defined in

[lib/Log.ts:64](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L64)

___

### logDirpath

• `Protected` **logDirpath**: `string`

The directory path of the log file.

#### Defined in

[lib/Log.ts:79](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L79)

___

### logFilepath

• `Protected` **logFilepath**: `string`

The filepath of the log file.

#### Defined in

[lib/Log.ts:84](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L84)

___

### warnColor

• `Protected` **warnColor**: `Format`

Color format for warning messages when logged to console.

#### Defined in

[lib/Log.ts:99](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L99)

___

### warnToConsole

• `Protected` **warnToConsole**: `boolean`

Whether to log warnings to console.

#### Defined in

[lib/Log.ts:44](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L44)

___

### warnToFile

• `Protected` **warnToFile**: `boolean`

Whether to log warnings to the logfile.

#### Defined in

[lib/Log.ts:69](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L69)

___

### optionDefaults

▪ `Static` **optionDefaults**: `Required`<[`ILogOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogOptions.md)\>

Default options for creating new instances.

#### Defined in

[lib/Log.ts:109](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L109)

## Methods

### \_logToConsole

▸ **_logToConsole**<`T`\>(`loglevel`, `message`, `color`, `depth?`): `void`

Generic function for logging to console, used by the log-level specific functions.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loglevel` | [`LogLevel`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/enums/LogLevel.md) | The log level. |
| `message` | `T` | The message to print to console. |
| `color` | `Format` | A 'cli-color' module function to wrap the output-part of the string in color formatting. |
| `depth?` | ``null`` \| `number` | The depth to which to print object properties. |

#### Returns

`void`

#### Defined in

[lib/Log.ts:313](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L313)

___

### \_logToFile

▸ **_logToFile**<`T`\>(`loglevel`, `message`): `void`

Write log entry to logfile

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loglevel` | [`LogLevel`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/enums/LogLevel.md) | The log level. |
| `message` | `T` | The message to print to console. |

#### Returns

`void`

#### Defined in

[lib/Log.ts:296](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L296)

___

### dashline

▸ **dashline**(`numLines?`, `width?`): `void`

Prints a given number of lines with dashes to the console.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `numLines` | `number` | `1` | The number of dash lines to print. |
| `width` | `number` | `80` | The number of dashes per line. |

#### Returns

`void`

**`Remarks`**

This is not logged to the log file.

#### Defined in

[lib/Log.ts:260](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L260)

___

### debug

▸ **debug**<`T`\>(`message`, `depth?`): `T`

Logs a debug message the console.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `T` | The message to print to console. |
| `depth?` | ``null`` \| `number` | The depth to which to print object properties. |

#### Returns

`T`

#### Defined in

[lib/Log.ts:170](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L170)

___

### deleteLogFiles

▸ **deleteLogFiles**(`deleteFilesOlderThan?`): `void`

Delete log files older than the specified number of days.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `deleteFilesOlderThan` | `number` | `0` | The maximum age of log files in days. If not specified, no files will be deleted. |

#### Returns

`void`

#### Defined in

[lib/Log.ts:235](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L235)

___

### error

▸ **error**<`T`\>(`message`, `depth?`): `T`

Logs a error message to the console.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `T` | The Error object or message to print to console. |
| `depth?` | ``null`` \| `number` | - |

#### Returns

`T`

#### Defined in

[lib/Log.ts:201](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L201)

___

### getProperties

▸ **getProperties**(): `Object`

Get the current instance's properties.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `consoleLogLevel` | [`LogLevel`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/enums/LogLevel.md) |
| `debugColor` | `Format` |
| `debugToConsole` | `boolean` |
| `debugToFile` | `boolean` |
| `errorColor` | `Format` |
| `errorToConsole` | `boolean` |
| `errorToFile` | `boolean` |
| `fileLogLevel` | [`LogLevel`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/enums/LogLevel.md) |
| `infoColor` | `Format` |
| `infoToConsole` | `boolean` |
| `infoToFile` | `boolean` |
| `logDirpath` | `string` |
| `logFilepath` | `string` |
| `warnColor` | `Format` |
| `warnToConsole` | `boolean` |
| `warnToFile` | `boolean` |

#### Defined in

[lib/Log.ts:330](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L330)

___

### info

▸ **info**<`T`\>(`message`, `depth?`): `T`

Logs an info message the console.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `T` | The message to print to console. |
| `depth?` | ``null`` \| `number` | The depth to which to print object properties. |

#### Returns

`T`

#### Defined in

[lib/Log.ts:181](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L181)

___

### initialize

▸ **initialize**(`options?`): `void`

Re-initialize the current instance with the specified options.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ILogOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogOptions.md) |

#### Returns

`void`

#### Defined in

[lib/Log.ts:161](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L161)

___

### logEmitterEvents

▸ **logEmitterEvents**(`emitter`, `options?`): `void`

This function is used to print the events emitted by an EventEmitter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The EventEmitter that is emitting the events. |
| `options` | [`ILogEmitterEventsOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogEmitterEventsOptions.md) | Options for logging the events. |

#### Returns

`void`

**`Remarks`**

This function allows you to see what events are being emitted by an EventEmitter at runtime.

#### Defined in

[lib/Log.ts:273](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L273)

___

### newline

▸ **newline**(`numLines?`): `void`

Prints a given number of blank lines to the console.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `numLines` | `number` | `10` | The number of blank lines to print. |

#### Returns

`void`

**`Remarks`**

This is not logged to the log file.

#### Defined in

[lib/Log.ts:250](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L250)

___

### task

▸ **task**<`T`\>(`description`, `task`): `Promise`<`T`\>

Wrap an async function as a task, logging the start and end of the task.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | The description of the task. |
| `task` | () => `Promise`<`T`\> | - |

#### Returns

`Promise`<`T`\>

#### Defined in

[lib/Log.ts:211](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L211)

___

### taskSync

▸ **taskSync**<`T`\>(`description`, `task`): `T`

Wrap a synchronous function as a task, logging the start and end of the task.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | The description of the task. |
| `task` | () => `T` | - |

#### Returns

`T`

#### Defined in

[lib/Log.ts:223](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L223)

___

### warn

▸ **warn**<`T`\>(`message`, `depth?`): `T`

Logs a warning message to the console.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `T` | The message to print to console. |
| `depth?` | ``null`` \| `number` | - |

#### Returns

`T`

#### Defined in

[lib/Log.ts:191](https://github.com/bemoje/tsmono/blob/5043a85/pkg/log/src/lib/Log.ts#L191)
