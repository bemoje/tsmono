import { defaultOpenInEditorCommand } from '../../os/defaultOpenInEditorCommand'
import { execSync } from 'child_process'
import { IGetUserInputFromEditorOptions } from './IGetUserInputFromEditorOptions'
import { readFileSync } from '../readFile/readFileSync'
import { strEnsureStartsWith } from '../../string/strEnsureStartsWith'
import { tempFileSync } from '../tempFile/tempFileSync'
import { writeFileSync } from '../writeFile/writeFileSync'

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
