@bemoje/commander-config

# @bemoje/commander-config

## Table of contents

### Classes

- [Config](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/classes/Config.md)
- [ConfigSetting](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/classes/ConfigSetting.md)

### Interfaces

- [IConfigSetting](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/interfaces/IConfigSetting.md)
- [IConfigSettings](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/interfaces/IConfigSettings.md)
- [IGetUserInputFromEditorOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/interfaces/IGetUserInputFromEditorOptions.md)

### Functions

- [getUserInputFromEditor](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/index.md#getuserinputfromeditor)
- [getUserInputFromEditorSync](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/index.md#getuserinputfromeditorsync)
- [parseBoolean](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/index.md#parseboolean)
- [parseDirectories](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/index.md#parsedirectories)
- [parseInteger](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/index.md#parseinteger)
- [parseNumber](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/index.md#parsenumber)
- [parseString](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/index.md#parsestring)

## Functions

### getUserInputFromEditor

▸ **getUserInputFromEditor**(`options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IGetUserInputFromEditorOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/interfaces/IGetUserInputFromEditorOptions.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[util/getUserInputFromEditor.ts:8](https://github.com/bemoje/tsmono/blob/87185a0/pkg/commander-config/src/util/getUserInputFromEditor.ts#L8)

___

### getUserInputFromEditorSync

▸ **getUserInputFromEditorSync**(`options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IGetUserInputFromEditorOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/interfaces/IGetUserInputFromEditorOptions.md) |

#### Returns

`string`

#### Defined in

[util/getUserInputFromEditorSync.ts:7](https://github.com/bemoje/tsmono/blob/87185a0/pkg/commander-config/src/util/getUserInputFromEditorSync.ts#L7)

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

[util/parseBoolean.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/commander-config/src/util/parseBoolean.ts#L1)

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

[util/parseDirectories.ts:3](https://github.com/bemoje/tsmono/blob/87185a0/pkg/commander-config/src/util/parseDirectories.ts#L3)

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

[util/parseInteger.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/commander-config/src/util/parseInteger.ts#L1)

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

[util/parseNumber.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/commander-config/src/util/parseNumber.ts#L1)

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

[util/parseString.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/commander-config/src/util/parseString.ts#L1)
