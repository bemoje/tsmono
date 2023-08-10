@bemoje/string

# @bemoje/string

## Table of contents

### Functions

- [strCountCharOccurances](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strcountcharoccurances)
- [strCountChars](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strcountchars)
- [strEnsureEndsWith](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strensureendswith)
- [strFirstCharToUpperCase](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strfirstchartouppercase)
- [strHashToBuffer](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strhashtobuffer)
- [strHashToString](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strhashtostring)
- [strHashToStringDJB2](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strhashtostringdjb2)
- [strHashToUint32Array](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strhashtouint32array)
- [strIsLowerCase](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strislowercase)
- [strIsMultiLine](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strismultiline)
- [strIsUpperCase](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strisuppercase)
- [strNoConsecutiveEmptyLines](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strnoconsecutiveemptylines)
- [strNoConsecutiveWhitespace](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strnoconsecutivewhitespace)
- [strParseBoolean](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strparseboolean)
- [strPrependLines](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strprependlines)
- [strRemoveDuplicateChars](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strremoveduplicatechars)
- [strRemoveEmptyLines](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strremoveemptylines)
- [strRemoveFirstAndLastLine](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strremovefirstandlastline)
- [strRemoveNewLines](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strremovenewlines)
- [strRepeat](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strrepeat)
- [strReplaceAll](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strreplaceall)
- [strSortChars](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strsortchars)
- [strSplitAndTrim](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strsplitandtrim)
- [strSplitCamelCase](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strsplitcamelcase)
- [strToCharCodes](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strtocharcodes)
- [strToCharSet](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strtocharset)
- [strToSortedCharSet](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strtosortedcharset)
- [strTrimLines](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strtrimlines)
- [strTrimLinesLeft](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strtrimlinesleft)
- [strTrimLinesRight](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strtrimlinesright)
- [strUnwrap](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strunwrap)
- [strWrapBetween](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strwrapbetween)
- [strWrapIn](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strwrapin)
- [strWrapInAngleBrackets](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strwrapinanglebrackets)
- [strWrapInBraces](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strwrapinbraces)
- [strWrapInBrackets](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strwrapinbrackets)
- [strWrapInDoubleQuotes](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strwrapindoublequotes)
- [strWrapInParenthesis](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strwrapinparenthesis)
- [strWrapInSingleQuotes](https://github.com/bemoje/tsmono/blob/main/pkg/string/docs/md/index.md#strwrapinsinglequotes)

## Functions

### strCountCharOccurances

▸ **strCountCharOccurances**(`input`, `char`): `number`

Counts the number of occurrences of a specific character in a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to search within. |
| `char` | `string` | The character to count occurrences of. Must be a single character string of length 1. |

#### Returns

`number`

**`Throws`**

If the char parameter is not a single character string of length 1.

**`Example`**

```ts
strCountCharOccurances('hello world', 'o');;
//=> 2
```

#### Defined in

lib/strCountCharOccurances.ts:11

___

### strCountChars

▸ **strCountChars**(`string`): `Map`<`string`, `number`\>

Counts the number of occurrences of each character in a string and returns a Map where the keys are the characters and the values are their counts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to count characters in. |

#### Returns

`Map`<`string`, `number`\>

**`Example`**

```ts
strCountChars("hello");;
//=> Map { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }
```

#### Defined in

lib/strCountChars.ts:9

___

### strEnsureEndsWith

▸ **strEnsureEndsWith**(`string`, `endsWith`): `string`

Ensures that a string ends with a specified substring. If the string already ends with the specified substring, it is returned as is. Otherwise, the substring is appended to the end of the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be processed. |
| `endsWith` | `string` | The substring that the string should end with. |

#### Returns

`string`

**`Example`**

```ts
strEnsureEndsWith('Hello', ' World');
//=> 'Hello World'
strEnsureEndsWith('Hello World', ' World');
//=> 'Hello World'
```

#### Defined in

lib/strEnsureEndsWith.ts:12

___

### strFirstCharToUpperCase

▸ **strFirstCharToUpperCase**(`string`): `string`

Converts the first character of a string to uppercase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be converted. |

#### Returns

`string`

**`Example`**

```ts
strFirstCharToUpperCase('hello');
//=> 'Hello'
```

#### Defined in

lib/strFirstCharToUpperCase.ts:9

___

### strHashToBuffer

▸ **strHashToBuffer**(`string`, `algorithm?`): `Buffer`

Hash a string into a buffer with a given algorithm

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `string` | `string` | `undefined` | The string to hash |
| `algorithm` | `string` | `'sha256'` | sha1 \| sha256 \| sha512 \| md5 \| etc... |

#### Returns

`Buffer`

**`See`**

crypto.getHashes for a list of accepted strings for 'algorithm'

**`Example`**

```ts
strHash.toBuffer('hello')
//=> <Buffer 2c f2 4d ba 5f b0 a3 0e 26 e8 3b 2a c5 b9 e2 9e 1b 16 1e 5c 1f a7 42 5e 73 04 33 62 93 8b 98 24>
```

#### Defined in

lib/strHashToBuffer.ts:13

___

### strHashToString

▸ **strHashToString**(`string`, `algorithm?`, `encoding?`): `string`

Hash a string into a buffer with a given algorithm

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `string` | `string` | `undefined` | The string to hash |
| `algorithm` | `string` | `'sha256'` | sha1 \| sha256 \| sha512 \| md5 \| etc... |
| `encoding` | `Encoding` | `'base64'` | base64 \| base64url \| hex \| binary \| utf8 \| utf-8 \| utf16le \| latin1 \| ascii \| binary \| ucs2 \| ucs-2 |

#### Returns

`string`

**`See`**

crypto.getHashes for a list of accepted strings for 'algorithm'

**`Example`**

```ts
strHash.toString('hello', 'sha256', 'hex')
//=> 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

#### Defined in

lib/strHashToString.ts:15

___

### strHashToStringDJB2

▸ **strHashToStringDJB2**(`string`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`number`

#### Defined in

lib/strHashToStringDJB2.ts:1

___

### strHashToUint32Array

▸ **strHashToUint32Array**(`string`, `algorithm?`): `Uint32Array`

Hash a string into an array of unsigned 32-bit integers.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `string` | `string` | `undefined` | The string to hash |
| `algorithm` | `string` | `'sha256'` | sha1 \| sha256 \| sha512 \| md5 \| etc... |

#### Returns

`Uint32Array`

**`Throws`**

Will throw an error if the hashing algorithm is not supported.

**`See`**

crypto.getHashes for a list of accepted strings for 'algorithm'

**`Example`**

```ts
strHash.toUint32Array('hello')
//=> Uint32Array(8) [3125670444,  245608543, 708569126, 2665658821, 1545475611, 1581426463, 1647510643, 613976979]
```

#### Defined in

lib/strHashToUint32Array.ts:15

___

### strIsLowerCase

▸ **strIsLowerCase**(`input`): `boolean`

Checks if the given string is in lower case.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be checked. |

#### Returns

`boolean`

**`Example`**

```ts
strIsLowerCase('hello');
//=> true
strIsLowerCase('Hello');
//=> false
```

#### Defined in

lib/strIsLowerCase.ts:11

___

### strIsMultiLine

▸ **strIsMultiLine**(`string`): `boolean`

Checks if a string contains multiple lines.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to check. |

#### Returns

`boolean`

**`Example`**

```ts
strIsMultiLine("Hello\nWorld");
//=> true
strIsMultiLine("Hello World");
//=> false
```

#### Defined in

lib/strIsMultiLine.ts:11

___

### strIsUpperCase

▸ **strIsUpperCase**(`input`): `boolean`

Checks if the given string is in upper case.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be checked. |

#### Returns

`boolean`

**`Example`**

```ts
strIsUpperCase('HELLO');;
//=> true
strIsUpperCase('Hello');;
//=> false
```

#### Defined in

lib/strIsUpperCase.ts:11

___

### strNoConsecutiveEmptyLines

▸ **strNoConsecutiveEmptyLines**(`code`): `string`

Removes consecutive empty lines from a given string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The string from which to remove consecutive empty lines. |

#### Returns

`string`

**`Example`**

```ts
strNoConsecutiveEmptyLines("Hello\n\n\nWorld");;
//=> "Hello\n\nWorld"
```

#### Defined in

lib/strNoConsecutiveEmptyLines.ts:9

___

### strNoConsecutiveWhitespace

▸ **strNoConsecutiveWhitespace**(`string`): `string`

Removes consecutive whitespace characters in a string and replaces them with a single space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be processed. |

#### Returns

`string`

**`Example`**

```ts
strNoConsecutiveWhitespace('Hello   World');
//=> 'Hello World'
```

#### Defined in

lib/strNoConsecutiveWhitespace.ts:9

___

### strParseBoolean

▸ **strParseBoolean**(`string`): `boolean`

Parses a string into a boolean.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to parse into a boolean. |

#### Returns

`boolean`

**`Example`**

```ts
strParseBoolean('True');
//=> true
strParseBoolean('False');
//=> false
```

#### Defined in

lib/strParseBoolean.ts:11

___

### strPrependLines

▸ **strPrependLines**(`string`, `toPrepend`): `string`

Prepend each line of a string with a specified string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be processed. |
| `toPrepend` | `string` | The string to prepend to each line. |

#### Returns

`string`

The processed string with each line prepended by the specified string.

**`Example`**

```ts
const myString = 'Hello\nWorld';
strPrependLines(myString, '--');
//=> '--Hello\n--World'
```

#### Defined in

lib/strPrependLines.ts:12

___

### strRemoveDuplicateChars

▸ **strRemoveDuplicateChars**(`string`): `string`

Removes duplicate characters from a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string from which to remove duplicate characters. |

#### Returns

`string`

**`Throws`**

Will throw an error if the provided argument is not a string.

**`Example`**

```ts
strRemoveDuplicateChars('hello');
//=> 'helo'
```

#### Defined in

lib/strRemoveDuplicateChars.ts:10

___

### strRemoveEmptyLines

▸ **strRemoveEmptyLines**(`string`): `string`

Removes all empty lines from a given string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string from which to remove empty lines. |

#### Returns

`string`

**`Example`**

```ts
strRemoveEmptyLines('Hello\n\nWorld\n\n!');;
//=> 'Hello\nWorld\n!'
```

#### Defined in

lib/strRemoveEmptyLines.ts:9

___

### strRemoveFirstAndLastLine

▸ **strRemoveFirstAndLastLine**(`string`): `string`

Removes the first and last line from a given string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string from which the first and last line will be removed. |

#### Returns

`string`

**`Example`**

```ts
strRemoveFirstAndLastLine('Line1\nLine2\nLine3');;
//=> 'Line2'
```

#### Defined in

lib/strRemoveFirstAndLastLine.ts:9

___

### strRemoveNewLines

▸ **strRemoveNewLines**(`string`, `replaceWith?`): `string`

Removes all new line characters from a string.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `string` | `string` | `undefined` | The string from which to remove new line characters. |
| `replaceWith` | `string` | `''` | The string to replace new line characters with. Default is an empty string. |

#### Returns

`string`

**`Example`**

```ts
strRemoveNewLines('Hello\nWorld');;
//=> 'HelloWorld'
```

**`Example`**

```ts
const str = 'Hello\nWorld';
const result = strRemoveNewLines(str, ' ');
console.log(result); // 'Hello World'
```

#### Defined in

lib/strRemoveNewLines.ts:15

___

### strRepeat

▸ **strRepeat**(`input`, `n`): `string`

Repeats the given string `n` times.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to repeat. |
| `n` | `number` | The number of times to repeat the string. |

#### Returns

`string`

**`Example`**

```ts
strRepeat('abc', 3);;
//=> 'abcabcabc'
```

#### Defined in

lib/strRepeat.ts:10

___

### strReplaceAll

▸ **strReplaceAll**(`input`, `replace`, `replaceWith`, `flags?`): `string`

Replaces all occurrences of a substring in a string with a specified replacement.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` | `undefined` | The input string. |
| `replace` | `string` | `undefined` | The substring to be replaced. |
| `replaceWith` | `string` | `undefined` | The replacement string. |
| `flags` | `string` | `'g'` | Optional. The flags for the regular expression. Defaults to 'g'. |

#### Returns

`string`

**`Example`**

```ts
const input = 'Hello, world!';
const replace = 'o';
const replaceWith = '0';
strReplaceAll(input, replace, replaceWith);
//=> 'Hell0, w0rld!'
```

#### Defined in

lib/strReplaceAll.ts:17

___

### strSortChars

▸ **strSortChars**(`string`): `string`

Sorts the characters in a string in alphabetical order.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to sort. |

#### Returns

`string`

**`Example`**

```ts
strSortChars('dcba');
//=> 'abcd'
```

#### Defined in

lib/strSortChars.ts:9

___

### strSplitAndTrim

▸ **strSplitAndTrim**(`string`, `delimiter`, `removeEmptyLines?`): `string`[]

Splits a string by a specified delimiter and trims each resulting substring.
Optionally, it can also remove empty lines.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `string` | `string` | `undefined` | The string to be split and trimmed. |
| `delimiter` | `string` | `undefined` | The delimiter to split the string by. |
| `removeEmptyLines` | `boolean` | `false` | Optional parameter. If true, removes empty lines from the resulting array. Default is false. |

#### Returns

`string`[]

**`Example`**

```ts
strSplitAndTrim("  Hello ;  world ; ". ";", true;
//=> ["Hello", "world"]
strSplitAndTrim("  Hello ;  world ; ". ";", false;
//=> ["Hello", "world", ""]
```

#### Defined in

lib/strSplitAndTrim.ts:14

___

### strSplitCamelCase

▸ **strSplitCamelCase**(`word`): `string`[]

Returns an array of words in the string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `word` | `string` | The camel case word to split. |

#### Returns

`string`[]

**`Throws`**

Throws an error if the input is not a string.

**`Example`**

```ts
strSplitCamelCase('someCamel10Case')
//=> ['some', 'Camel10', 'Case']
```

#### Defined in

lib/strSplitCamelCase.ts:14

___

### strToCharCodes

▸ **strToCharCodes**(`string`): `number`[]

Converts a string to an array of character codes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to convert. |

#### Returns

`number`[]

**`Example`**

```ts
strToCharCodes('Hello');;
//=> [72, 101, 108, 108, 111]
```

#### Defined in

lib/strToCharCodes.ts:9

___

### strToCharSet

▸ **strToCharSet**(`string`): `Set`<`string`\>

Converts a string to a set of unique characters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be converted. |

#### Returns

`Set`<`string`\>

**`Example`**

```ts
strToCharSet('hello');;
//=> Set { 'h', 'e', 'l', 'o' }
```

#### Defined in

lib/strToCharSet.ts:9

___

### strToSortedCharSet

▸ **strToSortedCharSet**(`string`): `string`

Converts a string to a sorted set of unique characters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be converted. |

#### Returns

`string`

**`Example`**

```ts
strToSortedCharSet('banana');
//=> 'abn'
```

#### Defined in

lib/strToSortedCharSet.ts:9

___

### strTrimLines

▸ **strTrimLines**(`string`): `string`

Trims leading and trailing whitespace from each line in a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to trim. |

#### Returns

`string`

**`Example`**

```ts
strTrimLines('  Hello, world!  \n  How are you?  ');;
//=> 'Hello, world!\nHow are you?'
```

#### Defined in

lib/strTrimLines.ts:9

___

### strTrimLinesLeft

▸ **strTrimLinesLeft**(`string`): `string`

Trims the leading whitespace from each line in a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to trim. |

#### Returns

`string`

**`Example`**

```ts
strTrimLinesLeft('   line1\n   line2\n   line3');;
//=> 'line1\nline2\nline3'
```

#### Defined in

lib/strTrimLinesLeft.ts:9

___

### strTrimLinesRight

▸ **strTrimLinesRight**(`string`): `string`

Trims trailing whitespace from each line in a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to trim. |

#### Returns

`string`

**`Example`**

```ts
strTrimLinesRight('  Hello, world!  \n  How are you?  ');;
//=> '  Hello, world!\n  How are you?'
```

#### Defined in

lib/strTrimLinesRight.ts:9

___

### strUnwrap

▸ **strUnwrap**(`input`, `left`, `right`, `flags?`): `string`

Removes the specified left and right substrings from the input string.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` | `undefined` | The input string from which to remove the substrings. |
| `left` | `string` | `undefined` | The left substring to remove. |
| `right` | `string` | `undefined` | The right substring to remove. |
| `flags` | `string` | `''` | The flags for the RegExp. Default is an empty string. |

#### Returns

`string`

**`Example`**

```ts
const input = 'Hello World';
const left = 'Hello ';
const right = ' World';
strUnwrap(input, left, right);
//=> 'World'
```

#### Defined in

lib/strUnwrap.ts:17

___

### strWrapBetween

▸ **strWrapBetween**(`input`, `left`, `right`): `string`

Wraps a string between two other strings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be wrapped. |
| `left` | `string` | The string to be added to the left of the input string. |
| `right` | `string` | The string to be added to the right of the input string. |

#### Returns

`string`

**`Example`**

```ts
strWrapBetween('Hello', '<', '>');;
//=> '<Hello>'
```

#### Defined in

lib/strWrapBetween.ts:11

___

### strWrapIn

▸ **strWrapIn**(`input`, `wrap`): `string`

Wraps a given string with another string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be wrapped. |
| `wrap` | `string` | The string to wrap around the input. |

#### Returns

`string`

**`Example`**

```ts
strWrapIn('hello', '*');;
//=> '*hello*'
```

#### Defined in

lib/strWrapIn.ts:10

___

### strWrapInAngleBrackets

▸ **strWrapInAngleBrackets**(`input`): `string`

Wraps a string in angle brackets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be wrapped in angle brackets. |

#### Returns

`string`

**`Example`**

```ts
strWrapInAngleBrackets('example');;
//=> '<example>'
```

#### Defined in

lib/strWrapInAngleBrackets.ts:9

___

### strWrapInBraces

▸ **strWrapInBraces**(`input`): `string`

Wraps a given string in braces.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be wrapped in braces. |

#### Returns

`string`

**`Example`**

```ts
strWrapInBraces('hello');
//=> "{hello}"
```

#### Defined in

lib/strWrapInBraces.ts:9

___

### strWrapInBrackets

▸ **strWrapInBrackets**(`input`): `string`

Wraps a string in brackets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be wrapped in brackets. |

#### Returns

`string`

**`Example`**

```ts
strWrapInBrackets('test');
//=> '[test]'
```

#### Defined in

lib/strWrapInBrackets.ts:9

___

### strWrapInDoubleQuotes

▸ **strWrapInDoubleQuotes**(`input`): `string`

Wraps a given string in double quotes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be wrapped in double quotes. |

#### Returns

`string`

**`Example`**

```ts
strWrapInDoubleQuotes('Hello World');
//=> '"Hello World"'
```

#### Defined in

lib/strWrapInDoubleQuotes.ts:9

___

### strWrapInParenthesis

▸ **strWrapInParenthesis**(`input`): `string`

Wraps a given string in parenthesis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be wrapped in parenthesis. |

#### Returns

`string`

**`Example`**

```ts
strWrapInParenthesis('hello');
//=> '(hello)'
```

#### Defined in

lib/strWrapInParenthesis.ts:9

___

### strWrapInSingleQuotes

▸ **strWrapInSingleQuotes**(`input`): `string`

Wraps a given string in single quotes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to be wrapped in single quotes. |

#### Returns

`string`

**`Example`**

```ts
strWrapInSingleQuotes('Hello World');
//=> "'Hello World'"
```

#### Defined in

lib/strWrapInSingleQuotes.ts:9
