import fs from 'fs'
import path from 'path'
import { getHomeDirectory } from './getHomeDirectory'

export function getDownloadsDirectory(): string {
  const result = path.join(getHomeDirectory(), 'Downloads')
  if (!fs.existsSync(result)) throw new Error('Downloads directory does not exist')
  return result
}
