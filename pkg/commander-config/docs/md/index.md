@bemoje/commander-config

# @bemoje/commander-config

## Table of contents

### Classes

- [Config](/docs/md/classes/Config.md)
- [ConfigSetting](/docs/md/classes/ConfigSetting.md)

### Interfaces

- [IConfigSetting](/docs/md/interfaces/IConfigSetting.md)
- [IConfigSettings](/docs/md/interfaces/IConfigSettings.md)
- [IGetUserInputFromEditorOptions](/docs/md/interfaces/IGetUserInputFromEditorOptions.md)

### Functions

- [getUserInputFromEditor](/docs/md/index.md#getuserinputfromeditor)
- [getUserInputFromEditorSync](/docs/md/index.md#getuserinputfromeditorsync)
- [parseBoolean](/docs/md/index.md#parseboolean)
- [parseDirectories](/docs/md/index.md#parsedirectories)
- [parseInteger](/docs/md/index.md#parseinteger)
- [parseNumber](/docs/md/index.md#parsenumber)
- [parseString](/docs/md/index.md#parsestring)

## Functions

### getUserInputFromEditor

▸ **getUserInputFromEditor**(`options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IGetUserInputFromEditorOptions`](/docs/md/interfaces/IGetUserInputFromEditorOptions.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

util/getUserInputFromEditor.ts:8

___

### getUserInputFromEditorSync

▸ **getUserInputFromEditorSync**(`options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IGetUserInputFromEditorOptions`](/docs/md/interfaces/IGetUserInputFromEditorOptions.md) |

#### Returns

`string`

#### Defined in

util/getUserInputFromEditorSync.ts:7

___

### parseBoolean

▸ **parseBoolean**(`string`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`boolean`

#### Defined in

util/parseBoolean.ts:1

___

### parseDirectories

▸ **parseDirectories**(`string`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`string`[]

#### Defined in

util/parseDirectories.ts:3

___

### parseInteger

▸ **parseInteger**(`string`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`number`

#### Defined in

util/parseInteger.ts:1

___

### parseNumber

▸ **parseNumber**(`string`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`number`

#### Defined in

util/parseNumber.ts:1

___

### parseString

▸ **parseString**(`string`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`string`

#### Defined in

util/parseString.ts:1
