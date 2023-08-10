@bemoje/tsdoc

# @bemoje/tsdoc

## Table of contents

### Classes

- [TsDoc](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)
- [TsDocTag](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md)

### Interfaces

- [IExtractedTsDocComment](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/interfaces/IExtractedTsDocComment.md)
- [TsDocOptions](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/interfaces/TsDocOptions.md)

### Functions

- [isMultiTsDocTag](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#ismultitsdoctag)
- [isNamedMultiTsDocTag](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#isnamedmultitsdoctag)
- [isNamedTsDocTag](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#isnamedtsdoctag)
- [isValidTsDocComment](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#isvalidtsdoccomment)
- [tsDocExtractAllComments](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocextractallcomments)
- [tsDocExtractFirstComment](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocextractfirstcomment)
- [tsDocFixSpacingBeforeAfter](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocfixspacingbeforeafter)
- [tsDocNormalizeTagName](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocnormalizetagname)
- [tsDocRemoveEmptyLines](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocremoveemptylines)
- [tsDocStripAllButMostImportantTags](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocstripallbutmostimportanttags)
- [tsDocStripExample](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocstripexample)
- [tsDocStripTypesAndDefaults](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocstriptypesanddefaults)
- [tsDocUnwrapComment](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocunwrapcomment)
- [tsDocWrapAsComment](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocwrapascomment)
- [tsDocWrapExample](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md#tsdocwrapexample)

## Functions

### isMultiTsDocTag

▸ **isMultiTsDocTag**(`tag`): `boolean`

Checks if the provided tag is a multi TSDoc tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The tag to check. |

#### Returns

`boolean`

A boolean indicating whether the tag is a multi TSDoc tag.

**`Remarks`**

This function is case-insensitive.

**`Example`**

```ts
isMultiTsDocTag('param');;
//=> true
isMultiTsDocTag('example');;
//=> false
```

#### Defined in

lib/util/isMultiTsDocTag.ts:13

___

### isNamedMultiTsDocTag

▸ **isNamedMultiTsDocTag**(`tag`): `boolean`

Checks if the provided tag is a named multi TSDoc tag.
Named multi TSDoc tags are 'param' and 'property'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The tag to check. |

#### Returns

`boolean`

Returns true if the tag is a named multi TSDoc tag, false otherwise.

**`Example`**

```ts
isNamedMultiTsDocTag('param');;
//=> true
isNamedMultiTsDocTag('returns');;
//=> false
```

#### Defined in

lib/util/isNamedMultiTsDocTag.ts:13

___

### isNamedTsDocTag

▸ **isNamedTsDocTag**(`tag`): `boolean`

Checks if the given tag is a named TSDoc tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The tag to check. |

#### Returns

`boolean`

A boolean indicating whether the tag is a named TSDoc tag.

**`Example`**

```ts
isNamedTsDocTag('param');;
//=> true
isNamedTsDocTag('random');;
//=> false
```

#### Defined in

lib/util/isNamedTsDocTag.ts:12

___

### isValidTsDocComment

▸ **isValidTsDocComment**(`code`): `boolean`

Checks if the provided code string is a valid TSDoc comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The source code string to be checked. |

#### Returns

`boolean`

A boolean indicating whether the provided code string is a valid TSDoc comment.

**`Remarks`**

This function tests each line of the provided code string against a regular expression that matches the TSDoc comment syntax.

#### Defined in

lib/util/isValidTsDocComment.ts:7

___

### tsDocExtractAllComments

▸ **tsDocExtractAllComments**(`code`): `Generator`<[`IExtractedTsDocComment`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/interfaces/IExtractedTsDocComment.md)\>

This function takes a source string, and yields each TSDoc block comments in it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The source code string. |

#### Returns

`Generator`<[`IExtractedTsDocComment`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/interfaces/IExtractedTsDocComment.md)\>

A generator that yields each TSDoc block comment in the source code.

**`Yields`**

Each TSDoc block comment in the source code.

#### Defined in

lib/util/tsDocExtractAllComments.ts:9

___

### tsDocExtractFirstComment

▸ **tsDocExtractFirstComment**(`code`): [`IExtractedTsDocComment`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/interfaces/IExtractedTsDocComment.md) \| `undefined`

Extracts the first TSDoc block comment from the provided TypeScript code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code to extract the TSDoc block comment from. |

#### Returns

[`IExtractedTsDocComment`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/interfaces/IExtractedTsDocComment.md) \| `undefined`

#### Defined in

lib/util/tsDocExtractFirstComment.ts:8

___

### tsDocFixSpacingBeforeAfter

▸ **tsDocFixSpacingBeforeAfter**(`code`): `string`

This function fixes the spacing before and after the code in a TypeScript file.
It replaces multiple newlines after a block comment end with a single newline.
It also ensures that there is a newline before the start of a block comment if there is any non-whitespace character before it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code to fix the spacing for. |

#### Returns

`string`

The TypeScript code with fixed spacing.

**`Example`**

```ts
const code = `
function example() {
  // some code
}
/**
 * This is a comment.
 */
function anotherExample() {
  // some more code
}
`;
const fixedCode = tsDocFixSpacingBeforeAfter(code);
//=> fixedCode
```

#### Defined in

lib/util/tsDocFixSpacingBeforeAfter.ts:23

___

### tsDocNormalizeTagName

▸ **tsDocNormalizeTagName**(`tag`): `string`

Normalizes known tag names to their TypeScript equivalents.
If the tag name is not found in the map, it returns the input tag name.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` |

#### Returns

`string`

The normalized tag name.

**`Remarks`**

This function is case-insensitive.

**`Example`**

```ts
tsDocNormalizeTagName("TagName");;
//=> "tagname"
```

#### Defined in

lib/util/tsDocNormalizeTagName.ts:12

___

### tsDocRemoveEmptyLines

▸ **tsDocRemoveEmptyLines**(`string`): `string`

Removes all empty lines from the given string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string from which to remove empty lines. |

#### Returns

`string`

**`Remarks`**

This function is particularly useful when dealing with multi-line strings that may have unnecessary empty lines.

#### Defined in

lib/util/tsDocRemoveEmptyLines.ts:6

___

### tsDocStripAllButMostImportantTags

▸ **tsDocStripAllButMostImportantTags**(`source`): `string`

This function takes a source string, extracts all TSDoc comments from it, and then strips all TSDoc tags from these comments except for the 'throws' and 'param' tags.
The function then returns the modified source string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source string from which TSDoc comments are to be extracted and modified. |

#### Returns

`string`

The modified source string with all TSDoc tags stripped except for the 'throws' and 'param' tags.

**`Remarks`**

This function is useful when you want to simplify your TSDoc comments by removing all tags except for the 'throws' and 'param' tags.

**`Throws`**

If the source string is not a valid TSDoc comment.

**`Example`**

```ts
const source = `
/**
 * Adds two numbers.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of a and b.
 * @throws If a or b is not a number.
 */
`;
tsDocStripAllTagsExcepThrowsParamDescription(source);
//=> removes the returns-tag.
```

#### Defined in

lib/util/tsDocStripAllButMostImportantTags.ts:25

___

### tsDocStripExample

▸ **tsDocStripExample**(`source`): `string`

This function takes a source string, extracts all TSDoc comments from it, and then strips all example TSDoc tags from these comments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source string from which TSDoc comments are to be extracted and modified. |

#### Returns

`string`

The modified source string with all example TSDoc tags stripped.

#### Defined in

lib/util/tsDocStripExample.ts:9

___

### tsDocStripTypesAndDefaults

▸ **tsDocStripTypesAndDefaults**(`code`): `string`

Strips JSDoc style types and default values from the provided code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code string from which types should be stripped. |

#### Returns

`string`

The provided code string with all TypeScript types removed.

**`Remarks`**

This function is useful when you want to remove TypeScript types from a code string.

**`Example`**

```ts
const code = [
  '/**',
  ' * @returns {string} a string',
  ' */',
  //
].join('\n')
const actual = tsDocStripTypesAndDefaults(code)
const expected = [
  '/**',
  ' * @returns a string',
  ' */',
  //
].join('\n')
```

#### Defined in

lib/util/tsDocStripTypesAndDefaults.ts:24

___

### tsDocUnwrapComment

▸ **tsDocUnwrapComment**(`code`): `string`

Unwraps a TSDoc block comment, removing the comment markers and leading asterisks.
Throws an error if the provided string is not a valid TSDoc block comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TSDoc block comment to unwrap. |

#### Returns

`string`

The unwrapped TSDoc comment.

**`Remarks`**

This function will throw an error if the provided string is not a valid TSDoc block comment.

**`Throws`**

Will throw an error if the provided code is not a valid TSDoc comment.

**`Example`**

```ts
const actual = tsDocUnwrapComment([
  '/**',
  ' * Checks if the provided (...)',
  ' * @remarks This function (...)',
  ' * @param code The source (...)',
  ' * @returns A boolean ind (...)',
  ' */',
].join('\n'))
const expected = [
  'Checks if the provided (...)',
  '@remarks This function (...)',
  '@param code The source (...)',
  '@returns A boolean ind (...)',
].join('\n')
actual === expected
//=> true
```

#### Defined in

lib/util/tsDocUnwrapComment.ts:30

___

### tsDocWrapAsComment

▸ **tsDocWrapAsComment**(`string`): `string`

Wraps a given string into a TSDoc block comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to be wrapped into a TSDoc block comment. |

#### Returns

`string`

The input string wrapped into a TSDoc block comment.

**`Remarks`**

This function is useful when you want to generate TSDoc comments programmatically.

#### Defined in

lib/util/tsDocWrapAsComment.ts:9

___

### tsDocWrapExample

▸ **tsDocWrapExample**(`code`): `string`

Wraps the given code in a TSDoc block comment with an

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The code to be wrapped. |

#### Returns

`string`

The wrapped TypeScript code.

**`Example`**

```ts
tag.
```

**`Example`**

```ts
const code = 'console.log("Hello, world!");';
tsWrapDocExample(code);
//=> 'console.log("Hello, world!");'
```
//

#### Defined in

lib/util/tsDocWrapExample.ts:12
