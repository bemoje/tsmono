/**
 * Normalize line lengths. Tries to merge sentences with its neighboring sentences onto the same line if they are short.
 * @param sentences Array of sentences
 * @param lowerBound Will try to merge sentences if the length of the current sentence is less than this value. If no user input is given, this value is automatically determined by calculating statistics on the data.
 * @param upperBound Will not merge sentences if the conbined length of the sentences is greater than this value. If no user input is given, this value is automatically determined by calculating statistics on the data.
 */
export function normalizeLineLengths(sentences: string[], lowerBound?: number, upperBound?: number): string[] {
  function singlePass(sentences: string[], lowerBound?: number, upperBound?: number): string[] {
    // determine lower and upper bounds if not given
    if (lowerBound === undefined || upperBound === undefined) {
      let average = 0
      let max = 0
      for (const s of sentences) {
        const l = s.length
        average += l
        if (l > max) max = l
      }
      average = Math.floor(average / sentences.length)
      if (lowerBound === undefined) lowerBound = average - Math.floor(average / 2)
      if (upperBound === undefined) upperBound = max - Math.floor(average / 2)
    }
    // merge sentences
    for (let i = 1; i < sentences.length; i++) {
      const cur = sentences[i]
      const pre = sentences[i - 1]
      if (cur.length + pre.length < upperBound && (cur.length < lowerBound || pre.length < lowerBound)) {
        sentences[i] = `${pre} ${cur}`
        sentences[i - 1] = ''
      }
    }
    return sentences.filter((s) => !!s)
  }

  let newSentences = singlePass(sentences, lowerBound, upperBound)
  while (newSentences.length !== sentences.length) {
    sentences = newSentences
    newSentences = singlePass(sentences, lowerBound, upperBound)
  }
  return newSentences
}
