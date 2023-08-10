[@bemoje/commander-config](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/index.md) / Config

# Class: Config

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#constructor)

### Properties

- [appdataDirectory](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#appdatadirectory)
- [definitions](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#definitions)
- [settings](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#settings)

### Accessors

- [configFilepath](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#configfilepath)

### Methods

- [assertNoMissingRequired](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#assertnomissingrequired)
- [ensureConfigFileExists](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#ensureconfigfileexists)
- [initialize](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#initialize)
- [print](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#print)
- [reset](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#reset)
- [saveConfigFile](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#saveconfigfile)
- [set](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/classes/Config.md#set)

## Constructors

### constructor

• **new Config**(`appAuthor`, `appName`, `definitions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appAuthor` | `string` |
| `appName` | `string` |
| `definitions` | `Record`<`string`, [`IConfigSetting`](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSetting.md)\> |

#### Defined in

[core/Config.ts:17](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L17)

## Properties

### appdataDirectory

• **appdataDirectory**: `string`

#### Defined in

[core/Config.ts:13](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L13)

___

### definitions

• **definitions**: [`IConfigSettings`](https://github.com/bemoje/tsmono/blob/main/pkg/commander-config/docs/md/interfaces/IConfigSettings.md)

#### Defined in

[core/Config.ts:14](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L14)

___

### settings

• **settings**: `Record`<`string`, `any`\>

#### Defined in

[core/Config.ts:15](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L15)

## Accessors

### configFilepath

• `get` **configFilepath**(): `string`

#### Returns

`string`

#### Defined in

[core/Config.ts:36](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L36)

## Methods

### assertNoMissingRequired

▸ **assertNoMissingRequired**(): `void`

#### Returns

`void`

#### Defined in

[core/Config.ts:147](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L147)

___

### ensureConfigFileExists

▸ **ensureConfigFileExists**(): `void`

#### Returns

`void`

#### Defined in

[core/Config.ts:75](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L75)

___

### initialize

▸ **initialize**(`program`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `program` | `Command` |

#### Returns

`void`

#### Defined in

[core/Config.ts:40](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L40)

___

### print

▸ **print**(`setting?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `setting?` | `string` |

#### Returns

`void`

#### Defined in

[core/Config.ts:103](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L103)

___

### reset

▸ `Protected` **reset**(`setting?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `setting?` | `string` |

#### Returns

`void`

#### Defined in

[core/Config.ts:128](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L128)

___

### saveConfigFile

▸ **saveConfigFile**(): `void`

#### Returns

`void`

#### Defined in

[core/Config.ts:86](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L86)

___

### set

▸ **set**(`setting`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `setting` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[core/Config.ts:91](https://github.com/bemoje/tsmono/blob/8bd5d16/pkg/commander-config/src/core/Config.ts#L91)
