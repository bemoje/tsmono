import { Config, JsonDB } from 'node-json-db'

interface FooBar {
  Hello: string
  World: number
}

/**
 *
 */
async function main(filename: string, saveOnPush = true, humanReadable = true, separator = '.', syncOnSave = false) {
  const config = new Config(filename, saveOnPush, humanReadable, separator, syncOnSave)
  const db = new JsonDB(config)

  const object: FooBar = { Hello: 'World', World: 5 }

  await db.push('test124.here', object)
  const result = await db.getObject<FooBar>('test124.here')
  console.log(result)

  const p1 = 'some.asfsaf.to.somewhere.else'
  // await db.push(p1, 'myValue')
  const r1 = await db.getObjectDefault<string>(p1, 'myDefaultValue')
  console.log(r1)

  // Will be typed as FooBar in your IDE
}

main('myDataBase').catch(console.error)
