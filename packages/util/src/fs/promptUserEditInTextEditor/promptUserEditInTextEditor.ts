import util from 'util'
import { defaultOpenInEditorCommand } from '../../os/defaultOpenInEditorCommand'
import { exec, execSync } from 'child_process'
import { readFile } from '../readFile/readFile'
import { readFileSync } from '../readFile/readFileSync'
import { strEnsureStartsWith } from '../../string/strEnsureStartsWith'
import { tempFile } from '../tempFile/tempFile'
import { tempFileSync } from '../tempFile/tempFileSync'
import { writeFile } from '../writeFile/writeFile'
import { writeFileSync } from '../writeFile/writeFileSync'

export interface IGetUserInputFromEditorOptions {
  /**
   * The content to put in the temp file so that the user can edit it. Defaults to an empty file.
   */
  content?: string
  /**
   * Launch command to start your editor. Defaults to VSCode: 'code -w' (if installed).
   * Otherwise this logic: isWindows() ? 'notepad' : isOSX() ? 'open vi' : 'xdg-open'
   */
  editor?: string
  /**
   * The file extension to use for the temporary file. Defaults to '.txt'.
   */
  extension?: string
}

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

/**
 * Prompts the user to edit a string in the user's text editor.
 *
 * @example ```ts
 * promptUserEditInTextEditor({ editor: 'notepad' })
 * ```
 */
export function promptUserEditInTextEditorSync(options?: IGetUserInputFromEditorOptions): string {
  const { editor, content, extension } = applyDefaults(options)
  return tempFileSync(extension, (tempfile) => {
    writeFileSync(tempfile, content)
    execSync(`${editor} ${tempfile}`, { stdio: 'inherit' })
    return readFileSync(tempfile)
  })
}

function applyDefaults(options: IGetUserInputFromEditorOptions = {}) {
  const content = options.content ?? ''
  const extension = strEnsureStartsWith(options.extension ?? '.txt', '.')
  const editor = options.editor ?? defaultOpenInEditorCommand()
  return { content, extension, editor }
}
