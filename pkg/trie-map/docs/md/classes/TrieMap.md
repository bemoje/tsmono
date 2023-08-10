[@bemoje/trie-map](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/index.md) / TrieMap

# Class: TrieMap<T\>

Class for a fast trie map.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#constructor)

### Properties

- [root](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#root)

### Accessors

- [count](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#count)

### Methods

- [[iterator]](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#[iterator])
- [clear](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#clear)
- [delete](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#delete)
- [deleteNodeValue](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#deletenodevalue)
- [deleteStrict](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#deletestrict)
- [entries](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#entries)
- [find](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#find)
- [forEach](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#foreach)
- [get](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#get)
- [getNode](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#getnode)
- [getNodeValue](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#getnodevalue)
- [getStrict](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#getstrict)
- [getValues](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#getvalues)
- [has](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#has)
- [hasNodeValue](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#hasnodevalue)
- [keys](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#keys)
- [load](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#load)
- [set](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#set)
- [setNode](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#setnode)
- [setNodeValue](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#setnodevalue)
- [toArray](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#toarray)
- [toJson](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#tojson)
- [update](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#update)
- [updateAll](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#updateall)
- [updateNodeValue](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#updatenodevalue)
- [validatePrefixInput](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#validateprefixinput)
- [values](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#values)
- [fromIterable](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#fromiterable)
- [fromJSON](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md#fromjson)

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

[core/TrieMap.ts:52](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L52)

## Properties

### root

• **root**: `Record`<`string`, `any`\>

The TrieMap data structure root.

#### Defined in

[core/TrieMap.ts:43](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L43)

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

[core/TrieMap.ts:67](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L67)

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

[core/TrieMap.ts:510](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L510)

___

### clear

▸ **clear**(): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

Deletes all entries from the TrieMap

#### Returns

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

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

[core/TrieMap.ts:87](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L87)

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

[core/TrieMap.ts:224](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L224)

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

[core/TrieMap.ts:593](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L593)

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

[core/TrieMap.ts:276](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L276)

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

[core/TrieMap.ts:485](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L485)

___

### find

▸ **find**(`prefix`, `valueToFind`, `f`): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

Iterates all (value, prefix) where value === ´valueToFind´.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `valueToFind` | `T` | The value to look for. |
| `f` | (`value`: `T`, `prefix`: `string`[]) => `void` | A callback function. |

#### Returns

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

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

[core/TrieMap.ts:392](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L392)

___

### forEach

▸ **forEach**(`prefix`, `f`): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

Iterate each (value, prefix) with the given prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `f` | (`value`: `T`, `prefix`: `string`[]) => `boolean` \| `void` | A callback function. Return true to terminate iteration. |

#### Returns

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

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

[core/TrieMap.ts:304](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L304)

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

[core/TrieMap.ts:165](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L165)

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

[core/TrieMap.ts:570](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L570)

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

[core/TrieMap.ts:589](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L589)

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

[core/TrieMap.ts:184](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L184)

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

[core/TrieMap.ts:414](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L414)

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

[core/TrieMap.ts:203](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L203)

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

[core/TrieMap.ts:597](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L597)

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

[core/TrieMap.ts:439](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L439)

___

### load

▸ **load**(`iterable`): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

Insert multiple entries into the TrieMap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `Iterable`<[`string`[], `T`]\> | An array or other iterable that yields entries. |

#### Returns

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

this/self (chainable)

**`Example`**

```js
const trie = new TrieMap().load([
  [['some', 'path'], 'value1'],
  [['other', 'path'], 'value2']
]);
```

#### Defined in

[core/TrieMap.ts:104](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L104)

___

### set

▸ **set**(`prefix`, `value`): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

Insert a value into the TrieMap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `value` | `T` | The value to insert. |

#### Returns

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

this/self (chainable)

**`Example`**

```js
const trie = new TrieMap()
  .set(['some', 'path'], 'value1');
  .set(['other', 'path'], 'value2');
```

#### Defined in

[core/TrieMap.ts:123](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L123)

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

[core/TrieMap.ts:562](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L562)

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

[core/TrieMap.ts:581](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L581)

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

[core/TrieMap.ts:531](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L531)

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

[core/TrieMap.ts:558](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L558)

___

### update

▸ **update**(`prefix`, `f`): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

Updates a value in the TrieMap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `f` | (`value`: `T`) => `T` | A function that when passed the current value, will return another replacement value. |

#### Returns

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

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

[core/TrieMap.ts:146](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L146)

___

### updateAll

▸ **updateAll**(`prefix`, `f`): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

Iterate each (value, prefix) with the given prefix and replace all elements using a callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string`[] | A string array. |
| `f` | (`value`: `T`, `prefix?`: `string`[]) => `T` | A callback function. |

#### Returns

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

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

[core/TrieMap.ts:347](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L347)

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

[core/TrieMap.ts:585](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L585)

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

[core/TrieMap.ts:601](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L601)

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

[core/TrieMap.ts:460](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L460)

___

### fromIterable

▸ `Static` **fromIterable**<`T`\>(`iterable`): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

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

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

**`Example`**

```js
const trie = TrieMap.fromIterable([
  [['some', 'path'], 'value1'],
  [['other', 'path'], 'value2']
]);
```

#### Defined in

[core/TrieMap.ts:35](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L35)

___

### fromJSON

▸ `Static` **fromJSON**<`T`\>(`json`): [`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

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

[`TrieMap`](https://github.com/bemoje/tsmono/blob/main/pkg/trie-map/docs/md/classes/TrieMap.md)<`T`\>

**`Example`**

```js
const json = new TrieMap()
  .set(['some', 'path'], 'value')
  .toJson();
const trie = TrieMap.fromJSON(json);
```

#### Defined in

[core/TrieMap.ts:18](https://github.com/bemoje/tsmono/blob/f74277c/pkg/trie-map/src/core/TrieMap.ts#L18)
