[@bemoje/time](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md) / Time

# Class: Time

Represents a time of day or a duration.
Precision is from hours to miliseconds.

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#constructor)

### Properties

- [ms](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#ms)

### Accessors

- [hours](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#hours)
- [milliseconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#milliseconds)
- [minutes](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#minutes)
- [seconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#seconds)

### Methods

- [addHours](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#addhours)
- [addMilliseconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#addmilliseconds)
- [addMinutes](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#addminutes)
- [addSeconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#addseconds)
- [clone](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#clone)
- [compareTo](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#compareto)
- [difference](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#difference)
- [subtractHours](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#subtracthours)
- [subtractMilliseconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#subtractmilliseconds)
- [subtractMinutes](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#subtractminutes)
- [subtractSeconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#subtractseconds)
- [toArray](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#toarray)
- [toNumber](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#tonumber)
- [toString](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#tostring)
- [valueOf](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md#valueof)

## Constructors

### constructor

• **new Time**(`input`)

Creates a new Time instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` \| `number`[] | The time in millisecond representation, or a string in the format "HH:MM:SS.mmm", or an array in the format [HH, MM, SS, mmm]. |

**`Throws`**

if the time is invalid.

#### Defined in

[lib/Time.ts:27](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L27)

## Properties

### ms

• `Protected` **ms**: `number`

The time in millisecond representation.
This is the only value stored internally.

#### Defined in

[lib/Time.ts:20](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L20)

## Accessors

### hours

• `get` **hours**(): `number`

Returns the hours.

#### Returns

`number`

#### Defined in

[lib/Time.ts:137](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L137)

• `set` **hours**(`value`): `void`

Set the hours to a specified value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to set the hours to. |

#### Returns

`void`

**`Throws`**

if the value is invalid.

#### Defined in

[lib/Time.ts:146](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L146)

___

### milliseconds

• `get` **milliseconds**(): `number`

Returns the milliseconds.

#### Returns

`number`

#### Defined in

[lib/Time.ts:188](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L188)

• `set` **milliseconds**(`value`): `void`

Set the milliseconds to a specified value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to set the milliseconds to. |

#### Returns

`void`

**`Throws`**

if the value is invalid.

#### Defined in

[lib/Time.ts:197](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L197)

___

### minutes

• `get` **minutes**(): `number`

Returns the minutes.

#### Returns

`number`

#### Defined in

[lib/Time.ts:154](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L154)

• `set` **minutes**(`value`): `void`

Set the minutes to a specified value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to set the minutes to. |

#### Returns

`void`

**`Throws`**

if the value is invalid.

#### Defined in

[lib/Time.ts:163](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L163)

___

### seconds

• `get` **seconds**(): `number`

Returns the seconds.

#### Returns

`number`

#### Defined in

[lib/Time.ts:171](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L171)

• `set` **seconds**(`value`): `void`

Set the seconds to a specified value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to set the seconds to. |

#### Returns

`void`

**`Throws`**

if the value is invalid.

#### Defined in

[lib/Time.ts:180](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L180)

## Methods

### addHours

▸ **addHours**(`hours`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Adds the specified amount of hours to the current time.
Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hours` | `number` | The amount of hours to add. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`Throws`**

if the time becomes invalid after the operation.

#### Defined in

[lib/Time.ts:44](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L44)

___

### addMilliseconds

▸ **addMilliseconds**(`milliseconds`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Adds the specified amount of milliseconds to the current time.
Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milliseconds` | `number` | The amount of milliseconds to add. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`Throws`**

if the time becomes invalid after the operation.

#### Defined in

[lib/Time.ts:80](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L80)

___

### addMinutes

▸ **addMinutes**(`minutes`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Adds the specified amount of minutes to the current time.
Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minutes` | `number` | The amount of minutes to add. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`Throws`**

if the time becomes invalid after the operation.

#### Defined in

[lib/Time.ts:56](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L56)

___

### addSeconds

▸ **addSeconds**(`seconds`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Adds the specified amount of seconds to the current time.
Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seconds` | `number` | The amount of seconds to add. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`Throws`**

if the time becomes invalid after the operation.

#### Defined in

[lib/Time.ts:68](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L68)

___

### clone

▸ **clone**(): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Returns a new Time instance.

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

#### Defined in

[lib/Time.ts:252](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L252)

___

### compareTo

▸ **compareTo**(`other`): `number`

Compares this instance to another by comparing millisecond representations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md) | The other Time instance to compare to. |

#### Returns

`number`

**`See`**

difference for getting the difference as a new Time instance.

#### Defined in

[lib/Time.ts:236](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L236)

___

### difference

▸ **difference**(`other`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Returns a new Time instance that represents the time difference between this instance and another.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md) | The other Time instance to compare to. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`See`**

compareTo for getting the difference in milliseconds.

#### Defined in

[lib/Time.ts:245](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L245)

___

### subtractHours

▸ **subtractHours**(`hours`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Subtracts the specified amount of hours from the current time.
Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hours` | `number` | The amount of hours to subtract. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`Throws`**

if the time becomes invalid after the operation.

#### Defined in

[lib/Time.ts:92](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L92)

___

### subtractMilliseconds

▸ **subtractMilliseconds**(`milliseconds`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Subtracts the specified amount of milliseconds from the current time.
Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `milliseconds` | `number` | The amount of milliseconds to subtract. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`Throws`**

if the time becomes invalid after the operation.

#### Defined in

[lib/Time.ts:128](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L128)

___

### subtractMinutes

▸ **subtractMinutes**(`minutes`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Subtracts the specified amount of minutes from the current time.
Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minutes` | `number` | The amount of minutes to subtract. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`Throws`**

if the time becomes invalid after the operation.

#### Defined in

[lib/Time.ts:104](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L104)

___

### subtractSeconds

▸ **subtractSeconds**(`seconds`): [`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

Subtracts the specified amount of seconds from the current time.
Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seconds` | `number` | The amount of seconds to subtract. |

#### Returns

[`Time`](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)

**`Throws`**

if the time becomes invalid after the operation.

#### Defined in

[lib/Time.ts:116](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L116)

___

### toArray

▸ **toArray**(): `number`[]

Returns the time as an array in the format [HH, MM, SS, mmm].

#### Returns

`number`[]

#### Defined in

[lib/Time.ts:205](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L205)

___

### toNumber

▸ **toNumber**(): `number`

Returns the time in millisecond representation.

#### Returns

`number`

#### Defined in

[lib/Time.ts:220](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L220)

___

### toString

▸ **toString**(`msDelimiter?`): `string`

Returns the time as a string in the format "HH:MM:SS.mmm".

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `msDelimiter` | `string` | `'.'` | The delimiter between seconds and milliseconds. |

#### Returns

`string`

#### Defined in

[lib/Time.ts:213](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L213)

___

### valueOf

▸ **valueOf**(): `number`

Returns the time in millisecond representation.

#### Returns

`number`

#### Defined in

[lib/Time.ts:227](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/Time.ts#L227)
