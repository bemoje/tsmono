import fs from 'fs'
import pdf from 'pdf-parse'
import { PDFDocument } from 'pdf-lib'

/**
 * Parse text content of each page in a PDF file. Array indices correspond to page numbers.
 * @param filepath - The path to the PDF file.
 * @param begin - The page number to start from. If not provided, defaults to the first page.
 * @param end - The page number to end at. If not provided, defaults to the last page.
 * @returns An async generator that yields the text content of each page in the PDF.
 * @throws Will yield an empty string if an error occurs while processing a page.
 * @example ```ts
 * for await (const pageText of pdfIteratePages('path/to/file.pdf')) {
 *   console.log(pageText);
 * }
 * ```
 */
export async function* pdfIteratePages(filepath: string, begin?: number, end?: number): AsyncGenerator<string> {
  const buffer = await fs.promises.readFile(filepath)
  const doc = await PDFDocument.load(buffer.buffer)
  if (!end) end = doc.getPages().length
  if (!begin) begin = 0
  for (let i = begin; i < end; i++) {
    try {
      const pageDoc = await PDFDocument.create()
      const [pageCopy] = await pageDoc.copyPages(doc, [i])
      pageDoc.addPage(pageCopy)
      const pageIntArray = await pageDoc.save()
      const pageBuffer = Buffer.from(pageIntArray)
      const pageData = await pdf(pageBuffer)
      yield pageData.text
    } catch (error) {
      yield ''
    }
  }
}
