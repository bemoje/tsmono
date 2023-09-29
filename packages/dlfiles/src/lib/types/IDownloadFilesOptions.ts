import type { IFunAsyncRateLimitOptions } from '@bemoje/util'
import EventEmitter from 'events'
export type { IFunAsyncRateLimitOptions }

/**
 * Options for @see downloadFiles
 */
export interface IDownloadFilesOptions {
  /**
   * The URLs and file-extensions of the files to download.
   */
  files: Array<{ url: string; ext?: string }>

  /**
   * The output directory to download files to.
   * Defaults to the user's OS 'Downloads' directory.
   */
  outdir?: string

  /**
   * Whether to wipe the output directory before downloading.
   * This option is ignored if outdir is not specified.
   */
  wipe?: boolean

  /**
   * Default file extension to use if none is specified in the file object.
   * If none is specified here either, the extension will be inferred from the url, if possible.
   * If not possible, the extension will be '.unknown'.
   */
  defaultExt?: string

  /**
   * Whether to prefix the downloaded files with a zero-padded index.
   * If the filename cannot be derived from the URO, the filename will be a timestamp integer.
   */
  noPrefix?: boolean

  /**
   * Optionally pass an EventEmitter to receive events:
   * - queue(PromiseQueue)
   * - start({ url, filepath })
   * - download({ url, filepath })
   * - fail({ url, error })
   * - done({ downloaded, failed })
   * - error(error)
   *
   * If emitter is passed, errors (not failed downlaods) are emitted instead of thrown.
   */
  emitter?: EventEmitter

  /**
   * Options for the internal PromiseQueue.
   */
  queue?: Omit<IFunAsyncRateLimitOptions, 'autoStart' | 'throwOnTimeout'>
}
