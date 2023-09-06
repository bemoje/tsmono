export function prettyIsoDateString(
  iso: string,
  dateTimeSeparator = '_',
  precision: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond' = 'millisecond',
) {
  return iso.substring(0, map[precision]).replace(/T/, dateTimeSeparator).replace(/-|:/g, '.')
}

const map = {
  year: 4,
  month: 7,
  day: 10,
  hour: 13,
  minute: 16,
  second: 19,
  millisecond: 23,
}

// const s = '2020-02-03T14:01:04.437Z'
// console.log(prettyIsoDateString(s, '_', 'year'))
// console.log(prettyIsoDateString(s, '_', 'month'))
// console.log(prettyIsoDateString(s, '_', 'day'))
// console.log(prettyIsoDateString(s, '_', 'hour'))
// console.log(prettyIsoDateString(s, '_', 'minute'))
// console.log(prettyIsoDateString(s, '_', 'second'))
// console.log(prettyIsoDateString(s, '_', 'millisecond'))
