import { assertion } from './assertion'

const isPositive = (n: number) => n >= 0

assertion(-5, isPositive)
//=> throws TypeError: Expected 'isPositive' to be true for input: '-5'

assertion(5, isPositive, false)
//=> throws TypeError: Expected 'isPositive' to be false for input: '5'
