import fs from 'fs-extra'
import { failValidation } from '../failValidation'

export function validateDirpath(name: string, value: string): void {
  if (!fs.existsSync(value)) failValidation(name, 'does not exist', value)
  if (!fs.statSync(value).isDirectory()) failValidation(name, 'is not a directory', value)
}
