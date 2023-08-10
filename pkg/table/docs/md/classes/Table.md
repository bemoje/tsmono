[@bemoje/table](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/index.md) / Table

# Class: Table<T\>

Two-dimensional table class supporting column and row headers.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the data in the table. |

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#constructor)

### Properties

- [\_colIndexMap](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#_colindexmap)
- [\_data](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#_data)
- [\_headers](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#_headers)

### Accessors

- [data](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#data)
- [headers](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#headers)
- [numColumns](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#numcolumns)
- [numRows](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#numrows)

### Methods

- [assertRowValidLength](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#assertrowvalidlength)
- [get](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#get)
- [set](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#set)
- [toArray](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#toarray)
- [toJSON](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#tojson)
- [fromJSON](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md#fromjson)

## Constructors

### constructor

• **new Table**<`T`\>(`data`, `headers?`)

Creates a new Table.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `T`[][] | The data of the table. |
| `headers?` | `string`[] | The headers of the table. |

#### Defined in

lib/Table.ts:37

## Properties

### \_colIndexMap

• `Protected` **\_colIndexMap**: `Record`<`string`, `number`\> = `{}`

Map from column names to column indices.

#### Defined in

lib/Table.ts:11

___

### \_data

• `Protected` **\_data**: `T`[][] = `[]`

The data of the table.

#### Defined in

lib/Table.ts:21

___

### \_headers

• `Protected` **\_headers**: `string`[]

The headers of the table.

#### Defined in

lib/Table.ts:16

## Accessors

### data

• `get` **data**(): `T`[][]

Returns the table as a two-dimensional array, without column headers.

#### Returns

`T`[][]

#### Defined in

lib/Table.ts:90

___

### headers

• `get` **headers**(): `string`[]

Gets the column headers.

#### Returns

`string`[]

#### Defined in

lib/Table.ts:83

___

### numColumns

• `get` **numColumns**(): `number`

Gets the number of cols in the table, not including headers.

#### Returns

`number`

#### Defined in

lib/Table.ts:69

___

### numRows

• `get` **numRows**(): `number`

Gets the number of rows in the table, not including headers.

#### Returns

`number`

#### Defined in

lib/Table.ts:76

## Methods

### assertRowValidLength

▸ `Protected` **assertRowValidLength**(`row`): `void`

Checks if a row has the correct length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | `T`[] | The row to check. |

#### Returns

`void`

#### Defined in

lib/Table.ts:62

___

### get

▸ **get**(`column`, `row`): `T`

Returns a value at a given (row, col) position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` \| `number` | Column index or name |
| `row` | `number` | Row index |

#### Returns

`T`

#### Defined in

lib/Table.ts:99

___

### set

▸ **set**(`column`, `row`, `value`): [`Table`](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md)<`T`\>

Inserts a given value at a given (row, col) position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` \| `number` | Column index |
| `row` | `number` | Row index |
| `value` | `T` | The value to insert |

#### Returns

[`Table`](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md)<`T`\>

#### Defined in

lib/Table.ts:112

___

### toArray

▸ **toArray**(): (`string` \| `T`)[][]

Returns the table as a two-dimensional array, including row and column headers..

#### Returns

(`string` \| `T`)[][]

#### Defined in

lib/Table.ts:123

___

### toJSON

▸ **toJSON**(): [`ITableSerialized`](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/interfaces/ITableSerialized.md)<`T`\>

Override of the native toJSON method. When parsing the returned json string, it can be revived as a Table object when using the static Table.fromJSON method.

#### Returns

[`ITableSerialized`](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/interfaces/ITableSerialized.md)<`T`\>

#### Defined in

lib/Table.ts:131

___

### fromJSON

▸ `Static` **fromJSON**<`T`\>(`json`): [`Table`](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md)<`T`\>

Revive a stringified Table object.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `string` | a stringified Table object. |

#### Returns

[`Table`](https://github.com/bemoje/tsmono/blob/main/pkg/table/docs/md/classes/Table.md)<`T`\>

#### Defined in

lib/Table.ts:27
