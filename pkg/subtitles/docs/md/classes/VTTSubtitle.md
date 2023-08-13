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

[vtt/lib/VTTSubtitle.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/subtitles/src/vtt/lib/VTTSubtitle.ts#L13)

## Properties

### interval

• **interval**: `TimeInterval`

The time interval of the subtitle.

#### Inherited from

[AbstractSubtitle](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md).[interval](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md#interval)

#### Defined in

[core/AbstractSubtitle.ts:10](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/subtitles/src/core/AbstractSubtitle.ts#L10)

___

### text

• **text**: `string`

The text of the subtitle.

#### Inherited from

[AbstractSubtitle](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md).[text](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/AbstractSubtitle.md#text)

#### Defined in

[core/AbstractSubtitle.ts:15](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/subtitles/src/core/AbstractSubtitle.ts#L15)

## Methods

### toString

▸ **toString**(): `string`

Renders the subtitle as a string in the VTT format.

#### Returns

`string`

#### Defined in

[vtt/lib/VTTSubtitle.ts:20](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/subtitles/src/vtt/lib/VTTSubtitle.ts#L20)
