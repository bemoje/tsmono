import { ISearchPromptResult } from '../../searchPrompt/core/ISearchPromptResult'

export interface ICommandSearchPromptResult extends ISearchPromptResult {
  args: string
}
