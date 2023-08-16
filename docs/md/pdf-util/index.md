@bemoje/pdf-util

# @bemoje/pdf-util

## Table of contents

### Functions

- [pdfGetPages](https://github.com/bemoje/tsmono/blob/main/docs/md/pdf-util/index.md#pdfgetpages)
- [pdfIteratePages](https://github.com/bemoje/tsmono/blob/main/docs/md/pdf-util/index.md#pdfiteratepages)
- [pdfSplitPages](https://github.com/bemoje/tsmono/blob/main/docs/md/pdf-util/index.md#pdfsplitpages)

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

[lib/pdfGetPages.ts:14](https://github.com/bemoje/tsmono/blob/87185a0/pkg/pdf-util/src/lib/pdfGetPages.ts#L14)

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

[lib/pdfIteratePages.ts:18](https://github.com/bemoje/tsmono/blob/87185a0/pkg/pdf-util/src/lib/pdfIteratePages.ts#L18)

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

[lib/pdfSplitPages.ts:24](https://github.com/bemoje/tsmono/blob/87185a0/pkg/pdf-util/src/lib/pdfSplitPages.ts#L24)
