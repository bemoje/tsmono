import { isOSX, isVsCodeInstalled, isWindows } from '@bemoje/util'

/**
 * Get the default command to open a file in in a text editor.
 * If VSCode is installed, this is used. Otherwise, the default text editor of the OS is used.
 */
export function defaultOpenInEditorCommand() {
  return COMMAND
}

const COMMAND = isVsCodeInstalled() ? 'code -w' : isWindows() ? 'notepad' : isOSX() ? 'open vi' : 'xdg-open'
