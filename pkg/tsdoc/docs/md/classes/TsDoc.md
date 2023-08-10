[@bemoje/tsdoc](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md) / TsDoc

# Class: TsDoc

A class representing a TSDoc block comment.

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#constructor)

### Properties

- [multi](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#multi)
- [namedMulti](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#namedmulti)
- [paramOrder](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#paramorder)
- [single](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#single)
- [tagOrder](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#tagorder)
- [defaultTagOrder](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#defaulttagorder)

### Accessors

- [isEmpty](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#isempty)
- [size](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#size)

### Methods

- [addBlockComment](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#addblockcomment)
- [addTag](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#addtag)
- [assign](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#assign)
- [clear](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#clear)
- [clone](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#clone)
- [getTagOrder](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#gettagorder)
- [iterateTags](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#iteratetags)
- [removeTags](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#removetags)
- [render](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#render)
- [reorderParams](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#reorderparams)
- [toString](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md#tostring)

## Constructors

### constructor

• **new TsDoc**(`code?`, `options?`)

Creates a new TSDoc comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code?` | `string` | The TSDoc block comment soruce code. |
| `options?` | [`TsDocOptions`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/interfaces/TsDocOptions.md) | Options for the TSDoc instance. |

**`Throws`**

If the provided code is not a valid TSDoc block comment.

#### Defined in

lib/TsDoc.ts:65

## Properties

### multi

• `Readonly` **multi**: `Map`<`string`, [`TsDocTag`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md)[]\>

Multi tags are tags that can appear multiple times in a TSDoc comment, but each instance must have unique description text.

#### Defined in

lib/TsDoc.ts:52

___

### namedMulti

• `Readonly` **namedMulti**: `Map`<`string`, `Map`<`string`, [`TsDocTag`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md)\>\>

Named multi tags are tags that can appear multiple times in a TSDoc comment, but each instance must have a unique name.

#### Defined in

lib/TsDoc.ts:57

___

### paramOrder

• `Protected` `Optional` **paramOrder**: `Set`<`string`\>

Can be used to specify the order in which param-tags are rendered in the TSDoc comment.

#### Defined in

lib/TsDoc.ts:42

___

### single

• `Readonly` **single**: `Map`<`string`, [`TsDocTag`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md)\>

Single tags are tags that can only appear once in a TSDoc comment.

#### Defined in

lib/TsDoc.ts:47

___

### tagOrder

• `Protected` `Optional` **tagOrder**: `string`[]

The order in which tags are rendered in the TSDoc comment.
Empty strings means spacing between tags when iterating and rendering.

#### Defined in

lib/TsDoc.ts:37

___

### defaultTagOrder

▪ `Static` **defaultTagOrder**: `string`[]

The default order in which tags are rendered in the TSDoc comment.

#### Defined in

lib/TsDoc.ts:19

## Accessors

### isEmpty

• `get` **isEmpty**(): `boolean`

Returns whether the TsDoc instance has no tags.

#### Returns

`boolean`

#### Defined in

lib/TsDoc.ts:116

___

### size

• `get` **size**(): `number`

The number of tags in the TsDoc instance.

#### Returns

`number`

#### Defined in

lib/TsDoc.ts:106

## Methods

### addBlockComment

▸ **addBlockComment**(`code`): [`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

Parses a TSDoc block comment and adds the tags to the TsDoc instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TSDoc block comment soruce code. |

#### Returns

[`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

#### Defined in

lib/TsDoc.ts:77

___

### addTag

▸ **addTag**(`tsDocTag`): [`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

Adds a TsDocTag to the TsDoc instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tsDocTag` | [`TsDocTag`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md) | The TsDocTag to add. |

#### Returns

[`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

#### Defined in

lib/TsDoc.ts:135

___

### assign

▸ **assign**(`tsdoc`): [`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

Merge tags from another TsDoc instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsdoc` | [`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md) |

#### Returns

[`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

#### Defined in

lib/TsDoc.ts:204

___

### clear

▸ **clear**(): [`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

Deletes all tags.
The tagOrder and paramOrder properties are not affected.

#### Returns

[`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

#### Defined in

lib/TsDoc.ts:124

___

### clone

▸ **clone**(): [`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

Returns a deep clone of this instance.

#### Returns

[`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

#### Defined in

lib/TsDoc.ts:197

___

### getTagOrder

▸ **getTagOrder**(): `string`[]

Returns the order in which tags are rendered in the TSDoc comment.
If no tagOrder was specified in the constructor options, TsDoc.defaultTagOrder is used.

#### Returns

`string`[]

#### Defined in

lib/TsDoc.ts:246

___

### iterateTags

▸ **iterateTags**(`withSpaces?`): `Generator`<``""`` \| [`TsDocTag`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md), `any`, `unknown`\>

Iterate tags in the order specified in the ´tagOrder´ and ´paramOrder´ properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `withSpaces?` | `boolean` | Whether to yield empty strings encountered in ´tagOrder´. Empty strings are used to add spacing between tags. |

#### Returns

`Generator`<``""`` \| [`TsDocTag`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md), `any`, `unknown`\>

#### Defined in

lib/TsDoc.ts:177

___

### removeTags

▸ **removeTags**(`tag`, `name?`): [`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

Deletes one or all TsDocTag matching the provided tag.
If name is not provided, all tags matching the provided tag are deleted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The tag to remove. |
| `name?` | `string` | The name of the tag to remove. |

#### Returns

[`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

#### Defined in

lib/TsDoc.ts:159

___

### render

▸ **render**(): `string`

Renders a TSDoc block comment string with all tags in the order specified by the tagOrder property.

#### Returns

`string`

#### Defined in

lib/TsDoc.ts:230

___

### reorderParams

▸ **reorderParams**(): [`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

Sort the param tags according to the order specified in the paramOrder property.

#### Returns

[`TsDoc`](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDoc.md)

#### Defined in

lib/TsDoc.ts:214

___

### toString

▸ **toString**(): `string`

Renders a TSDoc block comment string with all tags in the order specified by the tagOrder property.

#### Returns

`string`

**`Remarks`**

Identical to the `render` method.

#### Defined in

lib/TsDoc.ts:238
