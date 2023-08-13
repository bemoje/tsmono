[@bemoje/log](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/index.md) / ILogEmitterEventsOptions

# Interface: ILogEmitterEventsOptions

## Table of contents

### Properties

- [debug](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogEmitterEventsOptions.md#debug)
- [error](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogEmitterEventsOptions.md#error)
- [eventNamePrefix](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogEmitterEventsOptions.md#eventnameprefix)
- [info](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogEmitterEventsOptions.md#info)
- [warn](https://github.com/bemoje/tsmono/blob/main/pkg/log/docs/md/interfaces/ILogEmitterEventsOptions.md#warn)

## Properties

### debug

• `Optional` **debug**: `string`[]

The event names to log at debug level.

#### Defined in

[lib/types/ILogEmitterEventsOptions.ts:5](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/log/src/lib/types/ILogEmitterEventsOptions.ts#L5)

___

### error

• `Optional` **error**: `string`[]

The event names to log at error level.

#### Defined in

[lib/types/ILogEmitterEventsOptions.ts:20](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/log/src/lib/types/ILogEmitterEventsOptions.ts#L20)

___

### eventNamePrefix

• `Optional` **eventNamePrefix**: `string`

For example a class name, so that emitted events are displayed as className.eventName.

#### Defined in

[lib/types/ILogEmitterEventsOptions.ts:25](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/log/src/lib/types/ILogEmitterEventsOptions.ts#L25)

___

### info

• `Optional` **info**: `string`[]

The event names to log at info level.

#### Defined in

[lib/types/ILogEmitterEventsOptions.ts:10](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/log/src/lib/types/ILogEmitterEventsOptions.ts#L10)

___

### warn

• `Optional` **warn**: `string`[]

The event names to log at warn level.

#### Defined in

[lib/types/ILogEmitterEventsOptions.ts:15](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/log/src/lib/types/ILogEmitterEventsOptions.ts#L15)
