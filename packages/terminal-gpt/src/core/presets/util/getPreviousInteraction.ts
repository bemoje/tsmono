import { readJsonFileSync } from '@bemoje/fs'
import fs from 'fs'
import path from 'path'
import { IGptInteraction } from '../../types/IGptInteraction'

/**
 * Gets the previous user/gpt interaction from the user data directory.
 * @param jsondir - The json directory.
 */
export function getPreviousInteraction(jsondir: string): IGptInteraction | void {
  const prevFname = fs.readdirSync(jsondir).sort().pop()
  if (!prevFname) return undefined
  const prevFile = path.join(jsondir, prevFname)
  if (!fs.existsSync(prevFile)) return undefined
  return readJsonFileSync(prevFile) as IGptInteraction
}
