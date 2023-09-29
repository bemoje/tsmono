import { funAsyncRateLimit, getDownloadsDirectory, normalizeFileExtension } from '@bemoje/util'
import fs from 'fs-extra'
import path from 'path'
import URL from 'url'
import { downloadFile } from './downloadFile'
import { IDownloadFilesOptions } from './types/IDownloadFilesOptions'
import { IDownloadFilesResult } from './types/IDownloadFilesResult'

/**
 * Download files.
 * @param options - @see IDownloadFilesOptions
 * @returns @see IDownloadFilesResult
 *
 * @example ```ts
 * // wait for all to complete
 * downloadFiles({
 *   files: new Array(241).fill(0).map((_, i) => {
 *     const page = (i + 1).toString().padStart(3, '0')
 *     const url = `http://static.vg.no/uploaded/vgdesk/bilder/2012/breivik_rapporter/img/big/sakkyndig${page}.jpg`
 *     return { url }
 *   }),
 *   queue: {
 *     concurrency: 50,
 *     timeout: 1000 * 15,
 *   },
 * })
 *   .then(console.log)
 *   .catch(console.error)
 *
 * // using event emitter
 * downloadFiles({
 *   emitter: new EventEmitter()
 *     .on('queue', (queue) => console.log({ queue }))
 *     .on('start', (start) => console.log({ start }))
 *     .on('download', (download) => console.log({ download }))
 *     .on('fail', (fail) => console.log({ fail }))
 *     .on('done', (done) => console.log({ done }))
 *     .on('error', (error) => console.log({ error })),
 *   files: [
 *     { url: 'https://www.7-zip.org/7ziplogo.png' },
 *     { url: 'https://www.7-zip.org/a/7z2301-x64.exe' },
 *     { url: 'https://www.this.fails/to-download.png' },
 *   ],
 * })
 * ```
 */
export async function downloadFiles(options: IDownloadFilesOptions): Promise<IDownloadFilesResult> {
  const { wipe, defaultExt, emitter, queue } = options
  const outdir = path.resolve(options.outdir || path.join(getDownloadsDirectory(), String(Date.now())))
  const result: IDownloadFilesResult = { outdir, downloaded: [], failed: [] }
  const emit = (event: string, data: unknown) => emitter && emitter.emit(event, data)
  try {
    if (wipe && options.outdir) {
      await fs.emptyDir(outdir)
    } else {
      await fs.ensureDir(outdir)
    }

    const [q, enqueue] = funAsyncRateLimit(downloadFile, {
      concurrency: 15,
      timeout: 1000 * 60 * 5,
      ...queue,
      autoStart: true,
      throwOnTimeout: false,
    })
    emit('queue', q)

    const pad = options.files.length.toString().length
    options.files.forEach((file, i) => {
      const url = file.url
      const parsed = path.parse(URL.parse(url).pathname || '')
      const prefix = String(i).padStart(pad, '0') + '_'
      const name = parsed.name || Date.now()
      const ext = file.ext || defaultExt || parsed.ext || '.unknown'
      const basename = prefix + name + normalizeFileExtension(ext)
      const filepath = path.join(outdir, basename)
      const data = { url, filepath }
      emit('start', data)
      enqueue(data).then((error?: Error) => {
        if (error) {
          const errdata = { url, error: (error as Error).message }
          emit('fail', errdata)
          result.failed.push(errdata)
        } else {
          emit('download', data)
          result.downloaded.push(data)
        }
      })
    })

    await q.onIdle()
    //
  } catch (error) {
    if (emitter) emit('error', error)
    else throw error
  }

  emit('done', result)
  return result
}
