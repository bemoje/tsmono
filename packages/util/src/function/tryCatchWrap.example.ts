import { tryCatchWrapAsync } from './tryCatchWrapAsync'
import { tryCatchWrapSync } from './tryCatchWrapSync'

function example2() {
  function syncFunc(this: unknown, options: { throw: boolean }) {
    if (options.throw) throw new Error('This is a fatal sync error')
    else console.log({ this: this })
  }

  const safeFuncSync = tryCatchWrapSync(syncFunc, console.error)

  console.log('\n\nstart2\n\n')
  safeFuncSync({ throw: false })
  console.log('\n\ndone1\n\n')

  console.log('\n\nstart2\n\n')
  safeFuncSync({ throw: true })
  console.log('\n\ndone2\n\n')
}
// example2()

async function example() {
  async function asyncFunc(this: unknown, options: { throw: boolean }) {
    if (options.throw) throw new Error('This is a fatal async error')
    else console.log({ this: this })
  }

  const safeFuncAsync = tryCatchWrapAsync(asyncFunc, console.error)

  console.log('\n\nstart2\n\n')
  await safeFuncAsync({ throw: false })
  console.log('\n\ndone1\n\n')

  console.log('\n\nstart2\n\n')
  console.log(await safeFuncAsync({ throw: true }))
  console.log('\n\ndone2\n\n')
}
// example()
