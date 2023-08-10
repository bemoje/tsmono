[@bemoje/commander-config](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/index.md) / ConfigSetting

# Class: ConfigSetting

## Implements

- [`IConfigSetting`](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md)

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/ConfigSetting.md#constructor)

### Properties

- [default](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/ConfigSetting.md#default)
- [description](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/ConfigSetting.md#description)
- [name](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/ConfigSetting.md#name)
- [parse](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/ConfigSetting.md#parse)
- [required](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/ConfigSetting.md#required)

## Constructors

### constructor

• **new ConfigSetting**(`name`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | [`IConfigSetting`](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md) |

#### Defined in

[core/ConfigSetting.ts:10](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/ConfigSetting.ts#L10)

## Properties

### default

• **default**: `any`

#### Implementation of

[IConfigSetting](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md).[default](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md#default)

#### Defined in

[core/ConfigSetting.ts:6](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/ConfigSetting.ts#L6)

___

### description

• **description**: `string`

#### Implementation of

[IConfigSetting](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md).[description](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md#description)

#### Defined in

[core/ConfigSetting.ts:5](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/ConfigSetting.ts#L5)

___

### name

• **name**: `string`

#### Defined in

[core/ConfigSetting.ts:4](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/ConfigSetting.ts#L4)

___

### parse

• **parse**: (`string`: `string`) => `any`

#### Type declaration

▸ (`string`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

##### Returns

`any`

#### Implementation of

[IConfigSetting](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md).[parse](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md#parse)

#### Defined in

[core/ConfigSetting.ts:8](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/ConfigSetting.ts#L8)

___

### required

• **required**: `boolean`

#### Implementation of

[IConfigSetting](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md).[required](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md#required)

#### Defined in

[core/ConfigSetting.ts:7](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/ConfigSetting.ts#L7)
