[@bemoje/matrix](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/index.md) / Matrix

# Class: Matrix

## Table of contents

### Constructors

- [constructor](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#constructor)

### Properties

- [immutable](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#immutable)
- [matrix](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#matrix)

### Accessors

- [cols](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#cols)
- [rows](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#rows)

### Methods

- [[iterator]](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#[iterator])
- [addBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#addby)
- [addColBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#addcolby)
- [addRowBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#addrowby)
- [appendCol](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#appendcol)
- [appendRow](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#appendrow)
- [clone](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#clone)
- [deepEquals](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#deepequals)
- [divideBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#divideby)
- [divideColBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#dividecolby)
- [divideRowBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#dividerowby)
- [dotProduct](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#dotproduct)
- [every](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#every)
- [forEach](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#foreach)
- [forEachInCol](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#foreachincol)
- [forEachInDiagonal](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#foreachindiagonal)
- [forEachInRow](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#foreachinrow)
- [get](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#get)
- [getImmutable](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#getimmutable)
- [has](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#has)
- [hasDimensions](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#hasdimensions)
- [isSameInstanceAs](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#issameinstanceas)
- [isScalarMatrix](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#isscalarmatrix)
- [isSquareMatrix](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#issquarematrix)
- [isZeroMatrix](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#iszeromatrix)
- [map](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#map)
- [mapCol](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#mapcol)
- [mapRow](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#maprow)
- [multiplyBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#multiplyby)
- [multiplyColBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#multiplycolby)
- [multiplyRowBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#multiplyrowby)
- [set](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#set)
- [setImmutable](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#setimmutable)
- [some](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#some)
- [subtractBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#subtractby)
- [subtractColBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#subtractcolby)
- [subtractRowBy](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#subtractrowby)
- [swapCols](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#swapcols)
- [swapRows](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#swaprows)
- [toArray](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#toarray)
- [values](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#values)
- [fromArray](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#fromarray)
- [fromIterable](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#fromiterable)
- [identity](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md#identity)

## Constructors

### constructor

• **new Matrix**(`rows`, `cols`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `number` |
| `cols` | `number` |

#### Defined in

[lib/Matrix.ts:35](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L35)

## Properties

### immutable

• `Protected` **immutable**: `boolean` = `false`

#### Defined in

[lib/Matrix.ts:3](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L3)

___

### matrix

• `Protected` **matrix**: `number`[][]

#### Defined in

[lib/Matrix.ts:2](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L2)

## Accessors

### cols

• `get` **cols**(): `number`

#### Returns

`number`

#### Defined in

[lib/Matrix.ts:48](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L48)

___

### rows

• `get` **rows**(): `number`

#### Returns

`number`

#### Defined in

[lib/Matrix.ts:44](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L44)

## Methods

### [iterator]

▸ **[iterator]**(): `Generator`<`number`, `any`, `unknown`\>

#### Returns

`Generator`<`number`, `any`, `unknown`\>

#### Defined in

[lib/Matrix.ts:157](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L157)

___

### addBy

▸ **addBy**(`n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:213](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L213)

___

### addColBy

▸ **addColBy**(`col`, `n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `number` |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:253](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L253)

___

### addRowBy

▸ **addRowBy**(`row`, `n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:233](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L233)

___

### appendCol

▸ **appendCol**(`col?`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col?` | `number`[] |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:198](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L198)

___

### appendRow

▸ **appendRow**(`row?`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row?` | `number`[] |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:185](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L185)

___

### clone

▸ **clone**(): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:99](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L99)

___

### deepEquals

▸ **deepEquals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md) \| `number`[][] |

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:65](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L65)

___

### divideBy

▸ **divideBy**(`n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:228](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L228)

___

### divideColBy

▸ **divideColBy**(`col`, `n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `number` |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:268](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L268)

___

### divideRowBy

▸ **divideRowBy**(`row`, `n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:248](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L248)

___

### dotProduct

▸ **dotProduct**(`other`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

Performs dot product of the matrix with another given matrix.

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md) |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:344](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L344)

___

### every

▸ **every**(`f`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `number`, `row`: `number`, `col`: `number`) => `boolean` |

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:304](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L304)

___

### forEach

▸ **forEach**(`f`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `number`, `row`: `number`, `col`: `number`) => `boolean` \| `void` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:109](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L109)

___

### forEachInCol

▸ **forEachInCol**(`col`, `f`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `number` |
| `f` | (`value`: `number`, `row`: `number`) => `boolean` \| `void` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:129](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L129)

___

### forEachInDiagonal

▸ **forEachInDiagonal**(`f`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `number`, `row`: `number`, `col`: `number`) => `boolean` \| `void` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:138](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L138)

___

### forEachInRow

▸ **forEachInRow**(`row`, `f`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `f` | (`value`: `number`, `col`: `number`) => `boolean` \| `void` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:120](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L120)

___

### get

▸ **get**(`row`, `col`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `col` | `number` |

#### Returns

`number`

#### Defined in

[lib/Matrix.ts:83](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L83)

___

### getImmutable

▸ **getImmutable**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:56](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L56)

___

### has

▸ **has**(`row`, `col`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `col` | `number` |

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:87](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L87)

___

### hasDimensions

▸ **hasDimensions**(`rows`, `cols`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `number` |
| `cols` | `number` |

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:315](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L315)

___

### isSameInstanceAs

▸ **isSameInstanceAs**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md) |

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:52](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L52)

___

### isScalarMatrix

▸ **isScalarMatrix**(): `boolean`

Returns whether the matrix is a square matrix that has identical values on its diagonal.

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:326](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L326)

___

### isSquareMatrix

▸ **isSquareMatrix**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:319](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L319)

___

### isZeroMatrix

▸ **isZeroMatrix**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:337](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L337)

___

### map

▸ **map**(`f`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `number`, `row`: `number`, `col`: `number`) => `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:147](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L147)

___

### mapCol

▸ **mapCol**(`col`, `f`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `number` |
| `f` | (`value`: `number`, `row`: `number`) => `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:177](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L177)

___

### mapRow

▸ **mapRow**(`row`, `f`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `f` | (`value`: `number`, `col`: `number`) => `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:169](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L169)

___

### multiplyBy

▸ **multiplyBy**(`n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:223](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L223)

___

### multiplyColBy

▸ **multiplyColBy**(`col`, `n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `number` |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:263](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L263)

___

### multiplyRowBy

▸ **multiplyRowBy**(`row`, `n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:243](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L243)

___

### set

▸ **set**(`row`, `col`, `value`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `col` | `number` |
| `value` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:77](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L77)

___

### setImmutable

▸ **setImmutable**(`immutable`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `immutable` | `boolean` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:60](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L60)

___

### some

▸ **some**(`f`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `number`, `row`: `number`, `col`: `number`) => `boolean` |

#### Returns

`boolean`

#### Defined in

[lib/Matrix.ts:293](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L293)

___

### subtractBy

▸ **subtractBy**(`n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:218](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L218)

___

### subtractColBy

▸ **subtractColBy**(`col`, `n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `number` |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:258](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L258)

___

### subtractRowBy

▸ **subtractRowBy**(`row`, `n`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `number` |
| `n` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:238](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L238)

___

### swapCols

▸ **swapCols**(`col1`, `col2`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col1` | `number` |
| `col2` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:282](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L282)

___

### swapRows

▸ **swapRows**(`row1`, `row2`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `row1` | `number` |
| `row2` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:273](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L273)

___

### toArray

▸ **toArray**(): `number`[][]

#### Returns

`number`[][]

#### Defined in

[lib/Matrix.ts:91](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L91)

___

### values

▸ **values**(): `Generator`<`number`, `any`, `unknown`\>

#### Returns

`Generator`<`number`, `any`, `unknown`\>

#### Defined in

[lib/Matrix.ts:165](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L165)

___

### fromArray

▸ `Static` **fromArray**(`array`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `number`[][] |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:5](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L5)

___

### fromIterable

▸ `Static` **fromIterable**(`iterable`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterable` | `Iterable`<`Iterable`<`number`\>\> |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:19](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L19)

___

### identity

▸ `Static` **identity**(`size`): [`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

[`Matrix`](https://github.com/bemoje/tsmono/blob/main/docs/md/matrix/classes/Matrix.md)

#### Defined in

[lib/Matrix.ts:27](https://github.com/bemoje/tsmono/blob/87185a0/pkg/matrix/src/lib/Matrix.ts#L27)
