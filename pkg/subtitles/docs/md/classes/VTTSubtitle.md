[@bemoje/subtitles](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/index.md) / VTTSubtitle

# Class: VTTSubtitle

Represents a single subtitle in the VTT format.

## Hierarchy

- [`AbstractSubtitle`](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md)

  ↳ **`VTTSubtitle`**

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/VTTSubtitle.md#constructor)

### Properties

- [interval](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/VTTSubtitle.md#interval)
- [text](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/VTTSubtitle.md#text)

### Methods

- [toString](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/VTTSubtitle.md#tostring)

## Constructors

### constructor

• **new VTTSubtitle**(`interval`, `text`)

Creates a new VTTSubtitle instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | `TimeInterval` | The time interval of the subtitle. |
| `text` | `string` | The text of the subtitle. |

#### Overrides

[AbstractSubtitle](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md).[constructor](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md#constructor)

#### Defined in

lib/VTTSubtitle.ts:13

## Properties

### interval

• **interval**: `TimeInterval`

The time interval of the subtitle.

#### Inherited from

[AbstractSubtitle](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md).[interval](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md#interval)

#### Defined in

lib/AbstractSubtitle.ts:10

___

### text

• **text**: `string`

The text of the subtitle.

#### Inherited from

[AbstractSubtitle](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md).[text](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md#text)

#### Defined in

lib/AbstractSubtitle.ts:15

## Methods

### toString

▸ **toString**(): `string`

Renders the subtitle as a string in the VTT format.

#### Returns

`string`

#### Defined in

lib/VTTSubtitle.ts:20
