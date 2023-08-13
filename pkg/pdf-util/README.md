# @bemoje/pdf-util
PDF utilities for parsing, merging, splitting, and more.

![GitHub Top Language](https://img.shields.io/github/languages/top/bemoje/https://github.com/bemoje/tsmono)

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/bemoje/https://github.com/bemoje/tsmono?color=red)
![GitHub Stars](https://img.shields.io/github/stars/bemoje/https://github.com/bemoje/tsmono)
![GitHub Forks](https://img.shields.io/github/forks/bemoje/https://github.com/bemoje/tsmono)
![GitHub Watchers](https://img.shields.io/github/watchers/bemoje/https://github.com/bemoje/tsmono)
![GitHub Repo Size](https://img.shields.io/github/repo-size/bemoje/https://github.com/bemoje/tsmono)

##### NPM
<span><a href="https://npmjs.org/@bemoje/pdf-util" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/pdf-util" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/@bemoje/pdf-util" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/@bemoje/pdf-util" alt="NPM Downloads" /></a></span>


##### Donate
<span><a href="https://www.patreon.com/user?u=40752770" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
```sh
npm install @bemoje/pdf-util
```


## Issues
Please let me know of any bugs or [issues](https://github.com/bemoje/https://github.com/bemoje/tsmono/issues).

## Contribute
Contributors are welcome to open a [pull request](https://github.com/bemoje/https://github.com/bemoje/tsmono/pulls).

## License
Released under the [MIT License](./LICENSE).

## Documentation
- [HTML](https://github.com/bemoje/tsmono/blob/main/pkg/pdf-util/docs/html/index.html)
- [Markdown](https://github.com/bemoje/tsmono/blob/main/pkg/pdf-util/docs/md/index.md)

### Functions

- [pdfGetPages](https://github.com/bemoje/tsmono/blob/main/pkg/pdf-util/docs/md/index.md#pdfgetpages)
- [pdfIteratePages](https://github.com/bemoje/tsmono/blob/main/pkg/pdf-util/docs/md/index.md#pdfiteratepages)
- [pdfSplitPages](https://github.com/bemoje/tsmono/blob/main/pkg/pdf-util/docs/md/index.md#pdfsplitpages)

## Functions

### pdfGetPages

▸ **pdfGetPages**(`filepath`, `begin?`, `end?`): `Promise`<`string`[]\>

Parse text content of each page in a PDF file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path to the PDF file. |
| `begin?` | `number` | The starting page number for the range of pages to retrieve. Optional. |
| `end?` | `number` | The ending page number for the range of pages to retrieve. Optional. |

#### Returns

`Promise`<`string`[]\>

A Promise that resolves to an array of strings, where each string represents a page in the PDF.

**`Example`**

```ts
const pages = await pdfGetPages('/path/to/pdf', 1, 5);
console.log(pages); // logs the first 5 pages of the PDF
```

#### Defined in

[lib/pdfGetPages.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/pdf-util/src/lib/pdfGetPages.ts#L14)

___

### pdfIteratePages

▸ **pdfIteratePages**(`filepath`, `begin?`, `end?`): `AsyncGenerator`<`string`\>

Parse text content of each page in a PDF file. Array indices correspond to page numbers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path to the PDF file. |
| `begin?` | `number` | The page number to start from. If not provided, defaults to the first page. |
| `end?` | `number` | The page number to end at. If not provided, defaults to the last page. |

#### Returns

`AsyncGenerator`<`string`\>

An async generator that yields the text content of each page in the PDF.

**`Throws`**

Will yield an empty string if an error occurs while processing a page.

**`Example`**

```ts
for await (const pageText of pdfIteratePages('path/to/file.pdf')) {
  console.log(pageText);
}
```

#### Defined in

[lib/pdfIteratePages.ts:18](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/pdf-util/src/lib/pdfIteratePages.ts#L18)

___

### pdfSplitPages

▸ **pdfSplitPages**(`filepath`, `outputDirpath`): `Promise`<`string`[]\>

Split a given PDF file into separate single-page-files.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path to the PDF file to be split. |
| `outputDirpath` | `string` | The directory where the split PDF pages should be saved. |

#### Returns

`Promise`<`string`[]\>

A promise that resolves to an array of filepaths for the split PDF pages.

**`Remarks`**

This function reads a PDF file from the provided filepath, splits it into separate pages,
and saves each page as a separate PDF file in the specified output directory.
The filenames of the output files are zero-padded based on the total number of pages in the original document.

**`Throws`**

Will throw an error if the input file cannot be read or the output directory cannot be created.

**`Example`**

```ts
const inputFilePath = '/path/to/input.pdf';
const outputDirPath = '/path/to/output/directory';
pdfSplitPages(inputFilePath, outputDirPath)
  .then(filepaths => console.log(filepaths))
  .catch(error => console.error(error));
```

#### Defined in

[lib/pdfSplitPages.ts:24](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/pdf-util/src/lib/pdfSplitPages.ts#L24)
