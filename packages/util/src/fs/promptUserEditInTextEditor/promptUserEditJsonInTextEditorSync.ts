import { JsonValue } from '@bemoje/util'
import { promptUserEditInTextEditorSync } from './promptUserEditInTextEditorSync'

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
