import { ExtendError } from './ExtendError'

function example() {
  const WowError = ExtendError('Wow', TypeError)
  console.log(WowError)

  const err = new WowError('hello world', { wow: 1 })
  console.log('---------------------------------')
  console.log(JSON.stringify(err, null, 2))
  console.log('---------------------------------')
  console.log(err.toString())
  console.log('---------------------------------')
  throw err
}
