import fs from 'fs'
import path from 'path'
import { readJsonFileSync } from './readJsonFileSync'

export function readPackageJson(projectRoot = process.cwd()): Record<string, any> | undefined {
  const filepath = path.join(projectRoot, 'package.json')
  if (!fs.existsSync(filepath)) return
  return readJsonFileSync(filepath)
}
