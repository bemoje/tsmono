import { Readable } from 'stream'
import { csvParseStream } from './csvParseStream'

describe('csvParseStream', () => {
  it('should parse a CSV string', async () => {
    const stream = new Readable()
    stream.push('Name;Age;Country\nJohn;25;USA\nAlice;30;Canada')
    stream.push(null)

    const options = { separator: ';', strict: true }
    const data = await csvParseStream(stream, options)

    expect(data).toEqual([
      { Name: 'John', Age: '25', Country: 'USA' },
      { Name: 'Alice', Age: '30', Country: 'Canada' },
    ])
  })
})
