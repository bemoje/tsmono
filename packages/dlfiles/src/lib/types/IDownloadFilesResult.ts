/**
 * Return value for @see downloadFiles
 */
export interface IDownloadFilesResult {
  /**
   * The output directory that contains the downloaded files.
   */
  outdir: string

  /**
   * URLs and filepaths of successfully downloaded files.
   */
  downloaded: Array<{ url: string; filepath: string }>

  /**
   * URLs and error messages of failed downloads.
   */
  failed: Array<{ url: string; error: string }>
}
