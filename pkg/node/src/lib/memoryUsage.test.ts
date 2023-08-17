import { memoryUsage } from './memoryUsage'

describe('getMemoryUsage', () => {
  it('example', () => {
    const m = memoryUsage()
    expect(typeof m.processAllocationMB).toBe('number')
    expect(typeof m.heapAllocationMB).toBe('number')
    expect(typeof m.heapUsedMB).toBe('number')
    expect(typeof m.extenalV8).toBe('number')
  })
})
