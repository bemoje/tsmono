import EventEmitter from 'events'
import { downloadFiles } from './downloadFiles'

/**
 * Wait for all to complete
 */
async function example1() {
  const files: Array<{ url: string; ext?: string }> = []

  for (let i = 1; i <= 240; i++) {
    const page = i.toString().padStart(3, '0')
    files.push({
      url: `http://static.vg.no/uploaded/vgdesk/bilder/2012/breivik_rapporter/img/big/sakkyndig${page}.jpg`,
    })
  }

  const result = await downloadFiles({
    files,
    concurrency: 50,
    timeout: 1000 * 15,
  })

  console.log(result.failed)
}

/**
 * Use event emitter
 */
async function example2() {
  const emitter = new EventEmitter()
  emitter.on('queue', (queue) => console.log(queue))
  emitter.on('start', (data) => console.log({ start: data }))
  emitter.on('download', (data) => console.log({ download: data }))
  emitter.on('fail', (data) => console.log({ fail: data }))
  emitter.on('done', (data) => console.log({ done: data }))
  emitter.on('error', (data) => console.log({ error: data }))

  await downloadFiles({
    emitter,
    timeout: 1000 * 30,
    files: [
      { url: 'https://www.7-zip.org/7ziplogo.png' },
      { url: 'https://www.7-zip.org/a/7z2301-x64.exe' },
      { url: 'https://www.this.fails/to-download.png' },
      //
    ],
  })
}

// example1().catch(console.error)
// example2().catch(console.error)
