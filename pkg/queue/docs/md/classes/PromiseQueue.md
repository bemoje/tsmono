[@bemoje/queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md) / PromiseQueue

# Class: PromiseQueue<QueueType, EnqueueOptionsType\>

Promise queue with concurrency control.
ESM compatible port from https://www.npmjs.com/package/p-queue

## Type parameters

| Name | Type |
| :------ | :------ |
| `QueueType` | extends [`IQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md)<() => `Promise`<`unknown`\>, `EnqueueOptionsType`\> = [`PriorityQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md) |
| `EnqueueOptionsType` | extends [`IQueueAddOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md) = [`IQueueAddOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md) |

## Hierarchy

- `EventEmitter`

  ↳ **`PromiseQueue`**

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#constructor)

### Properties

- [\_carryoverConcurrencyCount](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_carryoverconcurrencycount)
- [\_concurrency](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_concurrency)
- [\_interval](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_interval)
- [\_intervalCap](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_intervalcap)
- [\_intervalCount](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_intervalcount)
- [\_intervalEnd](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_intervalend)
- [\_intervalId](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_intervalid)
- [\_isIntervalIgnored](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_isintervalignored)
- [\_isPaused](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_ispaused)
- [\_pending](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_pending)
- [\_queue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_queue)
- [\_queueClass](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_queueclass)
- [\_timeoutId](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_timeoutid)
- [captureRejectionSymbol](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#capturerejectionsymbol)
- [captureRejections](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#capturerejections)
- [defaultMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#defaultmaxlisteners)
- [errorMonitor](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#errormonitor)

### Accessors

- [\_doesConcurrentAllowAnother](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_doesconcurrentallowanother)
- [\_doesIntervalAllowAnother](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_doesintervalallowanother)
- [\_isIntervalPaused](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_isintervalpaused)
- [concurrency](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#concurrency)
- [isPaused](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#ispaused)
- [pending](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#pending)
- [size](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#size)

### Methods

- [\_initializeIntervalIfNeeded](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_initializeintervalifneeded)
- [\_next](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_next)
- [\_onEvent](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_onevent)
- [\_onInterval](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_oninterval)
- [\_onResumeInterval](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_onresumeinterval)
- [\_processQueue](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_processqueue)
- [\_throwOnAbort](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_throwonabort)
- [\_tryToStartAnother](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#_trytostartanother)
- [add](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#add)
- [addAll](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#addall)
- [addListener](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#addlistener)
- [clear](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#clear)
- [emit](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#emit)
- [eventNames](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#eventnames)
- [getMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#getmaxlisteners)
- [listenerCount](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#listenercount)
- [listeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#listeners)
- [off](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#off)
- [on](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#on)
- [onEmpty](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#onempty)
- [onIdle](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#onidle)
- [onSizeLessThan](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#onsizelessthan)
- [once](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#once)
- [pause](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#pause)
- [prependListener](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#prependlistener)
- [prependOnceListener](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#prependoncelistener)
- [rawListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#rawlisteners)
- [removeAllListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#removealllisteners)
- [removeListener](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#removelistener)
- [setMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#setmaxlisteners)
- [sizeBy](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#sizeby)
- [start](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#start)
- [getEventListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#geteventlisteners)
- [getMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#getmaxlisteners-1)
- [listenerCount](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#listenercount-1)
- [on](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#on-1)
- [once](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#once-1)
- [setMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#setmaxlisteners-1)

## Constructors

### constructor

• **new PromiseQueue**<`QueueType`, `EnqueueOptionsType`\>(`options?`)

Creates a new `PromiseQueue` instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `QueueType` | extends [`IQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueue.md)<() => `Promise`<`unknown`\>, `EnqueueOptionsType`\> = [`PriorityQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PriorityQueue.md) |
| `EnqueueOptionsType` | extends [`IQueueAddOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md) = [`IQueueAddOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IQueueAddOptions.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`IPromiseQueueOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/interfaces/IPromiseQueueOptions.md)<`QueueType`, `EnqueueOptionsType`\> |

#### Overrides

EventEmitter.constructor

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:35](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L35)

## Properties

### \_carryoverConcurrencyCount

• `Readonly` **\_carryoverConcurrencyCount**: `boolean`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:18](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L18)

___

### \_concurrency

• **\_concurrency**: `number`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:29](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L29)

___

### \_interval

• `Readonly` **\_interval**: `number`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:22](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L22)

___

### \_intervalCap

• `Readonly` **\_intervalCap**: `number`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:21](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L21)

___

### \_intervalCount

• **\_intervalCount**: `number` = `0`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:20](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L20)

___

### \_intervalEnd

• **\_intervalEnd**: `number` = `0`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:23](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L23)

___

### \_intervalId

• `Optional` **\_intervalId**: `Timeout`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:24](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L24)

___

### \_isIntervalIgnored

• `Readonly` **\_isIntervalIgnored**: `boolean`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:19](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L19)

___

### \_isPaused

• **\_isPaused**: `boolean`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:30](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L30)

___

### \_pending

• **\_pending**: `number` = `0`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:28](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L28)

___

### \_queue

• **\_queue**: `QueueType`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:26](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L26)

___

### \_queueClass

• `Readonly` **\_queueClass**: () => `QueueType`

#### Type declaration

• **new _queueClass**()

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:27](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L27)

___

### \_timeoutId

• `Optional` **\_timeoutId**: `Timeout`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:25](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L25)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#capturerejectionsymbol)

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

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#errormonitor)

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

### \_doesConcurrentAllowAnother

• `get` **_doesConcurrentAllowAnother**(): `boolean`

#### Returns

`boolean`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:77](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L77)

___

### \_doesIntervalAllowAnother

• `get` **_doesIntervalAllowAnother**(): `boolean`

#### Returns

`boolean`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:73](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L73)

___

### \_isIntervalPaused

• `get` **_isIntervalPaused**(): `boolean`

#### Returns

`boolean`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:93](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L93)

___

### concurrency

• `get` **concurrency**(): `number`

#### Returns

`number`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:173](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L173)

• `set` **concurrency**(`newConcurrency`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newConcurrency` | `number` |

#### Returns

`void`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:177](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L177)

___

### isPaused

• `get` **isPaused**(): `boolean`

Whether the queue is currently paused.

#### Returns

`boolean`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:362](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L362)

___

### pending

• `get` **pending**(): `number`

Number of running items (no longer in the queue).

#### Returns

`number`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:355](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L355)

___

### size

• `get` **size**(): `number`

Size of the queue, the number of queued items waiting to run.

#### Returns

`number`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:340](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L340)

## Methods

### \_initializeIntervalIfNeeded

▸ **_initializeIntervalIfNeeded**(): `void`

#### Returns

`void`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:146](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L146)

___

### \_next

▸ **_next**(): `void`

#### Returns

`void`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:81](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L81)

___

### \_onEvent

▸ **_onEvent**(`event`, `filter?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`PromiseQueueEvent`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md#promisequeueevent) |
| `filter?` | () => `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:324](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L324)

___

### \_onInterval

▸ **_onInterval**(): `void`

#### Returns

`void`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:156](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L156)

___

### \_onResumeInterval

▸ **_onResumeInterval**(): `void`

#### Returns

`void`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:87](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L87)

___

### \_processQueue

▸ **_processQueue**(): `void`

Executes all queued functions until it reaches the limit.

#### Returns

`void`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:168](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L168)

___

### \_throwOnAbort

▸ **_throwOnAbort**(`signal`): `Promise`<`never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal` | `AbortSignal` |

#### Returns

`Promise`<`never`\>

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:187](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L187)

___

### \_tryToStartAnother

▸ **_tryToStartAnother**(): `boolean`

#### Returns

`boolean`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:114](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L114)

___

### add

▸ **add**<`TaskResultType`\>(`function_`, `options`): `Promise`<`TaskResultType`\>

Adds a sync or async task to the queue. Always returns a promise.

#### Type parameters

| Name |
| :------ |
| `TaskResultType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `function_` | [`PromiseQueueTask`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md#promisequeuetask)<`TaskResultType`\> |
| `options` | `Exclude`<`EnqueueOptionsType`, ``"throwOnTimeout"``\> |

#### Returns

`Promise`<`TaskResultType`\>

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:202](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L202)

▸ **add**<`TaskResultType`\>(`function_`, `options?`): `Promise`<`void` \| `TaskResultType`\>

#### Type parameters

| Name |
| :------ |
| `TaskResultType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `function_` | [`PromiseQueueTask`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md#promisequeuetask)<`TaskResultType`\> |
| `options?` | `Partial`<`EnqueueOptionsType`\> |

#### Returns

`Promise`<`void` \| `TaskResultType`\>

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:206](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L206)

___

### addAll

▸ **addAll**<`TaskResultsType`\>(`functions`, `options?`): `Promise`<`TaskResultsType`[]\>

Same as `.add()`, but accepts an array of sync or async functions.

#### Type parameters

| Name |
| :------ |
| `TaskResultsType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `functions` | readonly [`PromiseQueueTask`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md#promisequeuetask)<`TaskResultsType`\>[] |
| `options?` | `Partial`<`Exclude`<`EnqueueOptionsType`, ``"throwOnTimeout"``\>\> |

#### Returns

`Promise`<`TaskResultsType`[]\>

A promise that resolves when all functions are resolved.

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:246](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L246)

▸ **addAll**<`TaskResultsType`\>(`functions`, `options?`): `Promise`<(`void` \| `TaskResultsType`)[]\>

#### Type parameters

| Name |
| :------ |
| `TaskResultsType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `functions` | readonly [`PromiseQueueTask`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/index.md#promisequeuetask)<`TaskResultsType`\>[] |
| `options?` | `Partial`<`EnqueueOptionsType`\> |

#### Returns

`Promise`<(`void` \| `TaskResultsType`)[]\>

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:250](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L250)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

Alias for `emitter.on(eventName, listener)`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

**`Since`**

v0.1.26

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:419

___

### clear

▸ **clear**(): `void`

Clear the queue.

#### Returns

`void`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:283](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L283)

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

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md#defaultmaxlisteners).

#### Returns

`number`

**`Since`**

v1.0.0

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:596

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

▸ **off**(`eventName`, `listener`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

Alias for `emitter.removeListener()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

**`Since`**

v10.0.0

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:569

___

### on

▸ **on**(`eventName`, `listener`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

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

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

**`Since`**

v0.1.101

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:451

___

### onEmpty

▸ **onEmpty**(): `Promise`<`void`\>

Can be called multiple times. Useful if you for example add additional items at a later time.

#### Returns

`Promise`<`void`\>

A promise that settles when the queue becomes empty.

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:291](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L291)

___

### onIdle

▸ **onIdle**(): `Promise`<`void`\>

The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.

#### Returns

`Promise`<`void`\>

A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:316](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L316)

___

### onSizeLessThan

▸ **onSizeLessThan**(`limit`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |

#### Returns

`Promise`<`void`\>

A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:304](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L304)

___

### once

▸ **once**(`eventName`, `listener`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

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

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

**`Since`**

v0.3.0

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:481

___

### pause

▸ **pause**(): `void`

Put queue execution on hold.

#### Returns

`void`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:276](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L276)

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

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

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

**`Since`**

v6.0.0

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:708

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

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

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

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

▸ **removeAllListeners**(`event?`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

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

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

**`Since`**

v0.1.26

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:580

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

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

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

**`Since`**

v0.1.26

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:564

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

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

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

**`Since`**

v0.3.5

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:590

___

### sizeBy

▸ **sizeBy**(`options`): `number`

Size of the queue, filtered by the given options.
For example, this can be used to find the number of items remaining in the queue with a specific priority level.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Readonly`<`Partial`<`EnqueueOptionsType`\>\> |

#### Returns

`number`

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:348](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L348)

___

### start

▸ **start**(): [`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)

#### Returns

[`PromiseQueue`](https://github.com/bemoje/tsmono/blob/main/pkg/queue/docs/md/classes/PromiseQueue.md)<`QueueType`, `EnqueueOptionsType`\>

#### Defined in

[pkg/queue/src/lib/PromiseQueue.ts:264](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/queue/src/lib/PromiseQueue.ts#L264)

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
