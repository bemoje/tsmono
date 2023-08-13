[@bemoje/subtitles](/docs/md/index.md) / SRTSubtitle

# Class: SRTSubtitle

Represents a single subtitle in the SRT format.

## Hierarchy

- [`AbstractSubtitle`](/docs/md/classes/AbstractSubtitle.md)

  ↳ **`SRTSubtitle`**

## Table of contents

### Constructors

- [constructor](/docs/md/classes/SRTSubtitle.md#constructor)

### Properties

- [interval](/docs/md/classes/SRTSubtitle.md#interval)
- [text](/docs/md/classes/SRTSubtitle.md#text)

### Methods

- [toString](/docs/md/classes/SRTSubtitle.md#tostring)

## Constructors

### constructor

• **new SRTSubtitle**(`interval`, `text`)

Creates a new SRTSubtitle instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | `TimeInterval` | The time interval of the subtitle. |
| `text` | `string` | The text of the subtitle. |

#### Overrides

[AbstractSubtitle](/docs/md/classes/AbstractSubtitle.md).[constructor](/docs/md/classes/AbstractSubtitle.md#constructor)

#### Defined in

srt/lib/SRTSubtitle.ts:13

## Properties

### interval

• **interval**: `TimeInterval`

The time interval of the subtitle.

#### Inherited from

[AbstractSubtitle](/docs/md/classes/AbstractSubtitle.md).[interval](/docs/md/classes/AbstractSubtitle.md#interval)

#### Defined in

core/AbstractSubtitle.ts:10

___

### text

• **text**: `string`

The text of the subtitle.

#### Inherited from

[AbstractSubtitle](/docs/md/classes/AbstractSubtitle.md).[text](/docs/md/classes/AbstractSubtitle.md#text)

#### Defined in

core/AbstractSubtitle.ts:15

## Methods

### toString

▸ **toString**(): `string`

Renders the subtitle as a string in the SRT format.

#### Returns

`string`

#### Defined in

srt/lib/SRTSubtitle.ts:20
