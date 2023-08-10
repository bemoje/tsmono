[@bemoje/tsdoc](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/index.md) / TsDocTag

# Class: TsDocTag

A tag belonging to a TSDoc.
This does not follow the official TSDoc spec. It is a simplified version.

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md#constructor)

### Properties

- [description](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md#description)
- [name](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md#name)
- [tag](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md#tag)

### Methods

- [toString](https://github.com/bemoje/tsmono/blob/main/pkg/tsdoc/docs/md/classes/TsDocTag.md#tostring)

## Constructors

### constructor

• **new TsDocTag**(`tag`, `name?`, `description?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tag` | `string` | `undefined` | The kind of tag. Rules: - May only consist of letters a-z. - Certain tags are normalized to other synonymous tags. - Custom tag names are allowed as long as they follow the above rules. |
| `name` | `string` | `''` | The tag's name parameter. Rules: - Only used for named tags. - Must start with a letter. - May only contain word characters and ".". |
| `description` | `string`[] | `[]` | The tag's description. Rules: - Unnamed tags must have a description. - Example tags are formatted as markdown ts-code blocks. - Leading dash in the first line is normalized (removed). |

**`Throws`**

on named tag missing name.

**`Throws`**

on unnamed tag missing description.

**`Throws`**

on unnamed tag trying to set name.

**`Throws`**

on invalid tag name.

**`Throws`**

on invalid name.

**`Throws`**

on invalid markdown code block for example tag.

#### Defined in

lib/TsDocTag.ts:46

## Properties

### description

• **description**: `string`[]

The tag's description.

#### Defined in

lib/TsDocTag.ts:24

___

### name

• **name**: `string`

The tag's name parameter.

#### Defined in

lib/TsDocTag.ts:19

___

### tag

• **tag**: `string`

The kind of tag.

#### Defined in

lib/TsDocTag.ts:14

## Methods

### toString

▸ **toString**(): `string`

Renders the tag as a TSDoc string.

#### Returns

`string`

**`Remarks`**

Ensures that example tags are formatted as markdown ts-code blocks.

#### Defined in

lib/TsDocTag.ts:90
