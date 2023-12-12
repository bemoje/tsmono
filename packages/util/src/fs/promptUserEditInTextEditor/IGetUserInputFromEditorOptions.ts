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
