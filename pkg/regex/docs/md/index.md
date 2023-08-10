@bemoje/regex

# @bemoje/regex

## Table of contents

### Functions

- [createEncapsulatingRegex](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#createencapsulatingregex)
- [regexClone](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#regexclone)
- [regexEscapeString](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#regexescapestring)
- [regexFixFlags](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#regexfixflags)
- [regexGetGroupNames](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#regexgetgroupnames)
- [regexIsValidFlags](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#regexisvalidflags)
- [regexMatcherToValidater](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#regexmatchertovalidater)
- [regexScopeTree](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#regexscopetree)
- [regexValidFlags](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#regexvalidflags)
- [rexec](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#rexec)
- [rexecFirstMatch](https://github.com/bemoje/tsmono/blob/main/pkg/regex/docs/md/index.md#rexecfirstmatch)

## Functions

### createEncapsulatingRegex

▸ **createEncapsulatingRegex**(`left`, `right`, `flags?`): `RegExp`

Builds a regex that matches a string between two provided strings. Supports regex as boundaries as well.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `left` | `string` \| `RegExp` | string or regex to match before |
| `right` | `string` \| `RegExp` | - |
| `flags?` | `string` | regex flags - 'g' and 's' are always added to whatever flags are passed. |

#### Returns

`RegExp`

A regular expression that matches text between the left and right patterns.

**`Remarks`**

The function accepts either strings or regular expressions as the left and right patterns.
If a string is provided, it will be escaped to form a valid regular expression.
The function also accepts an optional flags parameter to specify regular expression flags.

**`Example`**

```ts
const regex = createEncapsulatingRegex(/a/, /b/)
'abc'.match(regex)?.groups?.mid // 'c'
```

#### Defined in

lib/createEncapsulatingRegex.ts:17

___

### regexClone

▸ **regexClone**(`regex`): `RegExp`

Clones a regular expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regex` | `RegExp` | The regular expression to clone. |

#### Returns

`RegExp`

A new RegExp instance with the same source and flags as the provided regular expression.

**`Remarks`**

This function creates a new instance of the RegExp using the source and flags of the provided regular expression.

**`Example`**

```ts
/abc/gi;;
//=> /abc/gi
regexClone(/abc/gi);;
//=> /abc/gi
```

#### Defined in

lib/regexClone.ts:13

___

### regexEscapeString

▸ **regexEscapeString**(`str`): `string`

Escapes special characters in a string to be used in a regular expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The input string to escape. |

#### Returns

`string`

The escaped string.

**`Example`**

```ts
const input = 'Hello, world!';
regexEscapeString(input);;
//=> 'Hello, world!'
```

#### Defined in

lib/regexEscapeString.ts:11

___

### regexFixFlags

▸ **regexFixFlags**(`flags`): `string`

Takes a string of RegExp flags and returns a string guaranteed to be valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flags` | `string` | string of RegExp flags |

#### Returns

`string`

The processed string of regex flags.

**`Remarks`**

This function does not validate if the input string is a valid regex flags string. It only removes duplicates and non-regex characters.

**`Throws`**

This function does not throw any exceptions.

**`See`**

strSortChars, strRemoveDuplicateChars

**`Example`**

```ts
regexFixFlags('ggim') // 'gim'
regexFixFlags('?gim*') // 'gim'
```

#### Defined in

lib/regexFixFlags.ts:15

___

### regexGetGroupNames

▸ **regexGetGroupNames**(`re`): `string`[]

Returns an array of group names from a regular expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `re` | `RegExp` | The regular expression to extract group names from. |

#### Returns

`string`[]

An array of group names.

**`Example`**

```ts
regexGetGroupNames(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);;
//=> ['year', 'month', 'day']
```

**`Remarks`**

This function only works with regular expressions that use named capture groups.

#### Defined in

lib/regexGetGroupNames.ts:13

___

### regexIsValidFlags

▸ **regexIsValidFlags**(`flags`): `boolean`

Checks if the provided string is a valid regular expression flag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flags` | `string` | The string to be checked. |

#### Returns

`boolean`

A boolean indicating whether the string is a valid regular expression flag.
Checks if a string is a valid regex flags string.

**`Remarks`**

This function checks if the provided string contains only the characters 'g', 'i', 'm', 's', 'u', 'y' and if there are no duplicate characters.

**`Example`**

```ts
regexIsValidFlags('gim') // true
regexIsValidFlags('gmisuy') // false
```

#### Defined in

lib/regexIsValidFlags.ts:14

___

### regexMatcherToValidater

▸ **regexMatcherToValidater**(`regex`): `RegExp`

Convert a regex for matching to a regex for validation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regex` | `RegExp` | The regex to convert |

#### Returns

`RegExp`

A new regular expression that matches the entire string.

**`Example`**

```ts
const regexMatchDigits = /\d+/gi;
const regexIsDigit = regexMatcherToValidater(regexMatchDigits); //=> /^\d+$/i
const isDigit = (str) => regexIsDigit.test(str)
isDigit('1') //=> true
isDigit('a') //=> false
```

#### Defined in

lib/regexMatcherToValidater.ts:13

___

### regexScopeTree

▸ **regexScopeTree**(`left`, `right`): (`string`: `string`, `yieldOnlyRootNodes?`: `boolean`) => `Generator`<`RegexScopeTreeNode`\>

Builds a regex that matches a string between two strings. Supports regex instead of string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `left` | `string` \| `RegExp` | string or regex to match before |
| `right` | `string` \| `RegExp` | string or regex to match after |

#### Returns

`fn`

A generator function that takes a string and an optional boolean parameter.
The generator function yields nodes of type IRegexScopeTreeNode.

▸ (`string`, `yieldOnlyRootNodes?`): `Generator`<`RegexScopeTreeNode`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |
| `yieldOnlyRootNodes?` | `boolean` |

##### Returns

`Generator`<`RegexScopeTreeNode`\>

**`Throws`**

If a match does not recognize itself as neither left nor right.

**`Example`**

```ts
const generator = regexScopeTree('(', ')')
const iterable = generator('(1+((3)+(1)))+(15+(21-(521))))', true)
console.dir([...iterable], { depth: null })
```

#### Defined in

lib/regexScopeTree.ts:21

___

### regexValidFlags

▸ **regexValidFlags**(): `string`[]

This function returns an array of valid flags for regular expressions in JavaScript.

#### Returns

`string`[]

An array of valid flags for regular expressions.
Returns an array of all valid flags for a regular expression.

**`Example`**

```ts
regexValidFlags() //=> ['g', 'i', 'm', 's', 'u', 'y']
```

#### Defined in

lib/regexValidFlags.ts:9

___

### rexec

▸ **rexec**(`regex`, `string`): `Generator`<`RexecYield`\>

Easily perform regex 'exec' on a string. An iterable is returned which steps through the exec process and yields all the details you might need.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regex` | `RegExp` | The regular expression object |
| `string` | `string` | The string to perform the operation on |

#### Returns

`Generator`<`RexecYield`\>

A generator that yields an object for each match.

**`Throws`**

If the provided regex is not a RegExp instance.

**`Example`**

```ts
const regex = /(?<g1>a)/g
const str = 'Anthony wants a girlfriend.'
console.log([...rexec(regex, str)])
// [
// 	{
//     index: 9,
//     lastIndex: 10,
//     groups: { g1: 'a' },
//     match: 'a',
//   },
//   {
//     index: 14,
//     lastIndex: 15,
//     groups: { g1: 'a' },
//     match: 'a',
//   },
// ]
```

#### Defined in

lib/rexec.ts:30

___

### rexecFirstMatch

▸ **rexecFirstMatch**(`regex`, `string`): `RexecYield` \| `undefined`

Returns the first match of a regular expression in a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regex` | `RegExp` | The regular expression to be used for matching. |
| `string` | `string` | The string in which to search for a match. |

#### Returns

`RexecYield` \| `undefined`

The first match as an `RexecYield` object, or `undefined` if no match is found.

**`Remarks`**

This function is a part of RegExp utilities.

**`Example`**

```ts
rexecFirstMatch(/hello/g, 'hello world');;
//=> { match: 'hello', index: 0, input: 'hello world', groups: undefined }
```

#### Defined in

lib/rexecFirstMatch.ts:16
