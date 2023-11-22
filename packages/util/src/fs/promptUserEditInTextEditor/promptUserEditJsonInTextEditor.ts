import { JsonValue } from '../../types/json'
import { promptUserEditInTextEditor, promptUserEditInTextEditorSync } from './promptUserEditInTextEditor'

/**
 * Edit a JSON-stringify-compatible value in the user's editor and return the (JSON.parse'd) result.
 *
 * @param value - The value to edit (NOT a json string). Defaults to an empty object.
 * @param editor - Launch command to start your editor. Defaults to VSCode: 'code -w' (if installed).
 * - Otherwise this logic: isWindows() ? 'notepad' : isOSX() ? 'open vi' : 'xdg-open'
 *
 * @example ```ts
 * promptUserEditJsonInTextEditor([1, 2]).then(console.log)
 * ```
 */
export async function promptUserEditJsonInTextEditor<T extends JsonValue = JsonValue, R extends T = T>(
  value: T = {} as T,
  editor?: string
): Promise<R> {
  const json = await promptUserEditInTextEditor({
    editor,
    content: JSON.stringify(value, null, 2),
    extension: '.json',
  })
  return JSON.parse(json) as R
}

/**
 * Edit a JSON-stringify-compatible value in the user's editor and return the (JSON.parse'd) result.
 *
 * @param value - The value to edit (NOT a json string). Defaults to an empty object.
 * @param editor - Launch command to start your editor. Defaults to VSCode: 'code -w' (if installed).
 * - Otherwise this logic: isWindows() ? 'notepad' : isOSX() ? 'open vi' : 'xdg-open'
 *
 * @example ```ts
 * promptUserEditJsonInTextEditorSync([1, 2])
 * ```
 */
export function promptUserEditJsonInTextEditorSync<T extends JsonValue = JsonValue, R extends T = T>(
  value: T = {} as T,
  editor?: string
): R {
  const json = promptUserEditInTextEditorSync({
    editor,
    content: JSON.stringify(value, null, 2),
    extension: '.json',
  })
  return JSON.parse(json) as R
}
