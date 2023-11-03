import { Argument } from 'commander'
import { PromptType } from 'prompts'
import { BCommand } from './BCommand'
import { ValidatorFunction, ValidInputPrimitiveTypes } from './ValidInputPrimitiveTypes'

export class BArgument<T extends ValidInputPrimitiveTypes = string> extends Argument {
  /**
   *
   */
  readonly validators: ValidatorFunction<T>[] = []
  promptType: PromptType = 'text'

  /**
   *
   */
  constructor(name: string, description?: string) {
    super(name as any, description)
  }

  getPromptType(): PromptType {
    return this.promptType || 'text'
  }
  setPromptType(value: PromptType): this {
    this.promptType = value
    return this
  }

  #parent?: BCommand
  setParentCommand(cmd: BCommand): this {
    this.#parent = cmd
    return this
  }
  getParentCommand(): BCommand {
    const p = this.#parent
    if (!p) throw new Error('parent command is undefined')
    return p
  }
  setVariadic(value: boolean): this {
    this.variadic = value
    return this
  }

  /**
   *
   */
  addValidator(fn: ValidatorFunction<T>): this {
    this.validators.push(fn)
    return this
  }

  /**
   *
   */
  determinePromptType() {
    let type: PromptType = 'text'
    if (this.choices && this.choices.length) {
      if (this.variadic) {
        type = 'autocompleteMultiselect'
      } else {
        type = 'autocomplete'
      }
    } else {
      if (this.variadic) {
        type = 'list'
      }
    }
  }
}
