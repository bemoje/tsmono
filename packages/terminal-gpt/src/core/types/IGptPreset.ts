export interface IGptPreset {
  description: string
  systemMessage: string[]
  temperature?: number
  markdownOutput?: boolean
  terminalOutput?: boolean
  openResponseIn?: string
  maxExpectedResponseTokens?: number
  improveResponse?: string
}
