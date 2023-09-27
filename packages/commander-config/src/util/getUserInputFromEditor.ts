import { removeFile, wait } from '@bemoje/util'
import { execSync } from 'child_process'
import fsp from 'fs-extra'
import path from 'path'
import { IGetUserInputFromEditorOptions } from './IGetUserInputFromEditorOptions'

export async function getUserInputFromEditor(options: IGetUserInputFromEditorOptions): Promise<string> {
  const { appdataDirectory, editor, currentContent, extension } = options
  const tempdir = path.join(appdataDirectory, 'temp')
  await fsp.mkdir(tempdir, { recursive: true })
  const tempfile = path.join(tempdir, Date.now() + (extension || '.txt'))
  await fsp.writeFile(tempfile, currentContent, 'utf8')
  execSync(`${editor} ${tempfile}`, { stdio: 'inherit' })
  await wait(100)
  const userInput = await fsp.readFile(tempfile, 'utf8')
  await removeFile(tempdir)
  return userInput
}
