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
export const reset = init(0, 0)
export const bold = init(1, 22)
export const dim = init(2, 22)
export const italic = init(3, 23)
export const underline = init(4, 24)
export const inverse = init(7, 27)
export const hidden = init(8, 28)
export const strikethrough = init(9, 29)

// colors
export const black = init(30, 39)
export const red = init(31, 39)
export const green = init(32, 39)
export const yellow = init(33, 39)
export const blue = init(34, 39)
export const magenta = init(35, 39)
export const cyan = init(36, 39)
export const white = init(37, 39)
export const gray = init(90, 39)
export const grey = init(90, 39)

// background colors
export const bgBlack = init(40, 49)
export const bgRed = init(41, 49)
export const bgGreen = init(42, 49)
export const bgYellow = init(43, 49)
export const bgBlue = init(44, 49)
export const bgMagenta = init(45, 49)
export const bgCyan = init(46, 49)
export const bgWhite = init(47, 49)

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

export default {
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
