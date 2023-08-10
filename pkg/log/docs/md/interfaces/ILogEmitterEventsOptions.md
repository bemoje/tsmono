[@bemoje/log](/docs/md/index.md) / ILogEmitterEventsOptions

# Interface: ILogEmitterEventsOptions

## Table of contents

### Properties

- [debug](/docs/md/interfaces/ILogEmitterEventsOptions.md#debug)
- [error](/docs/md/interfaces/ILogEmitterEventsOptions.md#error)
- [eventNamePrefix](/docs/md/interfaces/ILogEmitterEventsOptions.md#eventnameprefix)
- [info](/docs/md/interfaces/ILogEmitterEventsOptions.md#info)
- [warn](/docs/md/interfaces/ILogEmitterEventsOptions.md#warn)

## Properties

### debug

• `Optional` **debug**: `string`[]

The event names to log at debug level.

#### Defined in

lib/types/ILogEmitterEventsOptions.ts:5

___

### error

• `Optional` **error**: `string`[]

The event names to log at error level.

#### Defined in

lib/types/ILogEmitterEventsOptions.ts:20

___

### eventNamePrefix

• `Optional` **eventNamePrefix**: `string`

For example a class name, so that emitted events are displayed as className.eventName.

#### Defined in

lib/types/ILogEmitterEventsOptions.ts:25

___

### info

• `Optional` **info**: `string`[]

The event names to log at info level.

#### Defined in

lib/types/ILogEmitterEventsOptions.ts:10

___

### warn

• `Optional` **warn**: `string`[]

The event names to log at warn level.

#### Defined in

lib/types/ILogEmitterEventsOptions.ts:15
