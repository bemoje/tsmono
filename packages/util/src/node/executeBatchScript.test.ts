import { execFileSync } from 'child_process'
import fs from 'fs'
import { executeBatchScript } from './executeBatchScript'
import { IExecuteBatchScriptOptions } from './types/IExecuteBatchScriptOptions'

jest.mock('child_process')
jest.mock('fs')
jest.mock('console')

describe(executeBatchScript.name, () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when cmds is empty', () => {
    it('should return an empty result', () => {
      const result = executeBatchScript([])
      expect(result).toEqual({ stdout: [], stderr: [], error: undefined })
    })
  })

  describe('when cmds is not empty', () => {
    const cmds = ['ping google.com']

    describe('when options are provided', () => {
      const options: IExecuteBatchScriptOptions = {
        echo: true,
        prependWithCall: true,
        silent: true,
        cwd: 'path\\to\\cwd',
        tempdir: 'path\\to\\tempdir',
      }

      it('should use provided options', () => {
        executeBatchScript(cmds, options)
        const expectedScript = ['cd path\\to\\cwd', 'call ping google.com'].join('\n')
        expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), expectedScript, 'utf8')
        expect(execFileSync).toHaveBeenCalledWith(expect.any(String), { stdio: 'ignore' })
      })
    })
  })
})
