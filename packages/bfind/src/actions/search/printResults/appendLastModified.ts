import { colors } from '@bemoje/util'
import fs from 'fs-extra'

export function appendLastModified(stat: fs.Stats, filepath: string): string {
  const sinceModified = (Date.now() - stat.mtimeMs) / 1000 / 60 / 60 / 24
  if (stat.isDirectory()) {
    return colors.cyan(filepath) + colors.dim(` (${Math.floor(sinceModified)} days)`)
  } else {
    return filepath + colors.dim(` (${Math.floor(sinceModified)} days)`)
  }
}
