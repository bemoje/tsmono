import colors from 'ansi-colors'

colors.enabled = (() => {
  const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env
  return (
    !NODE_DISABLE_COLORS &&
    NO_COLOR == null &&
    TERM !== 'dumb' &&
    ((FORCE_COLOR != null && FORCE_COLOR !== '0') || (process.stdout && process.stdout.isTTY))
  )
})()

export { colors }
export default colors
