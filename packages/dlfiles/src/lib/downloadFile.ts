import { removeFile } from '@bemoje/util'
import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'

/**
 * Download a file to a filepath.
 * @param url - The url to download from.
 * @param filepath - The filepath to download to.
 * @returns A promise that resolves to undefined if successful, and RESOLVES to an Error if not successful.
 */
export async function downloadFile(options: { url: string; filepath: string }): Promise<undefined | Error> {
  const url = options.url
  const filepath = path.resolve(options.filepath)
  try {
    const writer = fs.createWriteStream(filepath)
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    })
    if (response.status !== 200) {
      throw new Error(`Status code: ${response.status}`)
    }
    response.data.pipe(writer)
    return new Promise((resolve) => {
      writer.on('finish', resolve)
      writer.on('error', (error) => {
        writer.close(() => removeFile(filepath, () => resolve(error)))
      })
    })
  } catch (error) {
    await removeFile(filepath)
    if (error instanceof Error) return error
    return new Error(String(error))
  }
}
