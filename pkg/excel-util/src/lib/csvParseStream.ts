import parseCSV, { Options as CsvParserOptions } from 'csv-parser'
import type { Readable } from 'stream'

/**
 * Parse a Readable stream of CSV lines into an array of objects.
 * @param stream The Readable stream of CSV lines.
 * @param options The options to pass to the CSV parser.
 * @returns An array of objects, where each object represents a row in the CSV.
 * @example ```ts
 * // parse a CSV file
 * const stream = fs.createReadStream('data.csv');
 * const options = { separator: ';', strict: true };
 * const data = await csvParseStream(stream, options);
 * // parse a CSV string
 * const stream = new StringSteam('Name;Age;Country\nJohn;25;USA\nAlice;30;Canada\n');
 * const options = { separator: ';', strict: true };
 * const data = await csvParseStream(stream, options);
 * //=> [{Name:'John',Age:'25',Country:'USA'},{Name:'Alice',Age:'30',Country:'Canada'}]
 * ```
 */
export function csvParseStream(stream: Readable, options: CsvParserOptions): Promise<Array<Record<string, string>>> {
  return new Promise((resolve, reject) => {
    const data: Array<Record<string, any>> = []
    stream
      .pipe(parseCSV(options))
      .on('data', (o: Record<string, any>) => {
        data.push(o)
      })
      .on('end', () => {
        resolve(data)
      })
      .on('error', reject)
  })
}
