import ExcelJS from 'exceljs'

/**
 * Write multiple tables to an Excel file as worksheets.
 * @remarks
 * This function creates a new Excel file or overwrites an existing one.
 * Each key in the data object will be used as a worksheet name, and the corresponding 2D array will be written to that worksheet.
 * @typeParam T - The type of the data that will be written to the Excel file.
 * @param filepath - The path where the Excel file will be written.
 * @param data - An object where each key is a worksheet name and the corresponding value is a 2D array of data to be written to that worksheet.
 * @returns A Promise that resolves when the file has been written.
 * @throws If there is an error writing the file.
 * @example ```ts
 * await writeExcelFile('path/to/file.xlsx', {
 *   employees: [
 *     ['Name', 'Age', 'Title'],
 *     ['John', 30, 'Software Developer'],
 *     ['Jane', 28, 'Data Scientist'],
 *   ],
 *   locations: [
 *     ['ID', 'Country', 'City'],
 *     [1, 'DK', 'Aarhus'],
 *     [2, 'DK', 'Copenhagen'],
 *   ],
 * })
 * ```
 */
export async function writeExcelFile<T>(filepath: string, data: Record<string, T[][]>): Promise<void> {
  const workbook = new ExcelJS.Workbook()
  for (const [worksheetName, table] of Object.entries(data)) {
    const worksheet = workbook.addWorksheet(worksheetName)
    worksheet.addRows(table)
  }
  await workbook.xlsx.writeFile(filepath)
}
