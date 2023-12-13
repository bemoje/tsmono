import { PromptObject } from 'prompts'
import { ISearchPromptMetaData } from './ISearchPromptMetaData'

export const PROMPT_META_DATA = new WeakMap<PromptObject, ISearchPromptMetaData>()
