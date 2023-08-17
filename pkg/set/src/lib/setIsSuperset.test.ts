import { setIsSuperset } from './setIsSuperset'

describe('setUtils', () => {
  describe('setIsSuperset', () => {
    it('should return true if the first set is a superset of the second set', () => {
      const set1 = new Set([1, 2, 3, 4, 5])
      const set2 = new Set([2, 4])
      expect(setIsSuperset(set1, set2)).toBe(true)
    })

    it('should return false if the first set is not a superset of the second set', () => {
      const set1 = new Set([1, 2, 3, 4, 5])
      const set2 = new Set([2, 4, 6])
      expect(setIsSuperset(set1, set2)).toBe(false)
    })

    it('should return true if the set is a superset of the subset', () => {
      const set = new Set([1, 2, 3, 4])
      const subset = new Set([1, 2])
      expect(setIsSuperset(set, subset)).toBe(true)
    })

    it('should return false if the set is not a superset of the subset', () => {
      const set = new Set([1, 2, 3, 4])
      const subset = new Set([1, 5])
      expect(setIsSuperset(set, subset)).toBe(false)
    })

    it('should return true if the set and subset are empty', () => {
      const set = new Set()
      const subset = new Set()
      expect(setIsSuperset(set, subset)).toBe(true)
    })

    it('should return true if the subset is empty', () => {
      const set = new Set([1, 2, 3, 4])
      const subset = new Set()
      expect(setIsSuperset(set, subset)).toBe(true)
    })

    it('should return false if the set is empty and the subset is not', () => {
      const set = new Set()
      const subset = new Set([1, 2])
      expect(setIsSuperset(set, subset)).toBe(false)
    })
  })
})
