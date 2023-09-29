import EventEmitter from 'events'
import { downloadFiles } from './downloadFiles'

/**
 * Wait for all to complete
 */
function example1() {
  downloadFiles({
    files: new Array(241).fill(0).map((_, i) => {
      const page = (i + 1).toString().padStart(3, '0')
      const url = `http://static.vg.no/uploaded/vgdesk/bilder/2012/breivik_rapporter/img/big/sakkyndig${page}.jpg`
      return { url }
    }),
    queue: {
      concurrency: 50,
      timeout: 1000 * 15,
    },
  })
    .then(console.log)
    .catch(console.error)
}

/**
 * Using event emitter
 */
function example2() {
  downloadFiles({
    emitter: new EventEmitter()
      .on('queue', (queue) => console.log({ queue }))
      .on('start', (start) => console.log({ start }))
      .on('download', (download) => console.log({ download }))
      .on('fail', (fail) => console.log({ fail }))
      .on('done', (done) => console.log({ done }))
      .on('error', (error) => console.log({ error })),
    files: [
      { url: 'https://www.7-zip.org/7ziplogo.png' },
      { url: 'https://www.7-zip.org/a/7z2301-x64.exe' },
      { url: 'https://www.this.fails/to-download.png' },
    ],
  })
}

// example1()
// example2()
