export class Matrix {
  protected matrix: Array<number[]>
  protected immutable = false

  public static fromArray(array: Array<number[]>): Matrix {
    const cols = array[0].length
    const m = new this(array.length, cols)
    for (let r = 0; r < array.length; r++) {
      if (array[r].length !== cols) {
        throw new Error('All rows must have the same length.')
      }
      for (let c = 0; c < cols; c++) {
        m.matrix[r][c] = array[r][c]
      }
    }
    return m
  }

  public static fromIterable(iterable: Iterable<Iterable<number>>): Matrix {
    const arr = []
    for (const row of iterable) {
      arr.push([...row])
    }
    return this.fromArray(arr)
  }

  public static identity(size: number): Matrix {
    const m = new Matrix(size, size)
    for (let i = 0; i < size; i++) {
      m.matrix[i][i] = 1
    }
    return m
  }

  constructor(rows: number, cols: number) {
    if (rows < 1) throw new Error('Expected rows to be greater than zero.')
    if (cols < 1) throw new Error('Expected cols to be greater than zero.')
    this.matrix = new Array(rows)
    for (let r = 0; r < rows; r++) {
      this.matrix[r] = new Array(cols).fill(0)
    }
  }

  public get rows(): number {
    return this.matrix.length
  }

  public get cols(): number {
    return this.matrix[0].length
  }

  public isSameInstanceAs(other: Matrix): boolean {
    return this === other
  }

  public getImmutable(): boolean {
    return this.immutable
  }

  public setImmutable(immutable: boolean): Matrix {
    this.immutable = immutable
    return this
  }

