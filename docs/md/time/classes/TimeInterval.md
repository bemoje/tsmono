[@bemoje/time](https://github.com/bemoje/tsmono/blob/main/docs/md/time/index.md) / TimeInterval

# Class: TimeInterval

Represents a time interval.

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/TimeInterval.md#constructor)

### Properties

- [end](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/TimeInterval.md#end)
- [start](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/TimeInterval.md#start)

### Methods

- [getDuration](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/TimeInterval.md#getduration)
- [toString](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/TimeInterval.md#tostring)

## Constructors

### constructor

• **new TimeInterval**(`start`, `end`)

Creates a new TimeInterval instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | [`Time`](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/Time.md) | The start of the interval. |
| `end` | [`Time`](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/Time.md) | The end of the interval. |

**`Throws`**

if the start time is after the end time.

#### Defined in

[lib/TimeInterval.ts:23](https://github.com/bemoje/tsmono/blob/87185a0/pkg/time/src/lib/TimeInterval.ts#L23)

## Properties

### end

• **end**: [`Time`](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/Time.md)

The end of the interval.

#### Defined in

[lib/TimeInterval.ts:15](https://github.com/bemoje/tsmono/blob/87185a0/pkg/time/src/lib/TimeInterval.ts#L15)

___

### start

• **start**: [`Time`](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/Time.md)

The start of the interval.

#### Defined in

[lib/TimeInterval.ts:10](https://github.com/bemoje/tsmono/blob/87185a0/pkg/time/src/lib/TimeInterval.ts#L10)

## Methods

### getDuration

▸ **getDuration**(): [`Time`](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/Time.md)

Returns the duration of the interval as a new Time instance.

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/docs/md/time/classes/Time.md)

#### Defined in

[lib/TimeInterval.ts:32](https://github.com/bemoje/tsmono/blob/87185a0/pkg/time/src/lib/TimeInterval.ts#L32)

___

### toString

▸ **toString**(`delimiter?`, `msDelimiter?`): `string`

Returns the interval as a string, rendering both the start and end times.
Renders in the format "HH:MM:SS.mmm --> HH:MM:SS.mmm", with the default delimiter being " --> ".

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `delimiter` | `string` | `' --> '` | The delimiter between the start and end times. |
| `msDelimiter` | `string` | `'.'` | The delimiter between seconds and milliseconds. |

#### Returns

`string`

#### Defined in

[lib/TimeInterval.ts:42](https://github.com/bemoje/tsmono/blob/87185a0/pkg/time/src/lib/TimeInterval.ts#L42)
