[@bemoje/commander-config](/docs/md/index.md) / ConfigSetting

# Class: ConfigSetting

## Implements

- [`IConfigSetting`](/docs/md/interfaces/IConfigSetting.md)

## Table of contents

### Constructors

- [constructor](/docs/md/classes/ConfigSetting.md#constructor)

### Properties

- [default](/docs/md/classes/ConfigSetting.md#default)
- [description](/docs/md/classes/ConfigSetting.md#description)
- [name](/docs/md/classes/ConfigSetting.md#name)
- [parse](/docs/md/classes/ConfigSetting.md#parse)
- [required](/docs/md/classes/ConfigSetting.md#required)

## Constructors

### constructor

• **new ConfigSetting**(`name`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | [`IConfigSetting`](/docs/md/interfaces/IConfigSetting.md) |

#### Defined in

[core/ConfigSetting.ts:10](https://github.com/bemoje/tsmono/blob/78f0bbb/pkg/commander-config/src/core/ConfigSetting.ts#L10)

## Properties

### default

• **default**: `any`

#### Implementation of

[IConfigSetting](/docs/md/interfaces/IConfigSetting.md).[default](/docs/md/interfaces/IConfigSetting.md#default)

#### Defined in

[core/ConfigSetting.ts:6](https://github.com/bemoje/tsmono/blob/78f0bbb/pkg/commander-config/src/core/ConfigSetting.ts#L6)

___

### description

• **description**: `string`

#### Implementation of

[IConfigSetting](/docs/md/interfaces/IConfigSetting.md).[description](/docs/md/interfaces/IConfigSetting.md#description)

#### Defined in

[core/ConfigSetting.ts:5](https://github.com/bemoje/tsmono/blob/78f0bbb/pkg/commander-config/src/core/ConfigSetting.ts#L5)

___

### name

• **name**: `string`

#### Defined in

[core/ConfigSetting.ts:4](https://github.com/bemoje/tsmono/blob/78f0bbb/pkg/commander-config/src/core/ConfigSetting.ts#L4)

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

[IConfigSetting](/docs/md/interfaces/IConfigSetting.md).[parse](/docs/md/interfaces/IConfigSetting.md#parse)

#### Defined in

[core/ConfigSetting.ts:8](https://github.com/bemoje/tsmono/blob/78f0bbb/pkg/commander-config/src/core/ConfigSetting.ts#L8)

___

### required

• **required**: `boolean`

#### Implementation of

[IConfigSetting](/docs/md/interfaces/IConfigSetting.md).[required](/docs/md/interfaces/IConfigSetting.md#required)

#### Defined in

[core/ConfigSetting.ts:7](https://github.com/bemoje/tsmono/blob/78f0bbb/pkg/commander-config/src/core/ConfigSetting.ts#L7)
