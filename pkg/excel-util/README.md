# @bemoje/excel-util
CSV and Excel utilities for parsing, reading, writing.

![GitHub Top Language](https://img.shields.io/github/languages/top/bemoje/https://github.com/bemoje/tsmono)

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/bemoje/https://github.com/bemoje/tsmono?color=red)
![GitHub Stars](https://img.shields.io/github/stars/bemoje/https://github.com/bemoje/tsmono)
![GitHub Forks](https://img.shields.io/github/forks/bemoje/https://github.com/bemoje/tsmono)
![GitHub Watchers](https://img.shields.io/github/watchers/bemoje/https://github.com/bemoje/tsmono)
![GitHub Repo Size](https://img.shields.io/github/repo-size/bemoje/https://github.com/bemoje/tsmono)

##### NPM
<span><a href="https://npmjs.org/@bemoje/excel-util" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/excel-util" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/@bemoje/excel-util" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/@bemoje/excel-util" alt="NPM Downloads" /></a></span>


##### Donate
<span><a href="https://www.patreon.com/user?u=40752770" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
```sh
npm install @bemoje/excel-util
```


## Issues
Please let me know of any bugs or [issues](https://github.com/bemoje/https://github.com/bemoje/tsmono/issues).

## Contribute
Contributors are welcome to open a [pull request](https://github.com/bemoje/https://github.com/bemoje/tsmono/pulls).

## License
Released under the [MIT License](./LICENSE).

## Documentation
- [HTML](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/html/index.html)
- [Markdown](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/md/index.md)

### Functions

- [A1ToColRow](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/md/index.md#a1tocolrow)
- [colRowToA1](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/md/index.md#colrowtoa1)
- [colToLetter](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/md/index.md#coltoletter)
- [csvParseStream](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/md/index.md#csvparsestream)
- [letterToCol](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/md/index.md#lettertocol)
- [readExcelFile](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/md/index.md#readexcelfile)
- [writeExcelFile](https://github.com/bemoje/tsmono/blob/main/pkg/excel-util/docs/md/index.md#writeexcelfile)

## Functions

### A1ToColRow

▸ **A1ToColRow**(`A1`, `zeroIndexed?`): `number`[]

Converts an A1 notation string to a column-row pair.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `A1` | `string` | `undefined` | The A1 notation string to convert. |
| `zeroIndexed` | `boolean` | `false` | Optional. If true, the returned indices will be zero-based. Default is false. |

#### Returns

`number`[]

An array where the first element is the column index and the second element is the row index.

**`Throws`**

If the A1 string is invalid.

**`Example`**

```ts
//=> [1, 1]
A1ToColRow('B2', true);
//=> [1, 1]
```

#### Defined in

[lib/spreadsheet/A1ToColRow.ts:17](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/excel-util/src/lib/spreadsheet/A1ToColRow.ts#L17)

___

### colRowToA1

▸ **colRowToA1**(`CR`, `zeroIndexed?`): `string`

Converts a column and row index to A1 notation.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `CR` | `number`[] | `undefined` | An array of two numbers where the first number is the column index and the second number is the row index. |
| `zeroIndexed` | `boolean` | `false` | A boolean indicating whether the column and row indexes are zero-based. Defaults to false. |

#### Returns

`string`

The A1 notation of the column and row index.

**`Throws`**

If the length of the CR array is not 2.

**`Throws`**

If the row index is not an integer.

**`Throws`**

If the row index is less than 1.

**`Example`**

```ts
colRowToA1([3, 5]);;
//=> 'D5'
colRowToA1([3, 5], true);;
//=> 'C5'
```

#### Defined in

[lib/spreadsheet/colRowToA1.ts:18](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/excel-util/src/lib/spreadsheet/colRowToA1.ts#L18)

___

### colToLetter

▸ **colToLetter**(`col`, `zeroIndexed?`): `string`

Converts a column number to a column letter (e.g. 1 => 'A', 27 => 'AA').

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `col` | `number` | `undefined` | The column number to convert. Must be a positive integer. |
| `zeroIndexed` | `boolean` | `false` | Optional. Whether the column number is zero-indexed. Defaults to false. |

#### Returns

`string`

The column letter corresponding to the column number.

**`Throws`**

If `col` is not an integer.

**`Throws`**

If `col` is less than 1.

**`Example`**

```ts
colToLetter(1);;
//=> 'A'
colToLetter(27);;
//=> 'AA'
colToLetter(1, true);;
//=> 'B'
```

#### Defined in

[lib/spreadsheet/colToLetter.ts:17](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/excel-util/src/lib/spreadsheet/colToLetter.ts#L17)

___

### csvParseStream

▸ **csvParseStream**(`stream`, `options`): `Promise`<`Record`<`string`, `string`\>[]\>

Parse a Readable stream of CSV lines into an array of objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | `Readable` | The Readable stream of CSV lines. |
| `options` | `Options` | The options to pass to the CSV parser. |

#### Returns

`Promise`<`Record`<`string`, `string`\>[]\>

An array of objects, where each object represents a row in the CSV.

**`Example`**

```ts
// parse a CSV file
const stream = fs.createReadStream('data.csv');
const options = { separator: ';', strict: true };
const data = await csvParseStream(stream, options);
// parse a CSV string
const stream = new StringSteam('Name;Age;Country\nJohn;25;USA\nAlice;30;Canada\n');
const options = { separator: ';', strict: true };
const data = await csvParseStream(stream, options);
//=> [{Name:'John',Age:'25',Country:'USA'},{Name:'Alice',Age:'30',Country:'Canada'}]
```

#### Defined in

[lib/csvParseStream.ts:21](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/excel-util/src/lib/csvParseStream.ts#L21)

___

### letterToCol

▸ **letterToCol**(`A`, `zeroIndexed?`): `number`

Converts a column letter (e.g., A, B, C, ..., Z, AA, AB, ...) to a column number.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `A` | `string` | `undefined` | The column letter to convert. |
| `zeroIndexed` | `boolean` | `false` | Optional. If true, the function will return a zero-indexed column number. Default is false. |

#### Returns

`number`

The column number corresponding to the input column letter.

**`Throws`**

Will throw an error if the input column letter is invalid.

**`Example`**

```ts
letterToCol('A');;
//=> 1
letterToCol('Z');;
//=> 26
letterToCol('AA');;
//=> 27
letterToCol('AB', true);;
//=> 27
```

#### Defined in

[lib/spreadsheet/letterToCol.ts:18](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/excel-util/src/lib/spreadsheet/letterToCol.ts#L18)

___

### readExcelFile

▸ **readExcelFile**(`filepath`): `Promise`<`Record`<`string`, `string`[][]\>\>

Reads an Excel file and returns its content as a record where each key is the name of a worksheet and its value is a 2D array of strings representing the rows and cells of the worksheet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path to the Excel file to read. |

#### Returns

`Promise`<`Record`<`string`, `string`[][]\>\>

A Promise that resolves to a record where each key is the name of a worksheet and its value is a 2D array of strings representing the rows and cells of the worksheet.

**`Remarks`**

This function uses the `exceljs` library to read the Excel file. It will throw an error if the file does not exist or is not a valid Excel file.

**`Throws`**

Will throw an error if the file does not exist or is not a valid Excel file.

**`Example`**

```ts
readExcelFile('path/to/file.xlsx').then((worksheets) => {
  console.log(worksheets['Sheet1']); // logs the content of 'Sheet1'
});
```

#### Defined in

[lib/readExcelFile.ts:16](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/excel-util/src/lib/readExcelFile.ts#L16)

___

### writeExcelFile

▸ **writeExcelFile**<`T`\>(`filepath`, `data`): `Promise`<`void`\>

Write multiple tables to an Excel file as worksheets.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the data that will be written to the Excel file. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path where the Excel file will be written. |
| `data` | `Record`<`string`, `T`[][]\> | An object where each key is a worksheet name and the corresponding value is a 2D array of data to be written to that worksheet. |

#### Returns

`Promise`<`void`\>

A Promise that resolves when the file has been written.

**`Remarks`**

This function creates a new Excel file or overwrites an existing one.
Each key in the data object will be used as a worksheet name, and the corresponding 2D array will be written to that worksheet.

**`Throws`**

If there is an error writing the file.

**`Example`**

```ts
await writeExcelFile('path/to/file.xlsx', {
  employees: [
    ['Name', 'Age', 'Title'],
    ['John', 30, 'Software Developer'],
    ['Jane', 28, 'Data Scientist'],
  ],
  locations: [
    ['ID', 'Country', 'City'],
    [1, 'DK', 'Aarhus'],
    [2, 'DK', 'Copenhagen'],
  ],
})
```

#### Defined in

[lib/writeExcelFile.ts:28](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/excel-util/src/lib/writeExcelFile.ts#L28)
