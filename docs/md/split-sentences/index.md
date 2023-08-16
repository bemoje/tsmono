@bemoje/split-sentences

# @bemoje/split-sentences

## Table of contents

### Functions

- [splitSentences](https://github.com/bemoje/tsmono/blob/main/docs/md/split-sentences/index.md#splitsentences)

## Functions

### splitSentences

▸ **splitSentences**(`text`): `string`[]

Intelligently split a string into sentences.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | Text to split into sentences. |

#### Returns

`string`[]

**`Throws`**

Will throw an error if the input is not a string.

**`Example`**

```ts
splitSentences('Hello world. How are you?');
//=> ['Hello world.', 'How are you?']
```

#### Defined in

[lib/splitSentences.ts:12](https://github.com/bemoje/tsmono/blob/87185a0/pkg/split-sentences/src/lib/splitSentences.ts#L12)
