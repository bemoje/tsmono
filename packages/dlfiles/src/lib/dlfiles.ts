import { funAsyncRateLimit, normalizeFileExtension } from '@bemoje/util'
import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'

export interface IDownloadFilesOptions {
  files: Array<{ url: string; ext?: string }>
  outputDirectory: string
  wipeOutputDirectory?: boolean
  defaultExt?: string
  concurrency?: number
  timeoutMs?: number
}

async function downloadFiles(
  o: IDownloadFilesOptions
): Promise<Array<{ url: string; filename: string; ext: string; error: string }>> {
  const { outputDirectory, wipeOutputDirectory, defaultExt, concurrency, timeoutMs } = o

  const padding = o.files.length.toString().length
  const files = o.files.map((file, i) => {
    const parsed = path.parse(urlStripSearchParams(file.url))
    return {
      url: file.url,
      filename: String(i).padStart(padding, '0') + '-' + parsed.name,
      ext: normalizeFileExtension(file.ext || defaultExt || parsed.ext || '.unknown'),
    }
  })

  console.log(files)

  if (wipeOutputDirectory) {
    await fs.emptyDir(outputDirectory)
  } else {
    await fs.ensureDir(outputDirectory)
  }

  const [queue, downloadFileRateLimited] = funAsyncRateLimit(downloadFile, {
    concurrency: concurrency || 15,
    autoStart: false,
    throwOnTimeout: false,
    timeout: timeoutMs ?? 1000 * 60 * 5,
  })

  const failed: Array<{ url: string; filename: string; ext: string; error: string }> = []

  for (const { url, filename, ext } of files) {
    ;(async () => {
      try {
        await downloadFileRateLimited(url, path.join(outputDirectory, filename + ext))
      } catch (error) {
        failed.push({ url, filename, ext, error: (error as Error).message })
      }
    })()
  }
  console.log({ pending: queue.pending, size: queue.size })
  setInterval(() => {
    console.log({ pending: queue.pending, size: queue.size })
  }, 50)

  queue.start()

  await queue.onEmpty()
  return failed
}

export function urlStripSearchParams(url: string) {
  return url.replace(new URL(url).search, '')
}

async function downloadFile(url: string, filepath: string) {
  const writer = fs.createWriteStream(path.resolve(filepath))

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

///////////////////////

async function main() {
  const files: Array<{ url: string; ext?: string }> = []

  // files.push({ url: 'https://www.google.com/js/bg/kCe9S3aj7jfUjwYx99ulknlDr7XLXs4KDWbr4KPVvU0.js' })
  // files.push({ url: 'https://www.7-zip.org/7ziplogo.png' })
  // files.push({ url: 'https://www.7-zip.org/a/7z2301-x64.exe' })

  for (let i = 1; i <= 243; i++) {
    const page = i.toString().padStart(3, '0')
    files.push({
      url: `http://static.vg.no/uploaded/vgdesk/bilder/2012/breivik_rapporter/img/big/sakkyndig${page}.jpg`,
    })
  }

  const failed = await downloadFiles({
    files,
    outputDirectory: path.join(__dirname, 'files'),
    wipeOutputDirectory: true,
    // defaultExt: 'jpg',
  })

  console.log(failed)
}
main().catch(console.error)
