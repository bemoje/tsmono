import { deleteDirectorySafe, wait } from '@bemoje/node-util'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { IGetUserInputFromEditorOptions } from './IGetUserInputFromEditorOptions'

export async function getUserInputFromEditor(options: IGetUserInputFromEditorOptions): Promise<string> {
  const { appdataDirectory, editor, currentContent } = options
  const tempdir = path.join(appdataDirectory, 'temp')
  await fs.promises.mkdir(tempdir, { recursive: true })
  const tempfile = path.join(tempdir, Date.now() + '.txt')
  await fs.promises.writeFile(tempfile, currentContent, 'utf8')
  execSync(`${editor} ${tempfile}`)
  await wait(200)
  const userInput = await fs.promises.readFile(tempfile, 'utf8')
  await deleteDirectorySafe(tempdir)
  return userInput
}
