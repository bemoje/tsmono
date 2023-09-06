import { randomIntBetween } from './randomIntBetween'

describe('randomIntBetween', () => {
  it('generates correct random integers', () => {
    for (let i = -100; i < 100; i++) {
      for (let j = i; j < 100; j++) {
        const r = randomIntBetween(i, j)
        expect(r >= i).toBe(true)
        expect(r <= j).toBe(true)
      }
    }
  })
  it('throws on invalid input.', () => {
    expect(() => randomIntBetween(2, 2.1)).toThrow()
    expect(() => randomIntBetween(2.1, 3)).toThrow()
  })
})
