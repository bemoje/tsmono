import fs from 'fs'
import path from 'path'
import { PDFDocument } from 'pdf-lib'

/**
 * Split a given PDF file into separate single-page-files.
 * @remarks
 * This function reads a PDF file from the provided filepath, splits it into separate pages,
 * and saves each page as a separate PDF file in the specified output directory.
 * The filenames of the output files are zero-padded based on the total number of pages in the original document.
 * @param filepath - The path to the PDF file to be split.
 * @param outputDirpath - The directory where the split PDF pages should be saved.
 * @returns A promise that resolves to an array of filepaths for the split PDF pages.
 * @throws Will throw an error if the input file cannot be read or the output directory cannot be created.
 * @example ```ts
 * const inputFilePath = '/path/to/input.pdf';
 * const outputDirPath = '/path/to/output/directory';
 * pdfSplitPages(inputFilePath, outputDirPath)
 *   .then(filepaths => console.log(filepaths))
 *   .catch(error => console.error(error));
 * ```
 */
export async function pdfSplitPages(filepath: string, outputDirpath: string): Promise<string[]> {
  const inputBuffer = await fs.promises.readFile(filepath)
  const doc = await PDFDocument.load(inputBuffer)
  const numPages = doc.getPages().length
  const numPageNumDigits = numPages.toString().length
  const filepaths = []
  await fs.promises.mkdir(outputDirpath, { recursive: true })
  for (let i = 0; i < numPages; i++) {
    const page = await PDFDocument.create()
    const [copiedPage] = await page.copyPages(doc, [i])
    page.addPage(copiedPage)
    const pageNumber = i
    const outputBuffer = await page.save()
    const outputFilename = `${pageNumber.toString().padStart(numPageNumDigits, '0')}.pdf`
    const outputFilepath = path.join(outputDirpath, outputFilename)
    await fs.promises.writeFile(outputFilepath, outputBuffer)
    filepaths[pageNumber] = outputFilepath
  }
  return filepaths
}
