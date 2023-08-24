/**
 * Get the stem from a given value.
 * @remarks This is a commonjs port of the ESM only package: https://www.npmjs.com/package/lancaster-stemmer
 * @param value Value to stem.
 * @example
 * lancasterStemmer('considerations') // => 'consid'
 * lancasterStemmer('detestable') // => 'detest'
 * lancasterStemmer('vileness') // => 'vil'
 * lancasterStemmer('giggling') // => 'giggl'
 * lancasterStemmer('anxious') // => 'anxy'
 */
export function lancasterStemmer(value: string): string {
  const vowels = /[aeiouy]/
  return (function applyRules(value: string, isIntact: boolean): string {
    const ruleset = rules[value.charAt(value.length - 1)]
    let index = -1
    if (!ruleset) {
      return value
    }
    while (++index < ruleset.length) {
      const rule = ruleset[index]
      if (!isIntact && (rule.type === 0 || rule.type === 3)) {
        continue
      }
      const breakpoint = value.length - rule.match.length
      if (breakpoint < 0 || value.slice(breakpoint) !== rule.match) {
        continue
      }
      if (rule.type === 2) {
        return value
      }
      const next = value.slice(0, breakpoint) + rule.replacement
      if (!(vowels.test(next.charAt(0)) ? next.length > 1 : next.length > 2 && vowels.test(next))) {
        continue
      }
      if (rule.type === 1 || rule.type === 3) {
        return applyRules(next, false)
      }
      return next
    }
    return value
  })(String(value).toLowerCase(), true)
}

const rules: ILancasterRules = (
  JSON.parse(
    '[["a",[["ia","",0],["a","",0]]],["b",[["bb","b",-1]]],["c",[["ytic","ys",-1],["ic","",1],["nc","nt",1]]],["d",[["dd","d",-1],["ied","y",1],["ceed","cess",-1],["eed","ee",-1],["ed","",1],["hood","",1]]],["e",[["e","",1]]],["f",[["lief","liev",-1],["if","",1]]],["g",[["ing","",1],["iag","y",-1],["ag","",1],["gg","g",-1]]],["h",[["th","",0],["guish","ct",-1],["ish","",1]]],["i",[["i","",0],["i","y",1]]],["j",[["ij","id",-1],["fuj","fus",-1],["uj","ud",-1],["oj","od",-1],["hej","her",-1],["verj","vert",-1],["misj","mit",-1],["nj","nd",-1],["j","s",-1]]],["l",[["ifiabl","",-1],["iabl","y",-1],["abl","",1],["ibl","",-1],["bil","bl",1],["cl","c",-1],["iful","y",-1],["ful","",1],["ul","",-1],["ial","",1],["ual","",1],["al","",1],["ll","l",-1]]],["m",[["ium","",-1],["um","",0],["ism","",1],["mm","m",-1]]],["n",[["sion","j",1],["xion","ct",-1],["ion","",1],["ian","",1],["an","",1],["een","",2],["en","",1],["nn","n",-1]]],["p",[["ship","",1],["pp","p",-1]]],["r",[["er","",1],["ear","",2],["ar","",-1],["or","",1],["ur","",1],["rr","r",-1],["tr","t",1],["ier","y",1]]],["s",[["ies","y",1],["sis","s",-1],["is","",1],["ness","",1],["ss","",2],["ous","",1],["us","",0],["s","",3],["s","",-1]]],["t",[["plicat","ply",-1],["at","",1],["ment","",1],["ent","",1],["ant","",1],["ript","rib",-1],["orpt","orb",-1],["duct","duc",-1],["sumpt","sum",-1],["cept","ceiv",-1],["olut","olv",-1],["sist","",2],["ist","",1],["tt","t",-1]]],["u",[["iqu","",-1],["ogu","og",-1]]],["v",[["siv","j",1],["eiv","",2],["iv","",1]]],["y",[["bly","bl",1],["ily","y",1],["ply","",2],["ly","",1],["ogy","og",-1],["phy","ph",-1],["omy","om",-1],["opy","op",-1],["ity","",1],["ety","",1],["lty","l",-1],["istry","",-1],["ary","",1],["ory","",1],["ify","",-1],["ncy","nt",1],["acy","",1]]],["z",[["iz","",1],["yz","ys",-1]]]]',
  ) as [string, [string, string, number][]][]
).reduce((accum: ILancasterRules, [letter, rules]) => {
  accum[letter] = rules.map(([match, replacement, type]) => {
    return { match, replacement, type }
  })
  return accum
}, {})

interface ILancasterRule {
  /**
   * what to match
   */
  match: string
  /**
   * the replacementacement string
   */
  replacement: string
  /**
   * the type of rule
   * @remakrs
   * type -1: cont
   * type 0: intact
   * type 1: stop
   * type 2: protect
   * type 3: contint
   */
  type: number
}

interface ILancasterRules {
  [key: string]: Array<ILancasterRule>
}
