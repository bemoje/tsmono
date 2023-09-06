/**
 * This is a fork of the 'kleur' npm package.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env

const enabled =
  !NODE_DISABLE_COLORS &&
  NO_COLOR == null &&
  TERM !== 'dumb' &&
  ((FORCE_COLOR != null && FORCE_COLOR !== '0') || (process.stdout && process.stdout.isTTY))

// modifiers
const reset = init(0, 0)
const bold = init(1, 22)
const dim = init(2, 22)
const italic = init(3, 23)
const underline = init(4, 24)
const inverse = init(7, 27)
const hidden = init(8, 28)
const strikethrough = init(9, 29)

// colors
const black = init(30, 39)
const red = init(31, 39)
const green = init(32, 39)
const yellow = init(33, 39)
const blue = init(34, 39)
const magenta = init(35, 39)
const cyan = init(36, 39)
const white = init(37, 39)
const gray = init(90, 39)
const grey = init(90, 39)

// background colors
const bgBlack = init(40, 49)
const bgRed = init(41, 49)
const bgGreen = init(42, 49)
const bgYellow = init(43, 49)
const bgBlue = init(44, 49)
const bgMagenta = init(45, 49)
const bgCyan = init(46, 49)
const bgWhite = init(47, 49)

function run(arr: any, str: string) {
  let beg = ''
  let end = ''
  for (let i = 0; i < arr.length; i++) {
    const tmp = arr[i]
    beg += tmp.open
    end += tmp.close
    if (~str.indexOf(tmp.close)) {
      str = str.replace(tmp.rgx, tmp.close + tmp.open)
    }
  }
  return beg + str + end
}

function chain(has: any, keys: any) {
  const o: any = { has, keys }

  o.reset = reset.bind(o)
  o.bold = bold.bind(o)
  o.dim = dim.bind(o)
  o.italic = italic.bind(o)
  o.underline = underline.bind(o)
  o.inverse = inverse.bind(o)
  o.hidden = hidden.bind(o)
  o.strikethrough = strikethrough.bind(o)

  o.black = black.bind(o)
  o.red = red.bind(o)
  o.green = green.bind(o)
  o.yellow = yellow.bind(o)
  o.blue = blue.bind(o)
  o.magenta = magenta.bind(o)
  o.cyan = cyan.bind(o)
  o.white = white.bind(o)
  o.gray = gray.bind(o)
  o.grey = grey.bind(o)

  o.bgBlack = bgBlack.bind(o)
  o.bgRed = bgRed.bind(o)
  o.bgGreen = bgGreen.bind(o)
  o.bgYellow = bgYellow.bind(o)
  o.bgBlue = bgBlue.bind(o)
  o.bgMagenta = bgMagenta.bind(o)
  o.bgCyan = bgCyan.bind(o)
  o.bgWhite = bgWhite.bind(o)

  return o
}

function init(open: number, close: number) {
  const blk = {
    open: `\x1b[${open}m`,
    close: `\x1b[${close}m`,
    rgx: new RegExp(`\\x1b\\[${close}m`, 'g'),
  }
  return function (this: any, txt: string) {
    if (this !== void 0 && this.has !== void 0) {
      !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk))
      return txt === void 0 ? this : enabled ? run(this.keys, txt + '') : txt + ''
    }
    return txt === void 0 ? chain([open], [blk]) : enabled ? run([blk], txt + '') : txt + ''
  }
}

export const colors = {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  grey,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
}

export default colors
