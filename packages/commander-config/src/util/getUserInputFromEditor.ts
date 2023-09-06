import { deleteDirectorySafe, wait } from '@bemoje/util'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { IGetUserInputFromEditorOptions } from './IGetUserInputFromEditorOptions'

export async function getUserInputFromEditor(options: IGetUserInputFromEditorOptions): Promise<string> {
  const { appdataDirectory, editor, currentContent, extension } = options
  const tempdir = path.join(appdataDirectory, 'temp')
  await fs.promises.mkdir(tempdir, { recursive: true })
  const tempfile = path.join(tempdir, Date.now() + (extension || '.txt'))
  await fs.promises.writeFile(tempfile, currentContent, 'utf8')
  execSync(`${editor} ${tempfile}`, { stdio: 'inherit' })
  await wait(100)
  const userInput = await fs.promises.readFile(tempfile, 'utf8')
  await deleteDirectorySafe(tempdir)
  return userInput
}
