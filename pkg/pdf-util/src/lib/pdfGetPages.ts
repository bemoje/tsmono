import { pdfIteratePages } from './pdfIteratePages'

/**
 * Parse text content of each page in a PDF file.
 * @param filepath - The path to the PDF file.
 * @param begin - The starting page number for the range of pages to retrieve. Optional.
 * @param end - The ending page number for the range of pages to retrieve. Optional.
 * @returns A Promise that resolves to an array of strings, where each string represents a page in the PDF.
 * @example ```ts
 * const pages = await pdfGetPages('/path/to/pdf', 1, 5);
 * console.log(pages); // logs the first 5 pages of the PDF
 * ```
 */
export async function pdfGetPages(filepath: string, begin?: number, end?: number): Promise<string[]> {
  const result = []
  for await (const page of pdfIteratePages(filepath, begin, end)) {
    result.push(page)
  }
  return result
}
