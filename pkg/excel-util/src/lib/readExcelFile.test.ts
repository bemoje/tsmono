import fs from 'fs'
import path from 'path'
import { readExcelFile } from './readExcelFile'
import { writeExcelFile } from './writeExcelFile'

describe('readExcelFile', () => {
  // const excelFilePath = process.cwd() + '\\tests\\test-files\\excel-file.xlsx'
  // const expectedWorksheet0 = [
  //   ['A', 'B', 'C'],
  //   ['1', '2', '3'],
  //   ['4', '5', '6'],
  // ]
  // const expectedWorksheet1 = [['value']]

  // it('reads contents of excel file all worksheets', async () => {
  //   expect(await readExcelFile(excelFilePath)).toEqual({
  //     Sheet1: expectedWorksheet0,
  //     Sheet2: expectedWorksheet1,
  //   })
  // })

  it('Reads multiple worksheets from Excel file.', async () => {
    const tempdir = process.env.TEMP
    if (!tempdir) throw new Error('TEMP environment variable not set')
    const excelFilePath = path.join(tempdir, Date.now() + '.xlsx')
    const data = {
      employees: [
        ['Name', 'Age', 'Title'],
        ['John', '30', 'Software Developer'],
        ['Jane', '28', 'Data Scientist'],
      ],
      locations: [
        ['ID', 'Country', 'City'],
        ['1', 'DK', 'Aarhus'],
        ['2', 'DK', 'Copenhagen'],
      ],
    }
    await writeExcelFile(excelFilePath, data)
    const result = await readExcelFile(excelFilePath)
    await fs.promises.unlink(excelFilePath)
    expect(data).toEqual(result)
  })
})
