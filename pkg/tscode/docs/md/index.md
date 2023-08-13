@bemoje/tscode

# @bemoje/tscode

## Table of contents

### Interfaces

- [ITsExtractImportsResult](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/interfaces/ITsExtractImportsResult.md)

### Functions

- [tsCountExports](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tscountexports)
- [tsExtractImports](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tsextractimports)
- [tsExtractJestTests](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tsextractjesttests)
- [tsGetClassMemberAccessModifiers](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tsgetclassmemberaccessmodifiers)
- [tsHasDefaultExport](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tshasdefaultexport)
- [tsJestConvertExportNameString](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tsjestconvertexportnamestring)
- [tsJestEnsureLineSpacing](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tsjestensurelinespacing)
- [tsSimpleMinifyCode](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tssimpleminifycode)
- [tsStripDeclSourceMapComments](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tsstripdeclsourcemapcomments)
- [tsStripExportKeyword](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tsstripexportkeyword)
- [tsStripImports](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/index.md#tsstripimports)

## Functions

### tsCountExports

▸ **tsCountExports**(`code`): `number`

Counts the number of export statements in a given code string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The code string to analyze. |

#### Returns

`number`

The number of export statements found in the code.

**`Example`**

```ts
const code = `
  export const foo = 42;
  export function bar() {
    return "Hello, world!";
  }
`;
const count = tsCountExports(code);
//=> 2
```

#### Defined in

[lib/tsCountExports.ts:16](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsCountExports.ts#L16)

___

### tsExtractImports

▸ **tsExtractImports**(`code`): [`ITsExtractImportsResult`](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/interfaces/ITsExtractImportsResult.md)[]

Extract all import statements from a given TypeScript source code string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code as a string from which to extract import statements. |

#### Returns

[`ITsExtractImportsResult`](https://github.com/bemoje/tsmono/blob/main/pkg/tscode/docs/md/interfaces/ITsExtractImportsResult.md)[]

An array of objects, each representing an import statement. Each object includes the start and end line numbers (0-indexed) of the import statement in the original code, and the full text of the import statement.

#### Defined in

[lib/tsExtractImports.ts:8](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsExtractImports.ts#L8)

___

### tsExtractJestTests

▸ **tsExtractJestTests**(`code`): `string`

Extracts Jest test cases from a given TypeScript code string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code string to extract Jest tests from. |

#### Returns

`string`

The extracted Jest tests as a string.

**`Remarks`**

This function is useful when you want to isolate and analyze test cases from a larger codebase.
It works by finding the first line that starts with 'describe(' and the last line that is '})', and returns the lines in between.
If it cannot find these lines, it throws an error.

**`Throws`**

Will throw an error if the input source code does not contain Jest tests.

#### Defined in

[lib/tsExtractJestTests.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsExtractJestTests.ts#L13)

___

### tsGetClassMemberAccessModifiers

▸ **tsGetClassMemberAccessModifiers**(`code`): `Record`<`string`, ``"protected"`` \| ``"private"``\>

Returns a map of the private and protected class properties and methods of the provided TypeScript code for a class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code string to extract the class member access modifiers from. |

#### Returns

`Record`<`string`, ``"protected"`` \| ``"private"``\>

A record where the keys are the names of the class members and the values are their corresponding access modifiers.

**`Remarks`**

This function does not handle public class members as they do not explicitly have an access modifier in TypeScript.

**`Throws`**

an error if the provided code string is not valid TypeScript code.

**`Example`**

```ts
const code = `
class MyClass {
  private myPrivateMethod() {}
  protected myProtectedMethod() {}
}`;
tsGetClassMemberAccessModifiers(code);
//=> { myPrivateMethod: 'private', myProtectedMethod: 'protected' }
```

#### Defined in

[lib/tsGetClassMemberAccessModifiers.ts:20](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsGetClassMemberAccessModifiers.ts#L20)

___

### tsHasDefaultExport

▸ **tsHasDefaultExport**(`code`): `boolean`

Checks if the provided TypeScript code has a default export.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code to check. |

#### Returns

`boolean`

A boolean indicating whether the provided TypeScript code has a default export.

**`Example`**

```ts
const code = `export default function() {}`;
tsHasDefaultExport(code);
//=> true
```

#### Defined in

[lib/tsHasDefaultExport.ts:11](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsHasDefaultExport.ts#L11)

___

### tsJestConvertExportNameString

▸ **tsJestConvertExportNameString**(`code`, `funName`): `string`

Converts the name of an exported function or variable in a Jest test suite to use the `.name` property of the exported item.
This is useful for keeping test suite names in sync with the names of the items they are testing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The source code of the Jest test suite. |
| `funName` | `string` | The name of the function being tested. |

#### Returns

`string`

The modified source code.

**`Example`**

```ts
const code = `describe('myFunction', () => {...})`;
const exportName = 'myFunction';
const newCode = tsJestConvertExportNameString(code, exportName);
//=> `describe(myFunction.name, () => {...})`
```

#### Defined in

[lib/tsJestConvertExportNameString.ts:14](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsJestConvertExportNameString.ts#L14)

___

### tsJestEnsureLineSpacing

▸ **tsJestEnsureLineSpacing**(`code`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`string`

#### Defined in

[lib/tsJestEnsureLineSpacing.ts:3](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsJestEnsureLineSpacing.ts#L3)

___

### tsSimpleMinifyCode

▸ **tsSimpleMinifyCode**(`string`): `string`

Minifies the given TypeScript code by removing empty lines and trimming lines.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The TypeScript code to minify. |

#### Returns

`string`

The minified TypeScript code.

**`Example`**

```ts
//
```

**`Function`**

tsSimpleMinifyCode

#### Defined in

[lib/tsSimpleMinifyCode.ts:12](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsSimpleMinifyCode.ts#L12)

___

### tsStripDeclSourceMapComments

▸ **tsStripDeclSourceMapComments**(`code`): `string`

Strips out TypeScript declaration source map comments from the provided code string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code string from which to strip source map comments. |

#### Returns

`string`

The cleaned TypeScript code string without source map comments.

**`Remarks`**

This function is useful when you want to clean up TypeScript code for readability or performance reasons.

**`Example`**

```ts
tsStripDeclSourceMapComments(
  ['// some code', '//# sourceMappingURL=createEncapsulatingRegex.d.ts.map', ''].join('\n')
);
//=> '// some code\n'
```

#### Defined in

[lib/tsStripDeclSourceMapComments.ts:13](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsStripDeclSourceMapComments.ts#L13)

___

### tsStripExportKeyword

▸ **tsStripExportKeyword**(`source`): `string`

Strips the 'export' keyword from the beginning of each line in the provided source string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The source string from which to strip the 'export' keyword. |

#### Returns

`string`

The source string with the 'export' keyword stripped from the beginning of each line.

**`Remarks`**

This function is useful when you want to remove the 'export' keyword from TypeScript code.

**`Example`**

```ts
tsStripExportKeyword('export const foo = "bar";\nexport function baz() {}');;
//=> 'const foo = "bar";\nfunction baz() {}'
```

#### Defined in

[lib/tsStripExportKeyword.ts:11](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsStripExportKeyword.ts#L11)

___

### tsStripImports

▸ **tsStripImports**(`code`): `string`

Strips all import statements from a given TypeScript code string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The TypeScript code to strip import statements from. |

#### Returns

`string`

The TypeScript code without import statements.

**`Example`**

```ts
const code = `
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
const a = 1;
`.trim()
tsStripImports(code)
//=> 'const a = 1;'
```

#### Defined in

[lib/tsStripImports.ts:18](https://github.com/bemoje/tsmono/blob/ad6c8c6/pkg/tscode/src/lib/tsStripImports.ts#L18)
