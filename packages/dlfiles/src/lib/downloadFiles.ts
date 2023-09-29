import { funAsyncRateLimit, getDownloadsDirectory, normalizeFileExtension } from '@bemoje/util'
import fs from 'fs-extra'
import path from 'path'
import { downloadFile } from './downloadFile'
import { IDownloadFilesOptions } from './types/IDownloadFilesOptions'
import { IDownloadFilesResult } from './types/IDownloadFilesResult'

/**
 * Download files.
 * @param options - @see IDownloadFilesOptions
 * @returns @see IDownloadFilesResult
 *
 * @example ```ts
 * const result = await downloadFiles({
 *   outdir: path.join('./downloaded'),
 *   concurrency: 15,
 *   timeout: 1000 * 60 * 2,
 *   files: [
 *     { url: 'https://www.7-zip.org/7ziplogo.png' },
 *     { url: 'https://www.7-zip.org/a/7z2301-x64.exe' },
 *     //...
 *   ]
 * })
 * ```
 */
export async function downloadFiles(options: IDownloadFilesOptions): Promise<IDownloadFilesResult> {
  const { wipe, defaultExt, concurrency, timeout, emitter } = options
  const outdir = path.resolve(options.outdir || path.join(getDownloadsDirectory(), Date.now().toString()))
  const result: IDownloadFilesResult = { outdir, downloaded: [], failed: [] }

  try {
    if (wipe && options.outdir) {
      await fs.emptyDir(outdir)
    } else {
      await fs.ensureDir(outdir)
    }

    const [queue, queueFileDownload] = funAsyncRateLimit(downloadFile, {
      concurrency: concurrency || 15,
      autoStart: true,
      throwOnTimeout: false,
      timeout: timeout ?? 1000 * 60 * 5,
    })
    if (emitter) emitter.emit('queue', queue)

    const padding = options.files.length.toString().length
    options.files.forEach((file, i) => {
      const url = file.url
      const urlNoParams = url.replace(new URL(url).search, '')
      const parsed = path.parse(urlNoParams)
      const prefix = String(i).padStart(padding, '0')
      const filename = prefix + (parsed.name ? '_' + parsed.name : '')
      const ext = normalizeFileExtension(file.ext || defaultExt || parsed.ext || '.unknown')
      const basename = filename + ext
      const filepath = path.join(outdir, basename)
      const data = { url, filepath }
      if (emitter) emitter.emit('start', data)

      queueFileDownload(data).then((error?: Error) => {
        if (error) {
          const errdata = { url, error: (error as Error).message }
          if (emitter) emitter.emit('fail', errdata)
          result.failed.push(errdata)
        } else {
          if (emitter) emitter.emit('download', data)
          result.downloaded.push(data)
        }
      })
    })

    await queue.onIdle()
    //
  } catch (error) {
    if (emitter) emitter.emit('error', error)
    else throw error
  }

  if (emitter) emitter.emit('done', result)
  return result
}