  public deepEquals(other: Matrix | Array<number[]>): boolean {
    const m = other instanceof Matrix ? other.matrix : other
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.matrix[r][c] !== m[r][c]) {
          return false
        }
      }
    }
    return true
  }

  public set(row: number, col: number, value: number): Matrix {
    const m = this.immutable ? this.clone() : this
    m.matrix[row][col] = value
    return m
  }

  public get(row: number, col: number): number {
    return this.matrix[row][col]
  }

  public has(row: number, col: number): boolean {
    return row < this.rows && col < this.cols && row >= 0 && col >= 0
  }

  public toArray(): Array<number[]> {
    const result = new Array(this.rows)
    for (let r = 0; r < this.rows; r++) {
      result[r] = this.matrix[r].slice()
    }
    return result
  }

  public clone(): Matrix {
    const clone = new Matrix(this.rows, this.cols)
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        clone.matrix[r][c] = this.matrix[r][c]
      }
    }
    return clone
  }

  public forEach(f: (value: number, row: number, col: number) => void | boolean): Matrix {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (f(this.matrix[r][c], r, c) === false) {
          return this
        }
      }
    }
    return this
  }

  public forEachInRow(row: number, f: (value: number, col: number) => void | boolean): Matrix {
    for (let c = 0; c < this.cols; c++) {
      if (f(this.matrix[row][c], c) === false) {
        return this
      }
    }
    return this
  }

  public forEachInCol(col: number, f: (value: number, row: number) => void | boolean): Matrix {
    for (let r = 0; r < this.rows; r++) {
      if (f(this.matrix[r][col], r) === false) {
        return this
      }
    }
    return this
  }

  public forEachInDiagonal(f: (value: number, row: number, col: number) => void | boolean): Matrix {
    for (let i = 0; i < Math.min(this.rows, this.cols); i++) {
      if (f(this.matrix[i][i], i, i) === false) {
        return this
      }
    }
    return this
  }

  public map(f: (value: number, row: number, col: number) => number): Matrix {
    const m = this.immutable ? this.clone() : this
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        m.matrix[r][c] = f(this.matrix[r][c], r, c)
      }
    }
    return m
  }

  public *[Symbol.iterator](): Generator<number> {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        yield this.matrix[r][c]
      }
    }
  }

  public *values(): Generator<number> {
    yield* this
  }

  public mapRow(row: number, f: (value: number, col: number) => number): Matrix {
    const m = this.immutable ? this.clone() : this
    for (let c = 0; c < this.cols; c++) {
      m.matrix[row][c] = f(this.matrix[row][c], c)
    }
    return m
  }

  public mapCol(col: number, f: (value: number, row: number) => number): Matrix {
    const m = this.immutable ? this.clone() : this
    for (let r = 0; r < this.rows; r++) {
      m.matrix[r][col] = f(this.matrix[r][col], r)
    }
    return m
  }

  public appendRow(row?: number[]): Matrix {
    const m = this.immutable ? this.clone() : this
    if (row) {
      if (row.length !== this.cols) {
        throw new Error('Row must have length ' + this.cols)
      }
    } else {
      row = new Array(this.cols).fill(0)
    }
    m.matrix.push(row)
    return m
  }

  public appendCol(col?: number[]): Matrix {
    const m = this.immutable ? this.clone() : this
    if (col) {
      if (col.length !== this.rows) {
        throw new Error('Col must have length ' + this.rows)
      }
    } else {
      col = new Array(this.rows).fill(0)
    }
    for (let r = 0; r < this.rows; r++) {
      m.matrix[r].push(col[r])
    }
    return m
  }

  public addBy(n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.map((value: number) => value + n)
  }

  public subtractBy(n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.map((value: number) => value - n)
  }

  public multiplyBy(n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.map((value: number) => value * n)
  }

  public divideBy(n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.map((value: number) => value / n)
  }

  public addRowBy(row: number, n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.mapRow(row, (value: number) => value + n)
  }

  public subtractRowBy(row: number, n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.mapRow(row, (value: number) => value - n)
  }

  public multiplyRowBy(row: number, n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.mapRow(row, (value: number) => value * n)
  }

  public divideRowBy(row: number, n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.mapRow(row, (value: number) => value / n)
  }

  public addColBy(col: number, n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.mapCol(col, (value: number) => value + n)
  }

  public subtractColBy(col: number, n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.mapCol(col, (value: number) => value - n)
  }

  public multiplyColBy(col: number, n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.mapCol(col, (value: number) => value * n)
  }

  public divideColBy(col: number, n: number): Matrix {
    const m = this.immutable ? this.clone() : this
    return m.mapCol(col, (value: number) => value / n)
  }

  public swapRows(row1: number, row2: number): Matrix {
    const m = this.immutable ? this.clone() : this
    const r1 = m.matrix[row1]
    const r2 = m.matrix[row2]
    m.matrix[row1] = r2
    m.matrix[row2] = r1
    return m
  }

  public swapCols(col1: number, col2: number): Matrix {
    const m = this.immutable ? this.clone() : this
    for (let r = 0; r < this.rows; r++) {
      const v1 = m.matrix[r][col1]
      const v2 = m.matrix[r][col2]
      m.matrix[r][col1] = v2
      m.matrix[r][col2] = v1
    }
    return m
  }

  public some(f: (value: number, row: number, col: number) => boolean): boolean {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (f(this.matrix[r][c], r, c)) {
          return true
        }
      }
    }
    return false
  }

  public every(f: (value: number, row: number, col: number) => boolean): boolean {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (!f(this.matrix[r][c], r, c)) {
          return false
        }
      }
    }
    return true
  }

  public hasDimensions(rows: number, cols: number): boolean {
    return this.rows === rows && this.cols === cols
  }

  public isSquareMatrix(): boolean {
    return this.rows === this.cols
  }

  /**
   * Returns whether the matrix is a square matrix that has identical values on its diagonal.
   */
  public isScalarMatrix(): boolean {
    if (!this.isSquareMatrix()) return false
    const val = this.matrix[0][0]
    for (let i = 1; i < this.rows; i++) {
      if (this.matrix[i][i] !== val) {
        return false
      }
    }
    return true
  }

  public isZeroMatrix(): boolean {
    return this.every((value: number) => value === 0)
  }

  /**
   * Performs dot product of the matrix with another given matrix.
   */
  public dotProduct(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error(
        'A*B dot product not possible unless the number of columns in A and number of rows in B are the same.',
      )
    }
    const rows = this.rows
    const cols = other.cols
    const steps = this.cols
    const result = new Matrix(rows, cols)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        for (let step = 0; step < steps; step++) {
          result.matrix[r][c] += this.matrix[r][step] * other.matrix[step][c]
        }
      }
    }
    return result
  }
}
