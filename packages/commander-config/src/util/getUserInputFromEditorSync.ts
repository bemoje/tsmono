import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { IGetUserInputFromEditorOptions } from './IGetUserInputFromEditorOptions'

export function getUserInputFromEditorSync(options: IGetUserInputFromEditorOptions): string {
  const { appdataDirectory, editor, currentContent } = options
  const tempdir = path.join(appdataDirectory, 'temp')
  fs.mkdirSync(tempdir, { recursive: true })
  const tempfile = path.join(tempdir, Date.now() + (options.extension || '.txt'))
  fs.writeFileSync(tempfile, currentContent, 'utf8')
  execSync(`${editor} ${tempfile}`, { stdio: 'inherit' })
  const userInput = fs.readFileSync(tempfile, 'utf8')
  fs.rmSync(tempfile)
  return userInput
}
