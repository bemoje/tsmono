[@bemoje/sorted-array](https://github.com/bemoje/tsmono/blob/main/pkg/sorted-array/docs/md/index.md) / ISortedArrayOptions

# Interface: ISortedArrayOptions<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [allowDuplicates](https://github.com/bemoje/tsmono/blob/main/pkg/sorted-array/docs/md/interfaces/ISortedArrayOptions.md#allowduplicates)
- [compare](https://github.com/bemoje/tsmono/blob/main/pkg/sorted-array/docs/md/interfaces/ISortedArrayOptions.md#compare)
- [data](https://github.com/bemoje/tsmono/blob/main/pkg/sorted-array/docs/md/interfaces/ISortedArrayOptions.md#data)

## Properties

### allowDuplicates

• `Optional` **allowDuplicates**: `boolean`

#### Defined in

pkg/sorted-array/src/lib/ISortedArrayOptions.ts:4

___

### compare

• `Optional` **compare**: (`a`: `any`, `b`: `any`) => `number`

#### Type declaration

▸ (`a`, `b`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

##### Returns

`number`

#### Defined in

pkg/sorted-array/src/lib/ISortedArrayOptions.ts:2

___

### data

• `Optional` **data**: `Iterable`<`T`\>

#### Defined in

pkg/sorted-array/src/lib/ISortedArrayOptions.ts:3
