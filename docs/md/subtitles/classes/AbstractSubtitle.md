[@bemoje/subtitles](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/index.md) / AbstractSubtitle

# Class: AbstractSubtitle

Abstract class represents a subtitle of no specific format.

## Hierarchy

- **`AbstractSubtitle`**

  ↳ [`SRTSubtitle`](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/SRTSubtitle.md)

  ↳ [`VTTSubtitle`](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/VTTSubtitle.md)

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/AbstractSubtitle.md#constructor)

### Properties

- [interval](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/AbstractSubtitle.md#interval)
- [text](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/AbstractSubtitle.md#text)

## Constructors

### constructor

• **new AbstractSubtitle**(`interval`, `text`)

Creates a new Subtitle instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | `TimeInterval` | The time interval of the subtitle. |
| `text` | `string` | The text of the subtitle. |

#### Defined in

[core/AbstractSubtitle.ts:22](https://github.com/bemoje/tsmono/blob/87185a0/pkg/subtitles/src/core/AbstractSubtitle.ts#L22)

## Properties

### interval

• **interval**: `TimeInterval`

The time interval of the subtitle.

#### Defined in

[core/AbstractSubtitle.ts:10](https://github.com/bemoje/tsmono/blob/87185a0/pkg/subtitles/src/core/AbstractSubtitle.ts#L10)

___

### text

• **text**: `string`

The text of the subtitle.

#### Defined in

[core/AbstractSubtitle.ts:15](https://github.com/bemoje/tsmono/blob/87185a0/pkg/subtitles/src/core/AbstractSubtitle.ts#L15)
