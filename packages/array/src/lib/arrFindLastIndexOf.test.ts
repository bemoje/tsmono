import { arrFindLastIndexOf } from './arrFindLastIndexOf'

describe(arrFindLastIndexOf.name, () => {
  describe('when array is empty', () => {
    it('should return -1', () => {
      const result = arrFindLastIndexOf([], () => true)
      expect(result).toEqual(-1)
    })
  })

  describe('when no element passes the test', () => {
    it('should return -1', () => {
      const result = arrFindLastIndexOf([1, 2, 3], () => false)
      expect(result).toEqual(-1)
    })
  })

  describe('when an element passes the test', () => {
    it('should return the index of the last occurrence of the element', () => {
      const result = arrFindLastIndexOf([1, 2, 3, 2, 1], (value) => value === 2)
      expect(result).toEqual(3)
    })
  })

  describe('when multiple elements pass the test', () => {
    it('should return the index of the last occurrence of the element', () => {
      const result = arrFindLastIndexOf([1, 2, 3, 2, 1], (value) => value === 1)
      expect(result).toEqual(4)
    })
  })

  describe('when an element passes the test and it is the first element', () => {
    it('should return the index of the element', () => {
      const result = arrFindLastIndexOf([1, 2, 3], (value) => value === 1)
      expect(result).toEqual(0)
    })
  })

  describe('when array contains objects', () => {
    it('should return the index of the last occurrence of the element', () => {
      const obj1 = { id: 1, name: 'John' }
      const obj2 = { id: 2, name: 'Jane' }
      const obj3 = { id: 3, name: 'Doe' }
      const result = arrFindLastIndexOf([obj1, obj2, obj3, obj2, obj1], (value) => value.name === 'Jane')
      expect(result).toEqual(3)
    })
  })
})
