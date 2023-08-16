import fs from 'fs'
import path from 'path'
import { execBatch } from './util/execBatch'
import { getPackages } from './util/getPackages'

const cwd = process.cwd()

const type = process.argv[2]
if (!type) throw new Error('no version upgrade type provided. Can be patch, minor or major.')

let names = process.argv.slice(3)
if (!names.length) names = fs.readdirSync(path.join(cwd, 'pkg'))

// const tempdir = process.env['TEMP']!

const failed: string[] = []

getPackages()
  .filter(({ name }) => names.includes(name))
  .forEach(({ name, rootdir, pkgpath, pkg }) => {
    const original = pkg.version + ''
    const version = pkg.version.split('.').map(Number)
    if (type === 'patch') {
      version[2] += 1
    } else if (type === 'minor') {
      version[1] += 1
      version[2] = 0
    } else if (type === 'major') {
      version[0] += 1
      version[1] = 0
      version[2] = 0
    }
    pkg.version = version.join('.')
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')

    execBatch(
      [
        `cd ${rootdir}`,
        'npm publish --access public',
        //
      ],
      () => {
        failed.push(name)
        pkg.version = original
        fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
      },
    )

    // const bat = `@echo off\n\ncall cd ${rootdir}\ncall npm publish --access public`
    // console.log(bat)

    // const tempfile = path.join(tempdir, Date.now() + '.bat')
    // fs.writeFileSync(tempfile, bat, 'utf8')
    // try {
    //   execFileSync(tempfile, { stdio: 'inherit' })
    // } catch (error) {
    //   failed.push(name)
    //   pkg.version = original
    //   fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
    //   console.log(error)
    // }
    // fs.rmSync(tempfile)
  })

execBatch([
  `cd ${cwd}`,
  'npm run wipe-bemoje all',
  'npm i',
  //
])

console.log({ failed })
