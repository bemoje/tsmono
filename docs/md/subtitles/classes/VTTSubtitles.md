[@bemoje/subtitles](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/index.md) / VTTSubtitles

# Class: VTTSubtitles

A collection of VTTSubtitles.

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/VTTSubtitles.md#constructor)

### Properties

- [subtitles](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/VTTSubtitles.md#subtitles)

### Methods

- [toString](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/VTTSubtitles.md#tostring)

## Constructors

### constructor

• **new VTTSubtitles**(`vtt`)

Create a new VTTSubtitles instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vtt` | `string` | A correctly formatted VTT subtitles string. |

#### Defined in

[vtt/lib/VTTSubtitles.ts:17](https://github.com/bemoje/tsmono/blob/87185a0/pkg/subtitles/src/vtt/lib/VTTSubtitles.ts#L17)

## Properties

### subtitles

• **subtitles**: [`VTTSubtitle`](https://github.com/bemoje/tsmono/blob/main/docs/md/subtitles/classes/VTTSubtitle.md)[]

The SRTSubtitle instances.

#### Defined in

[vtt/lib/VTTSubtitles.ts:11](https://github.com/bemoje/tsmono/blob/87185a0/pkg/subtitles/src/vtt/lib/VTTSubtitles.ts#L11)

## Methods

### toString

▸ **toString**(): `string`

Returns the subtitles to a VTT format string.

#### Returns

`string`

#### Defined in

[vtt/lib/VTTSubtitles.ts:32](https://github.com/bemoje/tsmono/blob/87185a0/pkg/subtitles/src/vtt/lib/VTTSubtitles.ts#L32)
