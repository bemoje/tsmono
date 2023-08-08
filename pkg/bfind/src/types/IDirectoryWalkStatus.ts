import { MemoryUsageResult } from '@bemoje/node-util'

export interface IDirectoryWalkStatus {
  currentDirectory?: Array<string>
  filesIndexed?: string
  keywords?: string
  indexedFileRefs?: string
  keywordsNormalized?: string
  memory?: MemoryUsageResult
}
