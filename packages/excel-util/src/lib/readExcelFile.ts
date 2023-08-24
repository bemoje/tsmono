import type { Row } from 'exceljs'
import excelJs from 'exceljs'

/**
 * Reads an Excel file and returns its content as a record where each key is the name of a worksheet and its value is a 2D array of strings representing the rows and cells of the worksheet.
 * @remarks This function uses the `exceljs` library to read the Excel file. It will throw an error if the file does not exist or is not a valid Excel file.
 * @param filepath - The path to the Excel file to read.
 * @returns A Promise that resolves to a record where each key is the name of a worksheet and its value is a 2D array of strings representing the rows and cells of the worksheet.
 * @throws Will throw an error if the file does not exist or is not a valid Excel file.
 * @example ```ts
 * readExcelFile('path/to/file.xlsx').then((worksheets) => {
 *   console.log(worksheets['Sheet1']); // logs the content of 'Sheet1'
 * });
 * ```
 */
export async function readExcelFile(filepath: string): Promise<Record<string, string[][]>> {
  const workbook = new excelJs.Workbook()
  await workbook.xlsx.readFile(filepath)
  const worksheets: Record<string, string[][]> = {}
  workbook.eachSheet((worksheet) => {
    const rows: string[][] = []
    worksheet.eachRow((cells: Row) => {
      const row: string[] = []
      cells.eachCell((cell) => {
        row.push(String(cell.value).trim())
      })
      rows.push(row)
    })
    worksheets[worksheet.name] = rows
  })
  return worksheets
}
