/* eslint-disable @typescript-eslint/no-explicit-any */
const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env

const enabled =
  !NODE_DISABLE_COLORS &&
  NO_COLOR == null &&
  TERM !== 'dumb' &&
  ((FORCE_COLOR != null && FORCE_COLOR !== '0') || (process.stdout && process.stdout.isTTY))

// modifiers
const reset = init(0, 0),
  bold = init(1, 22),
  dim = init(2, 22),
  italic = init(3, 23),
  underline = init(4, 24),
  inverse = init(7, 27),
  hidden = init(8, 28),
  strikethrough = init(9, 29)

// colors
const black = init(30, 39),
  red = init(31, 39),
  green = init(32, 39),
  yellow = init(33, 39),
  blue = init(34, 39),
  magenta = init(35, 39),
  cyan = init(36, 39),
  white = init(37, 39),
  gray = init(90, 39),
  grey = init(90, 39)

// background colors
const bgBlack = init(40, 49),
  bgRed = init(41, 49),
  bgGreen = init(42, 49),
  bgYellow = init(43, 49),
  bgBlue = init(44, 49),
  bgMagenta = init(45, 49),
  bgCyan = init(46, 49),
  bgWhite = init(47, 49)

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
