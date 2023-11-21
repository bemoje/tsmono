import fs from 'fs-extra'
import path from 'path'
import { exec, execSync } from 'child_process'
import {
  getTempDataPath,
  JsonArrayOrObject,
  JsonRawPrimitive,
  JsonValue,
  strEnsureStartsWith,
  tempFileSync,
} from '@bemoje/util'
import { IGetUserInputFromEditorOptions } from './IGetUserInputFromEditorOptions'
import { removeFile, wait } from '@bemoje/util'

function applyDefaults(options: IGetUserInputFromEditorOptions) {
  const content = options.content || ''
  const extension = strEnsureStartsWith(options.extension || '.txt', '.')
  const editor = options.editor || 'code -w'
  return { content, extension, editor }
}

export function getUserInputFromEditorSync(options: IGetUserInputFromEditorOptions): string {
  const { editor, content, extension } = applyDefaults(options)
  const userInput = tempFileSync(extension, (tempfile) => {
    // const tempdir = getTempDataPath('temp-file-edit')
    // fs.mkdirSync(tempdir, { recursive: true })
    // const tempfile = path.join(tempdir, Date.now() + extension)
    fs.writeFileSync(tempfile, content, 'utf8')
    execSync(`${editor} ${tempfile}`, { stdio: 'inherit' })
    return fs.readFileSync(tempfile, 'utf8')
  })
  // fs.rmSync(tempfile)
  return userInput
}

export async function getUserInputFromEditor(options: IGetUserInputFromEditorOptions): Promise<string> {
  const { editor, content, extension } = applyDefaults(options)
  const tempdir = getTempDataPath('temp-file-edit')
  await fs.mkdir(tempdir, { recursive: true })
  const tempfile = path.join(tempdir, Date.now() + extension)
  await fs.writeFile(tempfile, content, 'utf8')
  await exec(`${editor} ${tempfile}`)
  const userInput = await fs.readFile(tempfile, 'utf8')
  await removeFile(tempdir)
  return userInput
}

/**
 * Edit an object or array in the user's editor and return the result.
 * @param value - The value to edit.
 * @param editor - The launch command for the editor to use. Defaults to 'code -w'.
 */
export function editAsJsonInEditorSync<T extends JsonArrayOrObject = JsonArrayOrObject, R extends T = T>(
  value: T,
  editor = 'code -w'
): R {
  const json = JSON.stringify(value, null, 2)
  const userInput = getUserInputFromEditorSync({
    editor,
    content: json,
    extension: '.json',
  })
  return JSON.parse(userInput) as R
}

console.log(editAsJsonInEditorSync({ a: 1, b: 2 }))

// getUserInputFromEditor({})
