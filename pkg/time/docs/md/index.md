@bemoje/time

# @bemoje/time

## Table of contents

### Classes

- [Time](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/Time.md)
- [TimeInterval](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/classes/TimeInterval.md)

### Functions

- [assertValidHours](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidhours)
- [assertValidMilliseconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidmilliseconds)
- [assertValidMinutes](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidminutes)
- [assertValidSeconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidseconds)
- [assertValidTime](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidtime)
- [assertValidTimeArray](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidtimearray)
- [assertValidTimeInt](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidtimeint)
- [assertValidTimeString](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidtimestring)
- [assertValidTimeStringFormatting](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#assertvalidtimestringformatting)
- [isValidHours](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidhours)
- [isValidMilliseconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidmilliseconds)
- [isValidMinutes](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidminutes)
- [isValidSeconds](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidseconds)
- [isValidTime](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidtime)
- [isValidTimeArray](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidtimearray)
- [isValidTimeInt](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidtimeint)
- [isValidTimeString](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidtimestring)
- [isValidTimeStringFormatting](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#isvalidtimestringformatting)
- [timeArrayToInt](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timearraytoint)
- [timeArrayToIntUnsafe](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timearraytointunsafe)
- [timeArrayToString](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timearraytostring)
- [timeArrayToStringUnsafe](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timearraytostringunsafe)
- [timeIntToArray](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timeinttoarray)
- [timeIntToArrayUnsafe](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timeinttoarrayunsafe)
- [timeIntToString](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timeinttostring)
- [timeIntToStringUnsafe](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timeinttostringunsafe)
- [timeStringToArray](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timestringtoarray)
- [timeStringToArrayUnsafe](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timestringtoarrayunsafe)
- [timeStringToInt](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timestringtoint)
- [timeStringToIntUnsafe](https://github.com/bemoje/tsmono/blob/main/pkg/time/docs/md/index.md#timestringtointunsafe)

## Functions

### assertValidHours

▸ **assertValidHours**(`n`): `void`

Asserts that the given number is a valid hour (between 0 and 23).
If the number is not a valid hour, it throws an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to be validated. |

#### Returns

`void`

**`Throws`**

Will throw an error if the number is not a valid hour.

**`Example`**

```ts
assertValidHours(12); // No error
assertValidHours(24); // Throws Error: 'Expected hours to be between 0 and 23. Got: 24'
```

#### Defined in

[lib/util/assertValidHours.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidHours.ts#L13)

___

### assertValidMilliseconds

▸ **assertValidMilliseconds**(`n`): `void`

Asserts that the provided number is a valid millisecond value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to be validated. |

#### Returns

`void`

**`Remarks`**

This function throws an error if the provided number is not a valid millisecond value (i.e., between 0 and 999).

**`Throws`**

Will throw an error if the provided number is not a valid millisecond value.

**`Example`**

```ts
assertValidMilliseconds(500); // No error
assertValidMilliseconds(1000); // Throws error
```

#### Defined in

[lib/util/assertValidMilliseconds.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidMilliseconds.ts#L14)

___

### assertValidMinutes

▸ **assertValidMinutes**(`n`): `void`

Asserts that the provided number is a valid minute value (between 0 and 59).
If the number is not valid, it throws an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to be validated. |

#### Returns

`void`

**`Throws`**

Will throw an error if the number is not a valid minute value.

**`Example`**

```ts
assertValidMinutes(30); // No error
assertValidMinutes(60); // Throws Error: 'Expected minutes to be between 0 and 59. Got: 60'
```

#### Defined in

[lib/util/assertValidMinutes.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidMinutes.ts#L13)

___

### assertValidSeconds

▸ **assertValidSeconds**(`n`): `void`

Asserts whether the provided number is a valid second value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to be validated. |

#### Returns

`void`

**`Remarks`**

This function throws an error if the provided number is not a valid second value (i.e., between 0 and 59).

**`Throws`**

Will throw an error if the provided number is not a valid second value.

**`Example`**

```ts
assertValidSeconds(30); // No error
assertValidSeconds(60); // Throws error
```

#### Defined in

[lib/util/assertValidSeconds.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidSeconds.ts#L14)

___

### assertValidTime

▸ **assertValidTime**(`hours`, `minutes`, `seconds`, `milliseconds`): `void`

Asserts that the provided hours, minutes, seconds, and milliseconds are valid.
Throws an error if any of the provided values are not valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hours` | `number` | The hours to validate. Must be a number between 0 and 23. |
| `minutes` | `number` | The minutes to validate. Must be a number between 0 and 59. |
| `seconds` | `number` | The seconds to validate. Must be a number between 0 and 59. |
| `milliseconds` | `number` | The milliseconds to validate. Must be a number between 0 and 999. |

#### Returns

`void`

**`Throws`**

If any of the provided values are not valid.

**`Example`**

```ts
assertValidTime(12, 30, 45, 500); // No error thrown
assertValidTime(24, 60, 60, 1000); // Error thrown
```

#### Defined in

[lib/util/assertValidTime.ts:19](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidTime.ts#L19)

___

### assertValidTimeArray

▸ **assertValidTimeArray**(`array`): `void`

Asserts whether the provided array is a valid time array.
A valid time array is an array of four numbers, where the first two numbers represent hours and minutes, and the last two numbers represent seconds and milliseconds.
Throws an error if the array is not valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `number`[] | The array to be validated. |

#### Returns

`void`

**`Throws`**

Will throw an error if the array length is not 4.

**`Example`**

```ts
assertValidTimeArray([12, 30, 45, 500]); // No error
assertValidTimeArray([12, 30, 45]); // Throws Error: 'Expected array of length 4.'
```

#### Defined in

[lib/util/assertValidTimeArray.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidTimeArray.ts#L14)

___

### assertValidTimeInt

▸ **assertValidTimeInt**(`n`): `void`

Asserts that the provided number is a valid time integer.
A valid time integer is between 0 and 86399999, inclusive.
If the number is not valid, an error is thrown.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to be validated. |

#### Returns

`void`

**`Throws`**

Will throw an error if the number is not a valid time integer.

**`Example`**

```ts
assertValidTimeInt(50000); // No error
assertValidTimeInt(90000000); // Throws Error: 'Expected time int to be between 0 and 86399999. Got: 90000000'
```

#### Defined in

[lib/util/assertValidTimeInt.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidTimeInt.ts#L14)

___

### assertValidTimeString

▸ **assertValidTimeString**(`string`): `void`

Asserts whether the provided string is a valid time string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be validated. |

#### Returns

`void`

**`Remarks`**

This function throws an error if the provided string is not a valid time string.

**`Throws`**

Will throw an error if the string is not a valid time string.

**`Example`**

```ts
assertValidTimeString('12:34:56'); // No error
assertValidTimeString('25:00:00'); // Throws Error
```

#### Defined in

[lib/util/assertValidTimeString.ts:16](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidTimeString.ts#L16)

___

### assertValidTimeStringFormatting

▸ **assertValidTimeStringFormatting**(`string`): `void`

Asserts that the provided string is a valid time string format.
Throws an error if the string is not in the format hh:mm:ss[,|.]mmm.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be validated. |

#### Returns

`void`

**`Throws`**

Will throw an error if the string is not in the correct format.

**`Example`**

```ts
assertValidTimeStringFormatting('12:34:56.789'); // No error thrown
assertValidTimeStringFormatting('12:34:56,789'); // No error thrown
assertValidTimeStringFormatting('12:34:56'); // Throws Error
```

#### Defined in

[lib/util/assertValidTimeStringFormatting.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/assertValidTimeStringFormatting.ts#L14)

___

### isValidHours

▸ **isValidHours**(`n`): `boolean`

Checks if the given number is a valid hour in the 24-hour format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to be checked. |

#### Returns

`boolean`

A boolean indicating whether the number is a valid hour or not.

**`Remarks`**

This function checks if the given number is an integer and falls within the range of 0 to 23 (inclusive).

**`Example`**

```ts
isValidHours(12);  // returns true
isValidHours(24);  // returns false
isValidHours(15.5);  // returns false
```

#### Defined in

[lib/util/isValidHours.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidHours.ts#L13)

___

### isValidMilliseconds

▸ **isValidMilliseconds**(`n`): `boolean`

Checks if the given number is a valid millisecond value.
A valid millisecond value is an integer between 0 and 999 inclusive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to check. |

#### Returns

`boolean`

A boolean indicating whether the number is a valid millisecond value.

**`Example`**

```ts
isValidMilliseconds(500); // returns true
isValidMilliseconds(1000); // returns false
isValidMilliseconds(-1); // returns false
```

#### Defined in

[lib/util/isValidMilliseconds.ts:12](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidMilliseconds.ts#L12)

___

### isValidMinutes

▸ **isValidMinutes**(`n`): `boolean`

Checks if the given number is a valid minute value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to check. |

#### Returns

`boolean`

A boolean indicating whether the number is a valid minute value.

**`Remarks`**

This function checks if the given number is an integer between 0 and 59, inclusive.

**`Example`**

```ts
isValidMinutes(30); // returns true
isValidMinutes(60); // returns false
```

#### Defined in

[lib/util/isValidMinutes.ts:12](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidMinutes.ts#L12)

___

### isValidSeconds

▸ **isValidSeconds**(`n`): `boolean`

Checks if the given number is a valid second value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to check. |

#### Returns

`boolean`

A boolean indicating whether the number is a valid second value.

**`Remarks`**

This function checks if the given number is an integer between 0 and 59 (inclusive).

**`Example`**

```ts
isValidSeconds(30);  // returns true
isValidSeconds(60);  // returns false
isValidSeconds(30.5);  // returns false
```

#### Defined in

[lib/util/isValidSeconds.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidSeconds.ts#L13)

___

### isValidTime

▸ **isValidTime**(`hours`, `minutes`, `seconds`, `milliseconds`): `boolean`

Checks if the provided hours, minutes, seconds, and milliseconds represent a valid time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hours` | `number` | The hours component of the time. Must be an integer between 0 and 23. |
| `minutes` | `number` | The minutes component of the time. Must be an integer between 0 and 59. |
| `seconds` | `number` | The seconds component of the time. Must be an integer between 0 and 59. |
| `milliseconds` | `number` | The milliseconds component of the time. Must be an integer between 0 and 999. |

#### Returns

`boolean`

A boolean indicating whether the provided values represent a valid time.

**`Remarks`**

This function will return false if any of the provided values are out of range for their respective units of time.

**`Example`**

```ts
isValidTime(12, 30, 15, 500);  // returns true
isValidTime(24, 0, 0, 0);  // returns false
```

#### Defined in

[lib/util/isValidTime.ts:20](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidTime.ts#L20)

___

### isValidTimeArray

▸ **isValidTimeArray**(`array`): `boolean`

Checks if the given array is a valid time array.
A valid time array should have exactly 4 elements, each representing hours, minutes, seconds, and milliseconds respectively.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `number`[] | The array to be checked. |

#### Returns

`boolean`

A boolean indicating whether the array is a valid time array.

**`Example`**

```ts
isValidTimeArray([12, 30, 45, 500]); // returns true
isValidTimeArray([12, 60, 45, 500]); // returns false
```

#### Defined in

[lib/util/isValidTimeArray.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidTimeArray.ts#L13)

___

### isValidTimeInt

▸ **isValidTimeInt**(`n`): `boolean`

Checks if a given number is a valid time integer.
A valid time integer is between 0 and 86399999 (inclusive) and is an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number to be checked. |

#### Returns

`boolean`

A boolean indicating whether the number is a valid time integer.

**`Example`**

```ts
isValidTimeInt(50000); // returns true
isValidTimeInt(90000000); // returns false
```

#### Defined in

[lib/util/isValidTimeInt.ts:11](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidTimeInt.ts#L11)

___

### isValidTimeString

▸ **isValidTimeString**(`string`): `boolean`

Checks if a given string is a valid time string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be checked. |

#### Returns

`boolean`

A boolean indicating whether the string is a valid time string.

**`Remarks`**

This function is part of the TimeUtils library.

**`Throws`**

Will throw an error if the input string is not a string.

**`Example`**

```ts
isValidTimeString("12:34:56") // returns true
isValidTimeString("25:00:00") // returns false
```

#### Defined in

[lib/util/isValidTimeString.ts:15](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidTimeString.ts#L15)

___

### isValidTimeStringFormatting

▸ **isValidTimeStringFormatting**(`string`): `boolean`

Checks if a given string is in a valid time string format.
The valid format is 'HH:MM:SS,SSS' or 'HH:MM:SS.SSS'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be checked. |

#### Returns

`boolean`

A boolean indicating whether the string is in a valid time string format.

**`Example`**

```ts
isValidTimeStringFormatting('12:34:56,789'); // returns true
isValidTimeStringFormatting('12:34:56.789'); // returns true
isValidTimeStringFormatting('12:34:56'); // returns false
```

#### Defined in

[lib/util/isValidTimeStringFormatting.ts:12](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/isValidTimeStringFormatting.ts#L12)

___

### timeArrayToInt

▸ **timeArrayToInt**(`array`): `number`

Converts an array of time values into an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `number`[] | The array of time values to convert. |

#### Returns

`number`

The converted integer value.

**`Remarks`**

This function asserts that the provided array is a valid time array before performing the conversion.

**`Throws`**

Will throw an error if the provided array is not a valid time array.

**`Example`**

```ts
const timeArray = [12, 30, 15];
const result = timeArrayToInt(timeArray);
console.log(result); // Expected output: 123015
```

#### Defined in

[lib/util/timeArrayToInt.ts:17](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeArrayToInt.ts#L17)

___

### timeArrayToIntUnsafe

▸ **timeArrayToIntUnsafe**(`array`): `number`

Converts an array of time values into an integer.
The array should contain four elements representing hours, minutes, seconds, and milliseconds respectively.
This function does not perform any safety checks, so it's up to the caller to ensure the input is valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `number`[] | An array of four numbers representing hours, minutes, seconds, and milliseconds. |

#### Returns

`number`

The time represented as an integer in milliseconds.

**`Remarks`**

This function does not perform any safety checks, so it's up to the caller to ensure the input is valid.

**`Throws`**

This function does not throw any exceptions.

**`Example`**

```ts
const time = [1, 30, 45, 500]; // 1 hour, 30 minutes, 45 seconds, and 500 milliseconds
const result = timeArrayToIntUnsafe(time);
console.log(result); // Outputs: 5445500
```

#### Defined in

[lib/util/timeArrayToIntUnsafe.ts:15](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeArrayToIntUnsafe.ts#L15)

___

### timeArrayToString

▸ **timeArrayToString**(`array`, `msDelimiter?`): `string`

Converts an array of time values into a string representation.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `array` | `number`[] | `undefined` | The array of time values to convert. Each value should represent a unit of time in the order of hours, minutes, seconds, and milliseconds. |
| `msDelimiter` | `string` | `'.'` | The delimiter to use between the seconds and milliseconds. Defaults to '.'. |

#### Returns

`string`

A string representation of the time values in the format 'HH:MM:SS.MS'.

**`Throws`**

Will throw an error if the array is not a valid time array.

**`Example`**

```ts
const timeArray = [12, 30, 15, 500];
const result = timeArrayToString(timeArray);
console.log(result); // Outputs: '12:30:15.500'
```

#### Defined in

[lib/util/timeArrayToString.ts:16](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeArrayToString.ts#L16)

___

### timeArrayToStringUnsafe

▸ **timeArrayToStringUnsafe**(`array`, `msDelimiter?`): `string`

Converts an array of time values into a string representation.
The array should contain four numbers representing hours, minutes, seconds, and milliseconds respectively.
The function does not perform any safety checks on the input array.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `array` | `number`[] | `undefined` | An array of four numbers representing hours, minutes, seconds, and milliseconds. |
| `msDelimiter` | `string` | `'.'` | A string to be used as the delimiter between seconds and milliseconds. Defaults to '.'. |

#### Returns

`string`

A string representation of the time.

**`Example`**

```ts
const timeArray = [13, 15, 45, 123];
const result = timeArrayToStringUnsafe(timeArray, ':');
console.log(result); // Outputs: "13:15:45:123"
```

#### Defined in

[lib/util/timeArrayToStringUnsafe.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeArrayToStringUnsafe.ts#L14)

___

### timeIntToArray

▸ **timeIntToArray**(`ms`): `number`[]

Converts a time integer into an array of hours, minutes, and seconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | The time integer to convert, represented in milliseconds. |

#### Returns

`number`[]

An array of three numbers representing hours, minutes, and seconds respectively.

**`Remarks`**

This function will throw an error if the provided time integer is not valid.

**`Throws`**

Will throw an error if the provided time integer is not valid.

**`Example`**

```ts
const timeArray = timeIntToArray(3600000); // returns [1, 0, 0]
```

#### Defined in

[lib/util/timeIntToArray.ts:15](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeIntToArray.ts#L15)

___

### timeIntToArrayUnsafe

▸ **timeIntToArrayUnsafe**(`ms`): `number`[]

Converts a given time in milliseconds to an array of hours, minutes, seconds, and remaining milliseconds.
This function does not perform any safety checks and assumes the input is a valid number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | The time in milliseconds to convert. |

#### Returns

`number`[]

An array where the first element is hours, the second is minutes, the third is seconds, and the fourth is remaining milliseconds.

**`Remarks`**

This function is unsafe because it does not perform any checks to ensure the input is a valid number. If the input is not a valid number, the function will return incorrect results or throw an error.

**`Example`**

```ts
const timeArray = timeIntToArrayUnsafe(3601000);
console.log(timeArray); // [1, 0, 1, 0]
```

#### Defined in

[lib/util/timeIntToArrayUnsafe.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeIntToArrayUnsafe.ts#L13)

___

### timeIntToString

▸ **timeIntToString**(`ms`, `msDelimiter?`): `string`

Converts a time integer to a string.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ms` | `number` | `undefined` | The time in milliseconds to be converted. |
| `msDelimiter` | `string` | `'.'` | The delimiter to be used in the resulting string. Defaults to '.'. |

#### Returns

`string`

The time as a string, formatted with the specified delimiter.

**`Throws`**

Will throw an error if the provided time integer is not valid.

**`Example`**

```ts
timeIntToString(1500, ':'); // Returns '1:500'
```

#### Defined in

[lib/util/timeIntToString.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeIntToString.ts#L14)

___

### timeIntToStringUnsafe

▸ **timeIntToStringUnsafe**(`ms`, `msDelimiter?`): `string`

Converts a time integer to a string in an unsafe manner.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ms` | `number` | `undefined` | The time in milliseconds to be converted to a string. |
| `msDelimiter` | `string` | `'.'` | The delimiter to be used in the resulting string. Defaults to '.'. |

#### Returns

`string`

The time as a string.

**`Remarks`**

This function does not perform any safety checks and may throw an error if the input is not as expected.

**`Example`**

```ts
const timeString = timeIntToStringUnsafe(1500, ':');
console.log(timeString); // Outputs "1:500"
```

#### Defined in

[lib/util/timeIntToStringUnsafe.ts:16](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeIntToStringUnsafe.ts#L16)

___

### timeStringToArray

▸ **timeStringToArray**(`string`): `number`[]

Converts a time string into an array of numbers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The time string to be converted. The string should be in the format "HH:MM:SS". |

#### Returns

`number`[]

An array of numbers representing the hours, minutes, and seconds.

**`Remarks`**

This function is part of the Time Utilities library.

**`Throws`**

Will throw an error if the input string is not in the correct format.

**`Example`**

```ts
const timeArray = timeStringToArray("12:34:56");
console.log(timeArray); // Output: [12, 34, 56]
```

#### Defined in

[lib/util/timeStringToArray.ts:17](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeStringToArray.ts#L17)

___

### timeStringToArrayUnsafe

▸ **timeStringToArrayUnsafe**(`string`): `number`[]

Converts a time string into an array of numbers.
This function is unsafe because it does not handle invalid input.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The time string to convert. This should be in the format "HH:MM:SS". |

#### Returns

`number`[]

An array of numbers representing the time. The first element is the hour, the second is the minute, and the third is the second.

**`Throws`**

This function may throw an error if the input string is not in the expected format.

**`Example`**

```ts
const timeArray = timeStringToArrayUnsafe("12:34:56");
console.log(timeArray); // [12, 34, 56]
```

#### Defined in

[lib/util/timeStringToArrayUnsafe.ts:12](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeStringToArrayUnsafe.ts#L12)

___

### timeStringToInt

▸ **timeStringToInt**(`string`): `number`

Converts a time string to an integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The time string to be converted. |

#### Returns

`number`

The integer representation of the provided time string.

**`Remarks`**

This function takes a string representation of time and converts it into an integer.
The string should be in the format "HH:MM:SS".

**`Throws`**

Will throw an error if the input string is not in the correct format.

**`Example`**

```ts
timeStringToInt("12:34:56"); // returns 45296
```

#### Defined in

[lib/util/timeStringToInt.ts:17](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeStringToInt.ts#L17)

___

### timeStringToIntUnsafe

▸ **timeStringToIntUnsafe**(`string`): `number`

Converts a time string to an integer representation.
This function is unsafe because it does not perform any validation on the input string.
It assumes that the input string is a valid time string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The time string to convert. The string should be in the format "HH:MM:SS". |

#### Returns

`number`

The integer representation of the time string.

**`Remarks`**

This function is part of the Time Utilities library.

**`Throws`**

Will throw an error if the input string is not a valid time string.

**`Example`**

```ts
const timeString = "12:34:56";
const timeInt = timeStringToIntUnsafe(timeString);
console.log(timeInt); // Expected output: 45296
```

#### Defined in

[lib/util/timeStringToIntUnsafe.ts:19](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/time/src/lib/util/timeStringToIntUnsafe.ts#L19)
