# @bemoje/commander-config
Easy setup of CLI config files when using the commander package.

![GitHub Top Language](https://img.shields.io/github/languages/top/bemoje/https://github.com/bemoje/tsmono)

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/bemoje/https://github.com/bemoje/tsmono?color=red)
![GitHub Stars](https://img.shields.io/github/stars/bemoje/https://github.com/bemoje/tsmono)
![GitHub Forks](https://img.shields.io/github/forks/bemoje/https://github.com/bemoje/tsmono)
![GitHub Watchers](https://img.shields.io/github/watchers/bemoje/https://github.com/bemoje/tsmono)
![GitHub Repo Size](https://img.shields.io/github/repo-size/bemoje/https://github.com/bemoje/tsmono)

##### NPM
<span><a href="https://npmjs.org/@bemoje/commander-config" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/commander-config" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/@bemoje/commander-config" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/@bemoje/commander-config" alt="NPM Downloads" /></a></span>


##### Donate
<span><a href="https://www.patreon.com/user?u=40752770" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
```sh
npm install @bemoje/commander-config
```


## Issues
Please let me know of any bugs or [issues](https://github.com/bemoje/https://github.com/bemoje/tsmono/issues).

## Contribute
Contributors are welcome to open a [pull request](https://github.com/bemoje/https://github.com/bemoje/tsmono/pulls).

## License
Released under the [MIT License](./LICENSE).

## Documentation
- [HTML](https://github.com/bemoje/tsmono/blob/main/docs/html/index.html)
- [Markdown](https://github.com/bemoje/tsmono/blob/main/docs/md/commander-config/index.md)

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
