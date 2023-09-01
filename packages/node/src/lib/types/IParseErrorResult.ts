import { IParseErrorFrame } from './IParseErrorFrame'

export interface IParseErrorResult {
  message: string
  stack: IParseErrorFrame[]
  cause?: unknown
}
