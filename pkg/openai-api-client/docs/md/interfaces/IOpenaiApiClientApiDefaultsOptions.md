[@bemoje/openai-api-client](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/index.md) / IOpenaiApiClientApiDefaultsOptions

# Interface: IOpenaiApiClientApiDefaultsOptions

## Table of contents

### Properties

- [chat3\_16Model](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientApiDefaultsOptions.md#chat3_16model)
- [chat3\_8Model](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientApiDefaultsOptions.md#chat3_8model)
- [chat4\_8Model](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientApiDefaultsOptions.md#chat4_8model)
- [choicesDelimiter](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientApiDefaultsOptions.md#choicesdelimiter)
- [completionModel](https://github.com/bemoje/tsmono/blob/main/pkg/openai-api-client/docs/md/interfaces/IOpenaiApiClientApiDefaultsOptions.md#completionmodel)

## Properties

### chat3\_16Model

• `Optional` **chat3\_16Model**: `string`

Default model to use for chat gpt3 16k tokens completion requests

#### Defined in

[pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts:15](https://github.com/bemoje/tsmono/blob/5043a85/pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts#L15)

___

### chat3\_8Model

• `Optional` **chat3\_8Model**: `string`

Default model to use for chat gpt3 8k tokens completion requests

#### Defined in

[pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts:10](https://github.com/bemoje/tsmono/blob/5043a85/pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts#L10)

___

### chat4\_8Model

• `Optional` **chat4\_8Model**: `string`

Default model to use for chat gpt4 8k tokens completion requests

#### Defined in

[pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts:20](https://github.com/bemoje/tsmono/blob/5043a85/pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts#L20)

___

### choicesDelimiter

• `Optional` **choicesDelimiter**: `string`

If openai api returns more than one choice, this string will be used to delimit them.

#### Defined in

[pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts:25](https://github.com/bemoje/tsmono/blob/5043a85/pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts#L25)

___

### completionModel

• `Optional` **completionModel**: `string`

Default model to use for completion requests

#### Defined in

[pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts:5](https://github.com/bemoje/tsmono/blob/5043a85/pkg/openai-api-client/src/lib/types/IOpenaiApiClientApiDefaultsOptions.ts#L5)