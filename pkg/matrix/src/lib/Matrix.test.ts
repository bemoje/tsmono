import { Matrix } from './Matrix'

describe('Matrix', () => {
  describe('static fromArray', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      expect(m.deepEquals(arr)).toBe(true)
    })

    it('throws if rows not same length', () => {
      const arr = [
        [1, 2],
        [3, 4, 5],
      ]
      expect(() => Matrix.fromArray(arr)).toThrowError('All rows must have the same length.')
    })
  })

  describe('static fromIterable', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromIterable(arr)
      expect(m.deepEquals(arr)).toBe(true)
    })
  })

  describe('static identity', () => {
    it('example', () => {
      expect(
        Matrix.identity(3).deepEquals([
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ]),
      ).toBe(true)
    })
  })

  describe('constructor', () => {
    it('example', () => {
      expect(new Matrix(3, 2).toArray()).toStrictEqual([
        [0, 0],
        [0, 0],
        [0, 0],
      ])
    })
    it('throws when number of cols or rows is not greater than zero', () => {
      expect(() => {
        new Matrix(0, 1)
      }).toThrowError('Expected rows to be greater than zero.')

      expect(() => {
        new Matrix(1, 0)
      }).toThrowError('Expected cols to be greater than zero.')
    })
  })

  describe('get rows', () => {
    it('example', () => {
      expect(new Matrix(3, 2).rows).toBe(3)
    })
  })

  describe('get cols', () => {
    it('example', () => {
      expect(new Matrix(3, 2).cols).toBe(2)
    })
  })

  describe('isSameInstanceAs', () => {
    it('example', () => {
      const m1 = new Matrix(1, 1)
      const m2 = new Matrix(1, 1)
      expect(m1.isSameInstanceAs(m2)).toBe(false)
      expect(m1.isSameInstanceAs(m1)).toBe(true)
    })
  })

  describe('isImmutable', () => {
    it('example', () => {
      const m = new Matrix(1, 1)
      expect(m.getImmutable()).toBe(false)
    })
  })

  describe('setImmutable', () => {
    it('example', () => {
      const m = new Matrix(1, 1)

      m.setImmutable(true)
      expect(m.getImmutable()).toBe(true)
      expect(m.set(0, 0, 0).isSameInstanceAs(m)).toBe(false)

      m.setImmutable(false)
      expect(m.getImmutable()).toBe(false)
      expect(m.set(0, 0, 0).isSameInstanceAs(m)).toBe(true)
    })

    it('works with all potentially mutable methods', () => {
      const m = new Matrix(1, 1)

      m.setImmutable(true)
      expect(m.getImmutable()).toBe(true)
      expect(m.set(0, 0, 0).isSameInstanceAs(m)).toBe(false)
      expect(m.map((n: number) => n).isSameInstanceAs(m)).toBe(false)
      expect(m.mapRow(0, (n: number) => n).isSameInstanceAs(m)).toBe(false)
      expect(m.mapCol(0, (n: number) => n).isSameInstanceAs(m)).toBe(false)
      expect(m.appendRow().isSameInstanceAs(m)).toBe(false)
      expect(m.appendCol().isSameInstanceAs(m)).toBe(false)
      expect(m.addBy(1).isSameInstanceAs(m)).toBe(false)
      expect(m.subtractBy(1).isSameInstanceAs(m)).toBe(false)
      expect(m.multiplyBy(1).isSameInstanceAs(m)).toBe(false)
      expect(m.divideBy(1).isSameInstanceAs(m)).toBe(false)
      expect(m.addRowBy(0, 1).isSameInstanceAs(m)).toBe(false)
      expect(m.subtractRowBy(0, 1).isSameInstanceAs(m)).toBe(false)
      expect(m.multiplyRowBy(0, 1).isSameInstanceAs(m)).toBe(false)
      expect(m.divideRowBy(0, 1).isSameInstanceAs(m)).toBe(false)
      expect(m.addColBy(0, 1).isSameInstanceAs(m)).toBe(false)
      expect(m.subtractColBy(0, 1).isSameInstanceAs(m)).toBe(false)
      expect(m.multiplyColBy(0, 1).isSameInstanceAs(m)).toBe(false)
      expect(m.divideColBy(0, 1).isSameInstanceAs(m)).toBe(false)
      expect(m.swapRows(0, 0).isSameInstanceAs(m)).toBe(false)
      expect(m.swapCols(0, 0).isSameInstanceAs(m)).toBe(false)

      m.setImmutable(false)
      expect(m.getImmutable()).toBe(false)
      expect(m.set(0, 0, 0).isSameInstanceAs(m)).toBe(true)
      expect(m.map((n: number) => n).isSameInstanceAs(m)).toBe(true)
      expect(m.mapRow(0, (n: number) => n).isSameInstanceAs(m)).toBe(true)
      expect(m.mapCol(0, (n: number) => n).isSameInstanceAs(m)).toBe(true)
      expect(m.appendRow().isSameInstanceAs(m)).toBe(true)
      expect(m.appendCol().isSameInstanceAs(m)).toBe(true)
      expect(m.addBy(1).isSameInstanceAs(m)).toBe(true)
      expect(m.subtractBy(1).isSameInstanceAs(m)).toBe(true)
      expect(m.multiplyBy(1).isSameInstanceAs(m)).toBe(true)
      expect(m.divideBy(1).isSameInstanceAs(m)).toBe(true)
      expect(m.addRowBy(0, 1).isSameInstanceAs(m)).toBe(true)
      expect(m.subtractRowBy(0, 1).isSameInstanceAs(m)).toBe(true)
      expect(m.multiplyRowBy(0, 1).isSameInstanceAs(m)).toBe(true)
      expect(m.divideRowBy(0, 1).isSameInstanceAs(m)).toBe(true)
      expect(m.addColBy(0, 1).isSameInstanceAs(m)).toBe(true)
      expect(m.subtractColBy(0, 1).isSameInstanceAs(m)).toBe(true)
      expect(m.multiplyColBy(0, 1).isSameInstanceAs(m)).toBe(true)
      expect(m.divideColBy(0, 1).isSameInstanceAs(m)).toBe(true)
      expect(m.swapRows(0, 0).isSameInstanceAs(m)).toBe(true)
      expect(m.swapCols(0, 0).isSameInstanceAs(m)).toBe(true)
    })
  })

  describe('deepEquals', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m1 = Matrix.fromArray(arr)
      const m2 = Matrix.fromArray(arr)
      expect(m1.deepEquals(arr)).toBe(true)
      expect(m1.deepEquals(m2)).toBe(true)
      m1.set(0, 0, 0)
      expect(m1.deepEquals(m2)).toBe(false)
      m1.set(0, 0, 1)
      expect(m1.deepEquals(m2)).toBe(true)
    })
  })

  describe('set', () => {
    it('example', () => {
      const m = new Matrix(3, 2)
      m.set(0, 0, 1)
      m.set(2, 1, 2)
      expect(m.toArray()).toStrictEqual([
        [1, 0],
        [0, 0],
        [0, 2],
      ])
    })
  })

  describe('get', () => {
    it('example', () => {
      const m = new Matrix(3, 2)
      m.set(0, 0, 1)
      m.set(2, 1, 2)
      expect(m.get(0, 0)).toBe(1)
      expect(m.get(2, 1)).toBe(2)
      expect(m.get(2, 0)).toBe(0)
    })
  })

  describe('has', () => {
    it('example', () => {
      const m = new Matrix(2, 2)
      expect(m.has(0, 0)).toBe(true)
      expect(m.has(1, 1)).toBe(true)
      expect(m.has(-1, 0)).toBe(false)
      expect(m.has(0, -1)).toBe(false)
      expect(m.has(0, 2)).toBe(false)
      expect(m.has(2, 0)).toBe(false)
    })
  })

  describe('toArray', () => {
    it('example', () => {
      expect(new Matrix(2, 2).toArray()).toStrictEqual([
        [0, 0],
        [0, 0],
      ])
    })
  })

  describe('clone', () => {
    it('example', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      const clone = m.clone()
      expect(clone).toStrictEqual(m)
      expect(clone).toBeInstanceOf(Matrix)
      expect(m).not.toBe(clone)
    })
  })

  describe('values', () => {
    it('example', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      expect([...m.values()]).toEqual([1, 2, 3, 4])
    })
  })

  describe('forEach', () => {
    it('example', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      m.forEach((value: number, row: number, col: number) => {
        // do something with value
        value
        row
        col
        // cancel iteration by returning 'false'.
        if (value === 2) return false
        else return true
      })
    })

    it('iterator works as expected', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      let count = 0
      m.forEach((value: number, row: number, col: number) => {
        count++
        if (count === 1) {
          expect(value).toBe(1)
          expect(row).toBe(0)
          expect(col).toBe(0)
        } else if (count === 2) {
          expect(value).toBe(2)
          expect(row).toBe(0)
          expect(col).toBe(1)
        } else if (count === 3) {
          expect(value).toBe(3)
          expect(row).toBe(1)
          expect(col).toBe(0)
        } else if (count === 4) {
          expect(value).toBe(4)
          expect(row).toBe(1)
          expect(col).toBe(1)
        }
      })
      expect(count).toBe(4)
    })

    it('cancel iteration', () => {
      const m = new Matrix(2, 2)
      let count = 0
      m.forEach(() => {
        count++
        if (count === 3) {
          return false
        } else {
          return true
        }
      })
      expect(count).toBe(3)
    })
  })

  describe('forEachInRow', () => {
    it('example', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      m.forEachInRow(0, (value: number, col: number) => {
        // do something with value
        value
        col
        // cancel iteration by returning 'false'.
        if (value === 1) return false
        else return true
      })
    })

    it('iterator works as expected', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      let count = 0
      m.forEachInRow(0, (value: number, col: number) => {
        count++
        if (count === 1) {
          expect(value).toBe(1)
          expect(col).toBe(0)
        } else if (count === 2) {
          expect(value).toBe(2)
          expect(col).toBe(1)
        }
      })
      expect(count).toBe(2)
    })

    it('cancel iteration', () => {
      const m = new Matrix(2, 2)
      let count = 0
      m.forEachInRow(0, () => {
        count++
        if (count === 1) {
          return false
        } else {
          return true
        }
      })
      expect(count).toBe(1)
    })
  })

  describe('forEachInCol', () => {
    it('example', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      m.forEachInCol(0, (value: number, row: number) => {
        // do something with value
        value
        row
        // cancel iteration by returning 'false'.
        if (value === 1) return false
        else return true
      })
    })

    it('iterator works as expected', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      let count = 0
      m.forEachInCol(0, (value: number, row: number) => {
        count++
        if (count === 1) {
          expect(value).toBe(1)
          expect(row).toBe(0)
        } else if (count === 2) {
          expect(value).toBe(3)
          expect(row).toBe(1)
        }
      })
      expect(count).toBe(2)
    })

    it('example', () => {
      const m = new Matrix(2, 2)
      let count = 0
      m.forEachInCol(0, () => {
        count++
        if (count === 1) {
          return false
        } else {
          return true
        }
      })
      expect(count).toBe(1)
    })
  })

  describe('forEachInDiagonal', () => {
    it('example', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      m.forEachInDiagonal((value: number, row: number, col: number) => {
        // do something with value
        value
        row
        col
        // cancel iteration by returning 'false'.
        if (value === 1) return false
        else return true
      })
    })

    it('iterator works as expected', () => {
      const m = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ])
      let count = 0
      m.forEachInDiagonal((value: number, row: number, col: number) => {
        count++
        if (count === 1) {
          expect(value).toBe(1)
          expect(row).toBe(0)
          expect(col).toBe(0)
        } else if (count === 2) {
          expect(value).toBe(4)
          expect(row).toBe(1)
          expect(col).toBe(1)
        }
      })
      expect(count).toBe(2)
    })

    it('cancel iteration', () => {
      const m = new Matrix(2, 2)
      let count = 0
      m.forEachInDiagonal(() => {
        count++
        if (count === 1) {
          return false
        } else {
          return true
        }
      })
      expect(count).toBe(1)
    })
  })

  describe('map', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      let count = 0
      m.map((value: number, row: number, col: number) => {
        count++
        if (count === 1) {
          expect(value).toBe(1)
          expect(row).toBe(0)
          expect(col).toBe(0)
        } else if (count === 2) {
          expect(value).toBe(2)
          expect(row).toBe(0)
          expect(col).toBe(1)
        } else if (count === 3) {
          expect(value).toBe(3)
          expect(row).toBe(1)
          expect(col).toBe(0)
        } else if (count === 4) {
          expect(value).toBe(4)
          expect(row).toBe(1)
          expect(col).toBe(1)
        }
        return value * 2
      })
      expect(count).toBe(4)
      expect(
        m.deepEquals([
          [2, 4],
          [6, 8],
        ]),
      ).toBe(true)
    })
  })

  describe('*[Symbol.iterator]', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      expect([...m]).toStrictEqual([1, 2, 3, 4])
    })
  })

  describe('mapRow', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      let count = 0
      m.mapRow(0, (value: number, col: number) => {
        count++
        if (count === 1) {
          expect(value).toBe(1)
          expect(col).toBe(0)
        } else if (count === 2) {
          expect(value).toBe(2)
          expect(col).toBe(1)
        }
        return value * 2
      })
      expect(count).toBe(2)
      expect(
        m.deepEquals([
          [2, 4],
          [3, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('mapCol', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      let count = 0
      m.mapCol(0, (value: number, row: number) => {
        count++
        if (count === 1) {
          expect(value).toBe(1)
          expect(row).toBe(0)
        } else if (count === 2) {
          expect(value).toBe(3)
          expect(row).toBe(1)
        }
        return value * 2
      })
      expect(count).toBe(2)
      expect(
        m.deepEquals([
          [2, 2],
          [6, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('appendRow', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)

      m.appendRow([5, 6])
      expect(m.toArray()).toStrictEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ])

      expect(() => {
        m.appendRow([0, 0, 0])
      }).toThrowError('Row must have length 2')
    })
  })

  describe('appendCol', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)

      m.appendCol()
      expect(m.toArray()).toStrictEqual([
        [1, 2, 0],
        [3, 4, 0],
      ])

      m.appendCol([5, 6])
      expect(m.toArray()).toStrictEqual([
        [1, 2, 0, 5],
        [3, 4, 0, 6],
      ])

      expect(() => {
        m.appendCol([0, 0, 0])
      }).toThrowError('Col must have length 2')
    })
  })

  describe('addBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.addBy(1)
      expect(
        m.deepEquals([
          [2, 3],
          [4, 5],
        ]),
      ).toBe(true)
    })
  })

  describe('subtractBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.subtractBy(1)
      expect(
        m.deepEquals([
          [0, 1],
          [2, 3],
        ]),
      ).toBe(true)
    })
  })

  describe('multiplyBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.multiplyBy(2)
      expect(
        m.deepEquals([
          [2, 4],
          [6, 8],
        ]),
      ).toBe(true)
    })
  })

  describe('divideBy', () => {
    it('example', () => {
      const arr = [
        [2, 4],
        [6, 8],
      ]
      const m = Matrix.fromArray(arr)
      m.divideBy(2)
      expect(
        m.deepEquals([
          [1, 2],
          [3, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('addRowBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.addRowBy(0, 1)
      expect(
        m.deepEquals([
          [2, 3],
          [3, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('subtractRowBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.subtractRowBy(0, 1)
      expect(
        m.deepEquals([
          [0, 1],
          [3, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('multiplyRowBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.multiplyRowBy(0, 2)
      expect(
        m.deepEquals([
          [2, 4],
          [3, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('divideRowBy', () => {
    it('example', () => {
      const arr = [
        [2, 4],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.divideRowBy(0, 2)
      expect(
        m.deepEquals([
          [1, 2],
          [3, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('addColBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.addColBy(0, 1)
      expect(
        m.deepEquals([
          [2, 2],
          [4, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('subtractColBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.subtractColBy(0, 1)
      expect(
        m.deepEquals([
          [0, 2],
          [2, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('multiplyColBy', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      m.multiplyColBy(0, 2)
      expect(
        m.deepEquals([
          [2, 2],
          [6, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('divideColBy', () => {
    it('example', () => {
      const arr = [
        [2, 3],
        [4, 5],
      ]
      const m = Matrix.fromArray(arr)
      m.divideColBy(0, 2)
      expect(
        m.deepEquals([
          [1, 3],
          [2, 5],
        ]),
      ).toBe(true)
    })
  })

  describe('swapRows', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
        [5, 6],
      ]
      const m = Matrix.fromArray(arr)
      m.swapRows(0, 2)
      expect(
        m.deepEquals([
          [5, 6],
          [3, 4],
          [1, 2],
        ]),
      ).toBe(true)
    })
  })

  describe('swapCols', () => {
    it('example', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
      ]
      const m = Matrix.fromArray(arr)
      m.swapCols(0, 2)
      expect(
        m.deepEquals([
          [3, 2, 1],
          [6, 5, 4],
        ]),
      ).toBe(true)
    })
  })

  describe('some', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      expect(
        m.some((value: number) => {
          return value === 4
        }),
      ).toBe(true)
      expect(
        m.some((value: number, row: number, col: number) => {
          expect(row >= 0).toBe(true)
          expect(col >= 0).toBe(true)
          return value === 5
        }),
      ).toBe(false)
    })
  })

  describe('every', () => {
    it('example', () => {
      const arr = [
        [1, 2],
        [3, 4],
      ]
      const m = Matrix.fromArray(arr)
      expect(
        m.every((value: number, row: number, col: number) => {
          expect(row >= 0).toBe(true)
          expect(col >= 0).toBe(true)
          return value > 0
        }),
      ).toBe(true)
      expect(
        m.every((value: number) => {
          return value > 1
        }),
      ).toBe(false)
    })
  })

  describe('hasDimensions', () => {
    it('example', () => {
      const m = new Matrix(3, 2)
      expect(m.hasDimensions(3, 2)).toBe(true)
      expect(m.hasDimensions(3, 3)).toBe(false)
      expect(m.hasDimensions(4, 2)).toBe(false)
    })
  })

  describe('isSquareMatrix', () => {
    it('example', () => {
      expect(new Matrix(1, 1).isSquareMatrix()).toBe(true)
      expect(new Matrix(2, 2).isSquareMatrix()).toBe(true)
      expect(new Matrix(3, 3).isSquareMatrix()).toBe(true)
      expect(new Matrix(3, 2).isSquareMatrix()).toBe(false)
    })
  })

  describe('isScalarMatrix', () => {
    it('example', () => {
      expect(new Matrix(1, 1).isScalarMatrix()).toBe(true)
      expect(new Matrix(3, 3).isScalarMatrix()).toBe(true)
      expect(Matrix.identity(3).isScalarMatrix()).toBe(true)
      expect(new Matrix(3, 2).isScalarMatrix()).toBe(false)
      expect(new Matrix(3, 3).set(0, 0, 1).isScalarMatrix()).toBe(false)
      expect(new Matrix(3, 3).appendRow().isScalarMatrix()).toBe(false)
    })
  })

  describe('isZeroMatrix', () => {
    it('example', () => {
      expect(new Matrix(1, 1).isZeroMatrix()).toBe(true)
      expect(new Matrix(3, 3).isZeroMatrix()).toBe(true)
      expect(new Matrix(3, 2).isZeroMatrix()).toBe(true)
      expect(new Matrix(3, 3).set(1, 2, 1).isZeroMatrix()).toBe(false)
    })
  })

  describe('dotProduct', () => {
    it('example', () => {
      const m1 = Matrix.fromArray([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
      const m2 = Matrix.fromArray([
        [1, 2, 1],
        [2, 4, 6],
        [7, 2, 5],
      ])
      expect(
        m1.dotProduct(m2).deepEquals([
          [26, 16, 28],
          [56, 40, 64],
          [86, 64, 100],
        ]),
      ).toBe(true)
    })

    it('throws if cols and rows do not match.', () => {
      const m1 = Matrix.fromArray([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
      const m2 = Matrix.fromArray([
        [1, 2, 1],
        [2, 4, 6],
      ])
      expect(() => m1.dotProduct(m2)).toThrowError(
        'A*B dot product not possible unless the number of columns in A and number of rows in B are the same.',
      )
    })
  })
})
