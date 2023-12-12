import util from 'util'
import { defaultOpenInEditorCommand } from '../../os/defaultOpenInEditorCommand'
import { exec } from 'child_process'
import { IGetUserInputFromEditorOptions } from './IGetUserInputFromEditorOptions'
import { readFile } from '../readFile/readFile'
import { strEnsureStartsWith } from '../../string/strEnsureStartsWith'
import { tempFile } from '../tempFile/tempFile'
import { writeFile } from '../writeFile/writeFile'

/**
 * Prompts the user to edit a string in the user's text editor.
 *
 * @example ```ts
 * promptUserEditInTextEditor({ editor: 'notepad' }).then(console.log)
 * ```
 */
export async function promptUserEditInTextEditor(options?: IGetUserInputFromEditorOptions): Promise<string> {
  const { editor, content, extension } = applyDefaults(options)
  return await tempFile(extension, async (tempfile) => {
    await writeFile(tempfile, content)
    await util.promisify(exec)(`${editor} ${tempfile}`)
    return await readFile(tempfile)
  })
}

function applyDefaults(options: IGetUserInputFromEditorOptions = {}) {
  const content = options.content ?? ''
  const extension = strEnsureStartsWith(options.extension ?? '.txt', '.')
  const editor = options.editor ?? defaultOpenInEditorCommand()
  return { content, extension, editor }
}
