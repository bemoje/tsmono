[@bemoje/subtitles](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/index.md) / VTTSubtitles

# Class: VTTSubtitles

A collection of VTTSubtitles.

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/VTTSubtitles.md#constructor)

### Properties

- [subtitles](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/VTTSubtitles.md#subtitles)

### Methods

- [toString](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/VTTSubtitles.md#tostring)

## Constructors

### constructor

• **new VTTSubtitles**(`vtt`)

Create a new VTTSubtitles instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vtt` | `string` | A correctly formatted VTT subtitles string. |

#### Defined in

lib/VTTSubtitles.ts:17

## Properties

### subtitles

• **subtitles**: [`VTTSubtitle`](https://github.com/bemoje/tsmono/blob/main/pkg/subtitles/docs/md/classes/VTTSubtitle.md)[]

The SRTSubtitle instances.

#### Defined in

lib/VTTSubtitles.ts:11

## Methods

### toString

▸ **toString**(): `string`

Returns the subtitles to a VTT format string.

#### Returns

`string`

#### Defined in

lib/VTTSubtitles.ts:32
