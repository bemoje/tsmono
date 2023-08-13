[@bemoje/subtitles](/docs/md/index.md) / VTTSubtitle

# Class: VTTSubtitle

Represents a single subtitle in the VTT format.

## Hierarchy

- [`AbstractSubtitle`](/docs/md/classes/AbstractSubtitle.md)

  ↳ **`VTTSubtitle`**

## Table of contents

### Constructors

- [constructor](/docs/md/classes/VTTSubtitle.md#constructor)

### Properties

- [interval](/docs/md/classes/VTTSubtitle.md#interval)
- [text](/docs/md/classes/VTTSubtitle.md#text)

### Methods

- [toString](/docs/md/classes/VTTSubtitle.md#tostring)

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

[AbstractSubtitle](/docs/md/classes/AbstractSubtitle.md).[constructor](/docs/md/classes/AbstractSubtitle.md#constructor)

#### Defined in

vtt/lib/VTTSubtitle.ts:13

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

Renders the subtitle as a string in the VTT format.

#### Returns

`string`

#### Defined in

vtt/lib/VTTSubtitle.ts:20
