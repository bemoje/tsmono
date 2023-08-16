# @bemoje/split-sentences
Split a text string into sentences.

![GitHub Top Language](https://img.shields.io/github/languages/top/bemoje/https://github.com/bemoje/tsmono)

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/bemoje/https://github.com/bemoje/tsmono?color=red)
![GitHub Stars](https://img.shields.io/github/stars/bemoje/https://github.com/bemoje/tsmono)
![GitHub Forks](https://img.shields.io/github/forks/bemoje/https://github.com/bemoje/tsmono)
![GitHub Watchers](https://img.shields.io/github/watchers/bemoje/https://github.com/bemoje/tsmono)
![GitHub Repo Size](https://img.shields.io/github/repo-size/bemoje/https://github.com/bemoje/tsmono)

##### NPM
<span><a href="https://npmjs.org/@bemoje/split-sentences" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/split-sentences" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/@bemoje/split-sentences" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/@bemoje/split-sentences" alt="NPM Downloads" /></a></span>


##### Donate
<span><a href="https://www.patreon.com/user?u=40752770" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
```sh
npm install @bemoje/split-sentences
```


## Issues
Please let me know of any bugs or [issues](https://github.com/bemoje/https://github.com/bemoje/tsmono/issues).

## Contribute
Contributors are welcome to open a [pull request](https://github.com/bemoje/https://github.com/bemoje/tsmono/pulls).

## License
Released under the [MIT License](./LICENSE).

## Documentation
- [HTML](https://github.com/bemoje/tsmono/blob/main/docs/html/index.html)
- [Markdown](https://github.com/bemoje/tsmono/blob/main/docs/md/split-sentences/index.md)

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
