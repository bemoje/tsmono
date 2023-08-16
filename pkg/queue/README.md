# @bemoje/queue
Queue-based data structures.

![GitHub Top Language](https://img.shields.io/github/languages/top/bemoje/https://github.com/bemoje/tsmono)

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/bemoje/https://github.com/bemoje/tsmono?color=red)
![GitHub Stars](https://img.shields.io/github/stars/bemoje/https://github.com/bemoje/tsmono)
![GitHub Forks](https://img.shields.io/github/forks/bemoje/https://github.com/bemoje/tsmono)
![GitHub Watchers](https://img.shields.io/github/watchers/bemoje/https://github.com/bemoje/tsmono)
![GitHub Repo Size](https://img.shields.io/github/repo-size/bemoje/https://github.com/bemoje/tsmono)

##### NPM
<span><a href="https://npmjs.org/@bemoje/queue" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/queue" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/@bemoje/queue" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/@bemoje/queue" alt="NPM Downloads" /></a></span>


##### Donate
<span><a href="https://www.patreon.com/user?u=40752770" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
```sh
npm install @bemoje/queue
```


## Issues
Please let me know of any bugs or [issues](https://github.com/bemoje/https://github.com/bemoje/tsmono/issues).

## Contribute
Contributors are welcome to open a [pull request](https://github.com/bemoje/https://github.com/bemoje/tsmono/pulls).

## License
Released under the [MIT License](./LICENSE).

## Documentation
- [HTML](https://github.com/bemoje/tsmono/blob/main/docs/html/index.html)
- [Markdown](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/index.md)

### Classes

- [PriorityQueue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/classes/PriorityQueue.md)
- [PromiseQueue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/classes/PromiseQueue.md)
- [Queue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/classes/Queue.md)

### Interfaces

- [IPriorityQueueOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IPriorityQueueOptions.md)
- [IPromiseQueueOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IPromiseQueueOptions.md)
- [IQueue](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueue.md)
- [IQueueAddOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/IQueueAddOptions.md)
- [ITaskOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md)
- [ITimeoutOptions](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITimeoutOptions.md)

### Type Aliases

- [PromiseQueueEvent](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/index.md#promisequeueevent)
- [PromiseQueueTask](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/index.md#promisequeuetask)

## Type Aliases

### PromiseQueueEvent

Ƭ **PromiseQueueEvent**: ``"active"`` \| ``"idle"`` \| ``"empty"`` \| ``"add"`` \| ``"next"`` \| ``"completed"`` \| ``"error"``

#### Defined in

[pkg/queue/src/lib/types/PromiseQueueEvent.ts:1](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/PromiseQueueEvent.ts#L1)

___

### PromiseQueueTask

Ƭ **PromiseQueueTask**<`TaskResultType`\>: (`options`: [`ITaskOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md)) => `PromiseLike`<`TaskResultType`\> \| (`options`: [`ITaskOptions`](https://github.com/bemoje/tsmono/blob/main/docs/md/queue/interfaces/ITaskOptions.md)) => `TaskResultType`

#### Type parameters

| Name |
| :------ |
| `TaskResultType` |

#### Defined in

[pkg/queue/src/lib/types/PromiseQueueTask.ts:3](https://github.com/bemoje/tsmono/blob/87185a0/pkg/queue/src/lib/types/PromiseQueueTask.ts#L3)
