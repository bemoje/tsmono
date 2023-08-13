[@bemoje/subtitles](/docs/md/index.md) / AbstractSubtitle

# Class: AbstractSubtitle

Abstract class represents a subtitle of no specific format.

## Hierarchy

- **`AbstractSubtitle`**

  ↳ [`SRTSubtitle`](/docs/md/classes/SRTSubtitle.md)

  ↳ [`VTTSubtitle`](/docs/md/classes/VTTSubtitle.md)

## Table of contents

### Constructors

- [constructor](/docs/md/classes/AbstractSubtitle.md#constructor)

### Properties

- [interval](/docs/md/classes/AbstractSubtitle.md#interval)
- [text](/docs/md/classes/AbstractSubtitle.md#text)

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

core/AbstractSubtitle.ts:22

## Properties

### interval

• **interval**: `TimeInterval`

The time interval of the subtitle.

#### Defined in

core/AbstractSubtitle.ts:10

___

### text

• **text**: `string`

The text of the subtitle.

#### Defined in

core/AbstractSubtitle.ts:15
