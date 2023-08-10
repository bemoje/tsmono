[@bemoje/trie-map](/docs/md/index.md) / TrieMap

# Class: TrieMap<T\>

Class for a fast trie map.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](/docs/md/classes/TrieMap.md#constructor)

### Properties

- [root](/docs/md/classes/TrieMap.md#root)

### Accessors

- [count](/docs/md/classes/TrieMap.md#count)

### Methods

- [[iterator]](/docs/md/classes/TrieMap.md#[iterator])
- [clear](/docs/md/classes/TrieMap.md#clear)
- [delete](/docs/md/classes/TrieMap.md#delete)
- [deleteNodeValue](/docs/md/classes/TrieMap.md#deletenodevalue)
- [deleteStrict](/docs/md/classes/TrieMap.md#deletestrict)
- [entries](/docs/md/classes/TrieMap.md#entries)
- [find](/docs/md/classes/TrieMap.md#find)
- [forEach](/docs/md/classes/TrieMap.md#foreach)
- [get](/docs/md/classes/TrieMap.md#get)
- [getNode](/docs/md/classes/TrieMap.md#getnode)
- [getNodeValue](/docs/md/classes/TrieMap.md#getnodevalue)
- [getStrict](/docs/md/classes/TrieMap.md#getstrict)
- [getValues](/docs/md/classes/TrieMap.md#getvalues)
- [has](/docs/md/classes/TrieMap.md#has)
- [hasNodeValue](/docs/md/classes/TrieMap.md#hasnodevalue)
- [keys](/docs/md/classes/TrieMap.md#keys)
- [load](/docs/md/classes/TrieMap.md#load)
- [set](/docs/md/classes/TrieMap.md#set)
- [setNode](/docs/md/classes/TrieMap.md#setnode)
- [setNodeValue](/docs/md/classes/TrieMap.md#setnodevalue)
- [toArray](/docs/md/classes/TrieMap.md#toarray)
- [toJson](/docs/md/classes/TrieMap.md#tojson)
- [update](/docs/md/classes/TrieMap.md#update)
- [updateAll](/docs/md/classes/TrieMap.md#updateall)
- [updateNodeValue](/docs/md/classes/TrieMap.md#updatenodevalue)
- [validatePrefixInput](/docs/md/classes/TrieMap.md#validateprefixinput)
- [values](/docs/md/classes/TrieMap.md#values)
- [fromIterable](/docs/md/classes/TrieMap.md#fromiterable)
- [fromJSON](/docs/md/classes/TrieMap.md#fromjson)

## Constructors

### constructor

• **new TrieMap**<`T`\>()

Creates a new TrieMap instance.

#### Type parameters

| Name |
| :------ |
| `T` |

**`Example`**

```js
const trie = new TrieMap();
```

#### Defined in

core/TrieMap.ts:52

## Properties

### root

• **root**: `Record`<`string`, `any`\>

The TrieMap data structure root.

#### Defined in

core/TrieMap.ts:43

## Accessors

### count

• `get` **count**(): `number`

Returns the number of values in the TrieMap.

#### Returns

`number`

**`Example`**

```js
const trie = new TrieMap();
trie.
  .set(['some', 'path'], 'value')
  .count;
//=> 1
```

#### Defined in

core/TrieMap.ts:67

## Methods

### [iterator]

▸ **[iterator]**(`prefix?`): `Iterable`<[`string`[], `T`]\>

Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix?` | `string`[] | A string array. |

#### Returns

`Iterable`<[`string`[], `T`]\>

**`Example`**

```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);
[...trie];
//=> [
//   [['src', 'classes'], 2],
//   [['src', 'modules'], 2],
//   [['docs', 8]]
// ]
```

#### Defined in

core/TrieMap.ts:510

___

### clear

▸ **clear**(): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Deletes all entries from the TrieMap

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

this/self (chainable)

**`Example`**

```js
const trie = new TrieMap();
trie.set(['some', 'path'], 'value');
trie.clear();
trie.count;
//=> 0
```

#### Defined in

core/TrieMap.ts:87

___

### delete

▸ **delete**(`prefix`): `boolean`

Deletes the value at the given prefix. Returns whether the operation was successful.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |

#### Returns

`boolean`

**`Example`**

```js
const trie = new TrieMap();
trie.set(['some', 'path'], 'value');
trie.has(['some', 'path']);
//=> true
trie.delete(['some', 'path']);
//=> true (means operation was successful)
trie.has(['some', 'path']);
//=> false
```

#### Defined in

core/TrieMap.ts:224

___

### deleteNodeValue

▸ `Protected` **deleteNodeValue**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Record`<`string`, `any`\> |

#### Returns

`boolean`

#### Defined in

core/TrieMap.ts:593

___

### deleteStrict

▸ **deleteStrict**(`prefix`): `void`

Deletes the value at the given prefix or all values with the given prefix if ´prune´ is set to true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |

#### Returns

`void`

**`Throws`**

if the operation was unsuccessful.

**`Example`**

```js
const trie = new TrieMap();
trie.delete(['nonexistent', 'path']);
//=> false (operation unsuccessful)
trie.deleteStrict(['nonexistent', 'path']);
//=> throws Error
```

#### Defined in

core/TrieMap.ts:276

___

### entries

▸ **entries**(`prefix?`): `Iterable`<[`string`[], `T`]\>

Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `prefix` | `string`[] | `[]` | A string array. |

#### Returns

`Iterable`<[`string`[], `T`]\>

**`Example`**

```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);
[...trie.entries()];
//=> [
//   [['src', 'classes'], 2],
//   [['src', 'modules'], 2],
//   [['docs', 8]]
// ]
```

#### Defined in

core/TrieMap.ts:485

___

### find

▸ **find**(`prefix`, `valueToFind`, `f`): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Iterates all (value, prefix) where value === ´valueToFind´.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `valueToFind` | `T` | The value to look for. |
| `f` | (`value`: `T`, `prefix`: `string`[]) => `void` | A callback function. |

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

**`Example`**

```js
const directoryFileCounts = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);
const directoryPathsWithTwoFiles = [];
directoryFileCounts.find([], (value, prefix) => {
  if(value === 2) {
    directoryPathsWithTwoFiles.push(prefix);
  }
});
// directoryPathsWithTwoFiles will now contain: [
//   ['src', 'classes'],
//   ['src', 'modules']
// ]
```

#### Defined in

core/TrieMap.ts:392

___

### forEach

▸ **forEach**(`prefix`, `f`): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Iterate each (value, prefix) with the given prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `f` | (`value`: `T`, `prefix`: `string`[]) => `boolean` \| `void` | A callback function. Return true to terminate iteration. |

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

**`Example`**

```js
const directoryFileCounts = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 6)
  .set(['docs'], 8);
let totalFiles = 0;
directoryFileCounts.forEach([], (value, prefix) => {
  totalFiles += value;
});
// totalFiles (2 + 6 + 8) is now = 16
let totalSourceFiles = 0;
directoryFileCounts.forEach(['src'], (value, prefix) => {
  totalSourceFiles += value;
});
// totalSourceFiles (2 + 6) is now = 8
```

#### Defined in

core/TrieMap.ts:304

___

### get

▸ **get**(`prefix`): `undefined` \| `T`

Returns the value at a given prefix or undefined if no node is found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |

#### Returns

`undefined` \| `T`

**`Example`**

```js
const trie = new TrieMap();
trie.set(['some', 'path'], 4);
trie.get(['some', 'path']);
//=> 4
```

#### Defined in

core/TrieMap.ts:165

___

### getNode

▸ `Protected` **getNode**(`prefix`): `undefined` \| `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string`[] |

#### Returns

`undefined` \| `Record`<`string`, `any`\>

#### Defined in

core/TrieMap.ts:570

___

### getNodeValue

▸ `Protected` **getNodeValue**(`node`): `undefined` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Record`<`string`, `any`\> |

#### Returns

`undefined` \| `T`

#### Defined in

core/TrieMap.ts:589

___

### getStrict

▸ **getStrict**(`prefix`): `T`

Returns the value at a given prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |

#### Returns

`T`

**`Throws`**

if there is no value at the given prefix.

**`Example`**

```js
const trie = new TrieMap();
trie.get(['nonexistent', 'path']);
//=> undefined
trie.getStrict(['nonexistent', 'path']);
//=> throws Error
```

#### Defined in

core/TrieMap.ts:184

___

### getValues

▸ **getValues**(`prefix`): `T`[]

Returns an array of alle values that begin with a specified precix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |

#### Returns

`T`[]

**`Example`**

```js
const directoryFileCounts = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 3)
  .set(['docs'], 8);
directoryFileCounts.getAll(['src']);
//=> [2, 3]
```

#### Defined in

core/TrieMap.ts:414

___

### has

▸ **has**(`prefix`): `boolean`

Returns whether a value exists at the given prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |

#### Returns

`boolean`

**`Example`**

```js
const trie = new TrieMap();
trie.has(['some', 'path']);
//=> false
trie.set(['some', 'path'], 'value');
trie.has(['some', 'path']);
//=> true
```

#### Defined in

core/TrieMap.ts:203

___

### hasNodeValue

▸ `Protected` **hasNodeValue**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Record`<`string`, `any`\> |

#### Returns

`boolean`

#### Defined in

core/TrieMap.ts:597

___

### keys

▸ **keys**(`prefix?`): `Iterable`<`string`[]\>

Returns an Iterable that yields each prefix in the TrieMap with the given prefix.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `prefix` | `string`[] | `[]` | A string array. |

#### Returns

`Iterable`<`string`[]\>

**`Example`**

```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);
[...trie.keys()];
//=> [
//   ['src', 'classes'],
//   ['src', 'modules'],
//   ['docs']
// ]
```

#### Defined in

core/TrieMap.ts:439

___

### load

▸ **load**(`iterable`): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Insert multiple entries into the TrieMap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `Iterable`<[`string`[], `T`]\> | An array or other iterable that yields entries. |

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

this/self (chainable)

**`Example`**

```js
const trie = new TrieMap().load([
  [['some', 'path'], 'value1'],
  [['other', 'path'], 'value2']
]);
```

#### Defined in

core/TrieMap.ts:104

___

### set

▸ **set**(`prefix`, `value`): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Insert a value into the TrieMap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `value` | `T` | The value to insert. |

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

this/self (chainable)

**`Example`**

```js
const trie = new TrieMap()
  .set(['some', 'path'], 'value1');
  .set(['other', 'path'], 'value2');
```

#### Defined in

core/TrieMap.ts:123

___

### setNode

▸ `Protected` **setNode**(`prefix`): `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string`[] |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

core/TrieMap.ts:562

___

### setNodeValue

▸ `Protected` **setNodeValue**(`node`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Record`<`string`, `any`\> |
| `value` | `T` |

#### Returns

`void`

#### Defined in

core/TrieMap.ts:581

___

### toArray

▸ **toArray**(`prefix?`): [`string`[], `T`][]

Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `prefix` | `string`[] | `[]` | A string array. |

#### Returns

[`string`[], `T`][]

**`Example`**

```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);
trie.toArray();
//=> [
//   [['src', 'classes'], 2],
//   [['src', 'modules'], 2],
//   [['docs', 8]]
// ]
```

#### Defined in

core/TrieMap.ts:531

___

### toJson

▸ **toJson**(`pretty?`): `string`

Returns the trie map data structure as pretty printed JSON.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pretty` | `boolean` | `false` | Whether to return a pretty formatted JSON string rather than a condensed machine readble string. |

#### Returns

`string`

**`Example`**

```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);
trie.toJson();
//=> "{root:{src:{classes:2,modules:2,},docs:8,}}"
trie.toJson(true);
//=> {
//   root: {
//     src: {
//       classes: 2,
//       modules: 2,
//     },
//     docs: 8,
//   },
// }
```

#### Defined in

core/TrieMap.ts:558

___

### update

▸ **update**(`prefix`, `f`): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Updates a value in the TrieMap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `f` | (`value`: `T`) => `T` | A function that when passed the current value, will return another replacement value. |

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

this/self (chainable)

**`Example`**

```js
const trie = new TrieMap();
trie.set(['some', 'path'], 4);
trie.get(['some', 'path']);
//=> 4
trie.update(['some', 'path'], (value) => {
  return value + 2
});
trie.get(['some', 'path']);
//=> 6
```

#### Defined in

core/TrieMap.ts:146

___

### updateAll

▸ **updateAll**(`prefix`, `f`): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Iterate each (value, prefix) with the given prefix and replace all elements using a callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `f` | (`value`: `T`, `prefix?`: `string`[]) => `T` | A callback function. |

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

**`Example`**

```js
const trie = new TrieMap();
trie.load([
  [['a'], 0],
  [['b'], 1],
  [['a', 'a'], 2],
]);
trie.updateAll([], (value) => value + 1);
trie.get(['a']) // => 1
trie.get(['b']) // => 2
trie.get(['a', 'a']) // => 3
```

#### Defined in

core/TrieMap.ts:347

___

### updateNodeValue

▸ `Protected` **updateNodeValue**(`node`, `f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Record`<`string`, `any`\> |
| `f` | (`value`: `T`) => `T` |

#### Returns

`void`

#### Defined in

core/TrieMap.ts:585

___

### validatePrefixInput

▸ `Protected` **validatePrefixInput**(`prefix`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string`[] |

#### Returns

`string`[]

#### Defined in

core/TrieMap.ts:601

___

### values

▸ **values**(`prefix?`): `Iterable`<`T`\>

Returns an Iterable that yields each value in the TrieMap with the given prefix.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `prefix` | `string`[] | `[]` | A string array. |

#### Returns

`Iterable`<`T`\>

**`Example`**

```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);
[...trie.values()];
//=> [2, 2, 8]
```

#### Defined in

core/TrieMap.ts:460

___

### fromIterable

▸ `Static` **fromIterable**<`T`\>(`iterable`): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Creates a new instance from existing data.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `Iterable`<[`string`[], `T`]\> | An interable that yields entries. |

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

**`Example`**

```js
const trie = TrieMap.fromIterable([
  [['some', 'path'], 'value1'],
  [['other', 'path'], 'value2']
]);
```

#### Defined in

core/TrieMap.ts:35

___

### fromJSON

▸ `Static` **fromJSON**<`T`\>(`json`): [`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

Creates a new instance from existing data.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `string` | A JSON-string (a previously stringified TrieMap instance). |

#### Returns

[`TrieMap`](/docs/md/classes/TrieMap.md)<`T`\>

**`Example`**

```js
const json = new TrieMap()
  .set(['some', 'path'], 'value')
  .toJson();
const trie = TrieMap.fromJSON(json);
```

#### Defined in

core/TrieMap.ts:18
