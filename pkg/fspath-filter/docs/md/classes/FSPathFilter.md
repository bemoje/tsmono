[@bemoje/fspath-filter](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/index.md) / FSPathFilter

# Class: FSPathFilter

Builder class to easily and flexibly construct and implement filesystem path filtering.

## Hierarchy

- `EventEmitter`

  ↳ **`FSPathFilter`**

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#constructor)

### Properties

- [dirpathFilters](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#dirpathfilters)
- [dirpathRegex](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#dirpathregex)
- [filenameFilters](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#filenamefilters)
- [filenameRegex](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#filenameregex)
- [filepathFilters](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#filepathfilters)
- [filepathRegex](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#filepathregex)
- [isCaseInsensitive](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#iscaseinsensitive)
- [captureRejectionSymbol](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#capturerejectionsymbol)
- [captureRejections](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#capturerejections)
- [defaultMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#defaultmaxlisteners)
- [errorMonitor](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#errormonitor)

### Accessors

- [ignoreOptionDefaults](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#ignoreoptiondefaults)

### Methods

- [addListener](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#addlistener)
- [emit](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#emit)
- [eventNames](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#eventnames)
- [filterDirpath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#filterdirpath)
- [filterFilename](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#filterfilename)
- [filterFilepath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#filterfilepath)
- [getMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#getmaxlisteners)
- [handleOptions](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#handleoptions)
- [ignoreDirpath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#ignoredirpath)
- [ignoreDirpathRegex](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#ignoredirpathregex)
- [ignoreExtension](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#ignoreextension)
- [ignoreFilename](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#ignorefilename)
- [ignoreFilenameRegex](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#ignorefilenameregex)
- [ignoreFilepath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#ignorefilepath)
- [ignoreFilepathRegex](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#ignorefilepathregex)
- [listenerCount](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#listenercount)
- [listeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#listeners)
- [off](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#off)
- [on](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#on)
- [once](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#once)
- [prependListener](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#prependlistener)
- [prependOnceListener](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#prependoncelistener)
- [rawListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#rawlisteners)
- [removeAllListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#removealllisteners)
- [removeListener](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#removelistener)
- [setMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#setmaxlisteners)
- [validateDirpath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#validatedirpath)
- [validateFilename](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#validatefilename)
- [validateFilepath](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#validatefilepath)
- [getEventListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#geteventlisteners)
- [getMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#getmaxlisteners-1)
- [listenerCount](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#listenercount-1)
- [on](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#on-1)
- [once](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#once-1)
- [setMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#setmaxlisteners-1)

## Constructors

### constructor

• **new FSPathFilter**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.captureRejections?` | `boolean` |

#### Overrides

EventEmitter.constructor

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:31](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L31)

## Properties

### dirpathFilters

• `Protected` **dirpathFilters**: (`path`: `string`) => `boolean`[] = `[]`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:22](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L22)

___

### dirpathRegex

• `Protected` **dirpathRegex**: `RegExp`[] = `[]`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:26](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L26)

___

### filenameFilters

• `Protected` **filenameFilters**: (`path`: `string`) => `boolean`[] = `[]`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:23](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L23)

___

### filenameRegex

• `Protected` **filenameRegex**: `RegExp`[] = `[]`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:27](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L27)

___

### filepathFilters

• `Protected` **filepathFilters**: (`path`: `string`) => `boolean`[] = `[]`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:21](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L21)

___

### filepathRegex

• `Protected` **filepathRegex**: `RegExp`[] = `[]`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:25](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L25)

___

### isCaseInsensitive

• **isCaseInsensitive**: `boolean`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:29](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L29)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#capturerejectionsymbol)

Value: `Symbol.for('nodejs.rejection')`

See how to write a custom `rejection handler`.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

EventEmitter.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:355

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Value: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Change the default `captureRejections` option on all new `EventEmitter` objects.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

EventEmitter.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:362

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_`EventEmitter` instances, the `events.defaultMaxListeners`property can be used. If this value is not a positive number, a `RangeError`is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_`EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()`methods can be used to
temporarily avoid this warning:

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

**`Since`**

v0.11.2

#### Inherited from

EventEmitter.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:399

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`events. Listeners installed using this symbol are called before the regular`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an`'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

**`Since`**

v13.6.0, v12.17.0

#### Inherited from

EventEmitter.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:348

## Accessors

### ignoreOptionDefaults

• `Static` `Protected` `get` **ignoreOptionDefaults**(): [`IPathFilterIgnoreOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/interfaces/IPathFilterIgnoreOptions.md)

Returns a new object with the default ignore options.

#### Returns

[`IPathFilterIgnoreOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/interfaces/IPathFilterIgnoreOptions.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L14)

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Alias for `emitter.on(eventName, listener)`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v0.1.26

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:419

___

### emit

▸ **emit**(`eventName`, `...args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

**`Since`**

v0.1.26

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/@types/node/events.d.ts:681

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

**`Since`**

v6.0.0

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:744

___

### filterDirpath

▸ **filterDirpath**(`filter`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a custom filter function for validating dirpaths.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`path`: `string`) => `boolean` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:100](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L100)

___

### filterFilename

▸ **filterFilename**(`filter`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a custom filter function for validating filenames.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`path`: `string`) => `boolean` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:108](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L108)

___

### filterFilepath

▸ **filterFilepath**(`filter`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a custom filter function for validating filepaths

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`path`: `string`) => `boolean` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:92](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L92)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md#defaultmaxlisteners).

#### Returns

`number`

**`Since`**

v1.0.0

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:596

___

### handleOptions

▸ `Protected` **handleOptions**(`escaped`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `escaped` | `string` |
| `options?` | [`IPathFilterIgnoreOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/interfaces/IPathFilterIgnoreOptions.md) |

#### Returns

`string`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:35](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L35)

___

### ignoreDirpath

▸ **ignoreDirpath**(`ignore`, `options?`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a whole or partial dirname to ignore.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ignore` | `string` |
| `options?` | [`IPathFilterIgnoreOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/interfaces/IPathFilterIgnoreOptions.md) |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:57](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L57)

___

### ignoreDirpathRegex

▸ **ignoreDirpathRegex**(`regex`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a custom regex object for matching dirpaths to be ignored.

#### Parameters

| Name | Type |
| :------ | :------ |
| `regex` | `RegExp` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:124](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L124)

___

### ignoreExtension

▸ **ignoreExtension**(`ignore`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a file extension type to ignore.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ignore` | `string` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:81](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L81)

___

### ignoreFilename

▸ **ignoreFilename**(`ignore`, `options?`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a whole or partial filename to ignore.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ignore` | `string` |
| `options?` | [`IPathFilterIgnoreOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/interfaces/IPathFilterIgnoreOptions.md) |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:69](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L69)

___

### ignoreFilenameRegex

▸ **ignoreFilenameRegex**(`regex`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a custom regex object for matching filenames to be ignored.

#### Parameters

| Name | Type |
| :------ | :------ |
| `regex` | `RegExp` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:132](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L132)

___

### ignoreFilepath

▸ **ignoreFilepath**(`ignore`, `options?`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a whole or partial filepath to ignore.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ignore` | `string` |
| `options?` | [`IPathFilterIgnoreOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/interfaces/IPathFilterIgnoreOptions.md) |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:45](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L45)

___

### ignoreFilepathRegex

▸ **ignoreFilepathRegex**(`regex`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Add a custom regex object for matching filepaths to be ignored.

#### Parameters

| Name | Type |
| :------ | :------ |
| `regex` | `RegExp` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:116](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L116)

___

### listenerCount

▸ **listenerCount**(`eventName`, `listener?`): `number`

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |
| `listener?` | `Function` | The event handler function |

#### Returns

`number`

**`Since`**

v3.2.0

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:690

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v0.1.26

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/@types/node/events.d.ts:609

___

### off

▸ **off**(`eventName`, `listener`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Alias for `emitter.removeListener()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v10.0.0

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:569

___

### on

▸ **on**(`eventName`, `listener`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v0.1.101

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:451

___

### once

▸ **once**(`eventName`, `listener`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v0.3.0

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:481

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v6.0.0

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:708

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v6.0.0

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:724

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v9.4.0

#### Inherited from

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:640

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v0.1.26

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:580

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v0.1.26

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:564

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`FSPathFilter`](https://github.com/bemoje/tsmono/blob/main/pkg/fspath-filter/docs/md/classes/FSPathFilter.md)

**`Since`**

v0.3.5

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:590

___

### validateDirpath

▸ **validateDirpath**(`dirpath`): `boolean`

Performs the configured dirpath filtering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dirpath` | `string` |

#### Returns

`boolean`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:159](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L159)

___

### validateFilename

▸ **validateFilename**(`filename`): `boolean`

Performs the configured filename filtering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filename` | `string` |

#### Returns

`boolean`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:179](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L179)

___

### validateFilepath

▸ **validateFilepath**(`filepath`): `boolean`

Performs the configured filepath filtering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filepath` | `string` |

#### Returns

`boolean`

#### Defined in

[pkg/fspath-filter/src/lib/FSPathFilter.ts:140](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/fspath-filter/src/lib/FSPathFilter.ts#L140)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v15.2.0, v14.17.0

#### Inherited from

EventEmitter.getEventListeners

#### Defined in

node_modules/@types/node/events.d.ts:296

___

### getMaxListeners

▸ `Static` **getMaxListeners**(`emitter`): `number`

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```js
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |

#### Returns

`number`

**`Since`**

v19.9.0

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:325

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:268

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

**`Since`**

v13.6.0, v12.16.0

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:250

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

**`Since`**

v11.13.0, v10.16.0

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:189

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:190

___

### setMaxListeners

▸ `Static` **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventEmitter` \| `_DOMEventTarget`)[] | - |

#### Returns

`void`

**`Since`**

v15.4.0

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:340
