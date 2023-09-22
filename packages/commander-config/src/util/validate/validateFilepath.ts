import fs from 'fs'
import { failValidation } from '../failValidation'

export function validateFilepath(name: string, value: string): void {
  if (!fs.existsSync(value)) failValidation(name, 'does not exist', value)
  if (!fs.statSync(value).isFile()) failValidation(name, 'is not a file', value)
}
