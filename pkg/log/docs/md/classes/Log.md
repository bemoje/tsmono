[@bemoje/log](/docs/md/index.md) / Log

# Class: Log

This class is a utility for logging messages to the console and/or a log file.
It supports different log levels ('NONE', 'DEBUG', 'INFO', 'WARN', 'ERROR') for both console and file logging.
It also supports color formatting for console messages. Different colors can be specified for each log level.

## Table of contents

### Constructors

- [constructor](/docs/md/classes/Log.md#constructor)

### Properties

- [consoleLogLevel](/docs/md/classes/Log.md#consoleloglevel)
- [debugColor](/docs/md/classes/Log.md#debugcolor)
- [debugToConsole](/docs/md/classes/Log.md#debugtoconsole)
- [debugToFile](/docs/md/classes/Log.md#debugtofile)
- [errorColor](/docs/md/classes/Log.md#errorcolor)
- [errorToConsole](/docs/md/classes/Log.md#errortoconsole)
- [errorToFile](/docs/md/classes/Log.md#errortofile)
- [fileLogLevel](/docs/md/classes/Log.md#fileloglevel)
- [infoColor](/docs/md/classes/Log.md#infocolor)
- [infoToConsole](/docs/md/classes/Log.md#infotoconsole)
- [infoToFile](/docs/md/classes/Log.md#infotofile)
- [logDirpath](/docs/md/classes/Log.md#logdirpath)
- [logFilepath](/docs/md/classes/Log.md#logfilepath)
- [warnColor](/docs/md/classes/Log.md#warncolor)
- [warnToConsole](/docs/md/classes/Log.md#warntoconsole)
- [warnToFile](/docs/md/classes/Log.md#warntofile)
- [optionDefaults](/docs/md/classes/Log.md#optiondefaults)

### Methods

- [\_logToConsole](/docs/md/classes/Log.md#_logtoconsole)
- [\_logToFile](/docs/md/classes/Log.md#_logtofile)
- [dashline](/docs/md/classes/Log.md#dashline)
- [debug](/docs/md/classes/Log.md#debug)
- [deleteLogFiles](/docs/md/classes/Log.md#deletelogfiles)
- [error](/docs/md/classes/Log.md#error)
- [getProperties](/docs/md/classes/Log.md#getproperties)
- [info](/docs/md/classes/Log.md#info)
- [initialize](/docs/md/classes/Log.md#initialize)
- [logEmitterEvents](/docs/md/classes/Log.md#logemitterevents)
- [newline](/docs/md/classes/Log.md#newline)
- [task](/docs/md/classes/Log.md#task)
- [taskSync](/docs/md/classes/Log.md#tasksync)
- [warn](/docs/md/classes/Log.md#warn)

## Constructors

### constructor

• **new Log**(`options?`)

Create a new instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ILogOptions`](/docs/md/interfaces/ILogOptions.md) | Options for creating a new instance. |

#### Defined in

lib/Log.ts:124

## Properties

### consoleLogLevel

• `Protected` **consoleLogLevel**: [`LogLevel`](/docs/md/enums/LogLevel.md)

The log level for console output. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.

#### Defined in

lib/Log.ts:29

___

### debugColor

• `Protected` **debugColor**: `Format`

Color format for debug messages when logged to console.

#### Defined in

lib/Log.ts:89

___

### debugToConsole

• `Protected` **debugToConsole**: `boolean`

Whether to debug info to console.

#### Defined in

lib/Log.ts:34

___

### debugToFile

• `Protected` **debugToFile**: `boolean`

Whether to log debug info to the logfile.

#### Defined in

lib/Log.ts:59

___

### errorColor

• `Protected` **errorColor**: `Format`

Color format for error messages when logged to console.

#### Defined in

lib/Log.ts:104

___

### errorToConsole

• `Protected` **errorToConsole**: `boolean`

Whether to log errors to console.

#### Defined in

lib/Log.ts:49

___

### errorToFile

• `Protected` **errorToFile**: `boolean`

Whether to log errors to the logfile.

#### Defined in

lib/Log.ts:74

___

### fileLogLevel

• `Protected` **fileLogLevel**: [`LogLevel`](/docs/md/enums/LogLevel.md)

The log level for the logfile. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.

#### Defined in

lib/Log.ts:54

___

### infoColor

• `Protected` **infoColor**: `Format`

Color format for info messages when logged to console.

#### Defined in

lib/Log.ts:94

___

### infoToConsole

• `Protected` **infoToConsole**: `boolean`

Whether to log info to console.

#### Defined in

lib/Log.ts:39

___

### infoToFile

• `Protected` **infoToFile**: `boolean`

Whether to log info to the logfile.

#### Defined in

lib/Log.ts:64

___

### logDirpath

• `Protected` **logDirpath**: `string`

The directory path of the log file.

#### Defined in

lib/Log.ts:79

___

### logFilepath

• `Protected` **logFilepath**: `string`

The filepath of the log file.

#### Defined in

lib/Log.ts:84

___

### warnColor

• `Protected` **warnColor**: `Format`

Color format for warning messages when logged to console.

#### Defined in

lib/Log.ts:99

___

### warnToConsole

• `Protected` **warnToConsole**: `boolean`

Whether to log warnings to console.

#### Defined in

lib/Log.ts:44

___

### warnToFile

• `Protected` **warnToFile**: `boolean`

Whether to log warnings to the logfile.

#### Defined in

lib/Log.ts:69

___

### optionDefaults

▪ `Static` **optionDefaults**: `Required`<[`ILogOptions`](/docs/md/interfaces/ILogOptions.md)\>

Default options for creating new instances.

#### Defined in

lib/Log.ts:109

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
| `loglevel` | [`LogLevel`](/docs/md/enums/LogLevel.md) | The log level. |
| `message` | `T` | The message to print to console. |
| `color` | `Format` | A 'cli-color' module function to wrap the output-part of the string in color formatting. |
| `depth?` | ``null`` \| `number` | The depth to which to print object properties. |

#### Returns

`void`

#### Defined in

lib/Log.ts:313

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
| `loglevel` | [`LogLevel`](/docs/md/enums/LogLevel.md) | The log level. |
| `message` | `T` | The message to print to console. |

#### Returns

`void`

#### Defined in

lib/Log.ts:296

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

lib/Log.ts:260

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

lib/Log.ts:170

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

lib/Log.ts:235

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

lib/Log.ts:201

___

### getProperties

▸ **getProperties**(): `Object`

Get the current instance's properties.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `consoleLogLevel` | [`LogLevel`](/docs/md/enums/LogLevel.md) |
| `debugColor` | `Format` |
| `debugToConsole` | `boolean` |
| `debugToFile` | `boolean` |
| `errorColor` | `Format` |
| `errorToConsole` | `boolean` |
| `errorToFile` | `boolean` |
| `fileLogLevel` | [`LogLevel`](/docs/md/enums/LogLevel.md) |
| `infoColor` | `Format` |
| `infoToConsole` | `boolean` |
| `infoToFile` | `boolean` |
| `logDirpath` | `string` |
| `logFilepath` | `string` |
| `warnColor` | `Format` |
| `warnToConsole` | `boolean` |
| `warnToFile` | `boolean` |

#### Defined in

lib/Log.ts:330

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

lib/Log.ts:181

___

### initialize

▸ **initialize**(`options?`): `void`

Re-initialize the current instance with the specified options.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ILogOptions`](/docs/md/interfaces/ILogOptions.md) |

#### Returns

`void`

#### Defined in

lib/Log.ts:161

___

### logEmitterEvents

▸ **logEmitterEvents**(`emitter`, `options?`): `void`

This function is used to print the events emitted by an EventEmitter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The EventEmitter that is emitting the events. |
| `options` | [`ILogEmitterEventsOptions`](/docs/md/interfaces/ILogEmitterEventsOptions.md) | Options for logging the events. |

#### Returns

`void`

**`Remarks`**

This function allows you to see what events are being emitted by an EventEmitter at runtime.

#### Defined in

lib/Log.ts:273

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

lib/Log.ts:250

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

lib/Log.ts:211

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

lib/Log.ts:223

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

lib/Log.ts:191
