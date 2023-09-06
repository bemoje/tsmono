export interface IGptPreset {
  description: string
  systemMessage: string[]
  preferGpt4?: boolean
  temperature?: number
  markdownOutput?: boolean
  terminalOutput?: boolean
  openResponseIn?: string
  maxExpectedResponseTokens?: number
  inputTokensResponseTokensScalar?: number
  improveResponse?: string
  model?: string
}
