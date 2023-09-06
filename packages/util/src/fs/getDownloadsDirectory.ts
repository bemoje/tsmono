import path from 'path'
import { getHomeDirectory } from './getHomeDirectory'

export function getDownloadsDirectory() {
  return path.join(getHomeDirectory(), 'Downloads')
}
