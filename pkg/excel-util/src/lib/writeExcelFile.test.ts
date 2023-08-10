import fs from 'fs'
import path from 'path'
import { readExcelFile } from './readExcelFile'
import { writeExcelFile } from './writeExcelFile'

describe(writeExcelFile.name, () => {
  it('Writes multiple tables to an Excel file.', async () => {
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
    try {
      setTimeout(async () => {
        await fs.promises.unlink(excelFilePath)
      }, 500)
    } catch (error) {
      //
    }
    expect(data).toEqual(result)
  })
})
