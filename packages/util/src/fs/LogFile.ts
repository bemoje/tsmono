import fs from 'fs'
import path from 'path'
import readline from 'readline'

/**
 * Represents a log file manager that appends log entries to a file.
 * It does not ensure extremely precise ordering of log entries' timestamps if used asynchronously. It logs them as they are received.
 */
export class LogFile<T> {
  /**
   * The path to the log file.
   */
  filepath: string

  /**
   * Creates a new instance of the LogFile class.
   * @param filepath - The path to the log file.
   */
  constructor(filepath: string) {
    this.filepath = filepath
    this.ensureDirectoryExists()
  }

  /**
   * Appends a log entry to the log file.
   * @param data - The data to be logged.
   * @param time - The timestamp of the log entry. Defaults to the current time.
   * @returns A promise that resolves when the log entry is appended.
   */
  async append(data: T, time = Date.now()): Promise<void> {
    await fs.promises.appendFile(this.filepath, time + '|' + JSON.stringify(data) + '\n', 'utf8')
  }

  /**
   * Resets the log file by removing it.
   */
  reset(): void {
    fs.rmSync(this.filepath)
  }

  /**
   * Reads the log entire file and returns an array of log entries, sorted by timestamp in descending order.
   * @returns An array of log entries, sorted by timestamp in descending order.
   */
  readFile(): [number, T][] {
    const data = fs.readFileSync(this.filepath, 'utf8')
    const lines = data.split('\n')
    const result = [] as [number, T][]
    for (const line of lines) {
      const i = line.indexOf('|')
      if (i === -1) continue
      const time = parseInt(line.substring(0, i))
      const data = JSON.parse(line.substring(i + 1)) as T
      result.push([time, data])
    }
    return result.sort((a, b) => b[0] - a[0])
  }

  /**
   * Returns an async generator that yields the timestamps of log entries in the log file.
   * @yields The timestamps of log entries.
   */
  async *keys(): AsyncGenerator<number> {
    const fileStream = fs.createReadStream(this.filepath, 'utf8')
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })
    for await (const line of rl) {
      const i = line.indexOf('|')
      const time = parseInt(line.substring(0, i))
      yield time
    }
  }

  /**
   * Returns an async generator that yields the values of log entries in the log file.
   * @yields The values of log entries.
   */
  async *values(): AsyncGenerator<T> {
    const fileStream = fs.createReadStream(this.filepath, 'utf8')
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })
    for await (const line of rl) {
      const i = line.indexOf('|')
      const data = JSON.parse(line.substring(i + 1)) as T
      yield data
    }
  }

  /**
   * Returns an async generator that yields the entries (timestamp and value) of log entries in the log file.
   * @yields The entries (timestamp and value) of log entries.
   */
  async *entries(): AsyncGenerator<[number, T]> {
    const fileStream = fs.createReadStream(this.filepath, 'utf8')
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })
    for await (const line of rl) {
      const i = line.indexOf('|')
      const time = parseInt(line.substring(0, i))
      const data = JSON.parse(line.substring(i + 1)) as T
      yield [time, data]
    }
  }

  /**
   * Ensures that the directory containing the log file exists.
   */
  ensureDirectoryExists(): void {
    fs.mkdirSync(path.dirname(this.filepath), { recursive: true })
  }
}
