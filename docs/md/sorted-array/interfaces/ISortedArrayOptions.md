[@bemoje/sorted-array](https://github.com/bemoje/tsmono/blob/main/docs/md/sorted-array/index.md) / ISortedArrayOptions

# Interface: ISortedArrayOptions<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [allowDuplicates](https://github.com/bemoje/tsmono/blob/main/docs/md/sorted-array/interfaces/ISortedArrayOptions.md#allowduplicates)
- [compare](https://github.com/bemoje/tsmono/blob/main/docs/md/sorted-array/interfaces/ISortedArrayOptions.md#compare)
- [data](https://github.com/bemoje/tsmono/blob/main/docs/md/sorted-array/interfaces/ISortedArrayOptions.md#data)

## Properties

### allowDuplicates

• `Optional` **allowDuplicates**: `boolean`

#### Defined in

[pkg/sorted-array/src/lib/ISortedArrayOptions.ts:4](https://github.com/bemoje/tsmono/blob/87185a0/pkg/sorted-array/src/lib/ISortedArrayOptions.ts#L4)

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

[pkg/sorted-array/src/lib/ISortedArrayOptions.ts:2](https://github.com/bemoje/tsmono/blob/87185a0/pkg/sorted-array/src/lib/ISortedArrayOptions.ts#L2)

___

### data

• `Optional` **data**: `Iterable`<`T`\>

#### Defined in

[pkg/sorted-array/src/lib/ISortedArrayOptions.ts:3](https://github.com/bemoje/tsmono/blob/87185a0/pkg/sorted-array/src/lib/ISortedArrayOptions.ts#L3)
