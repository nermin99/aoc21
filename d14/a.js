const _ = require('lodash')
const fs = require('fs')
const [template, data] = fs.readFileSync('input.txt', 'utf8').split('\n\n')
const rules = data.split('\n')

const insertAt = (str, sub, idx) => `${str.slice(0, idx)}${sub}${str.slice(idx)}`

const translateIndex = (sortedArr, idx) => {
  const nrShifts = sortedArr.slice(0, sortedArr.indexOf(idx)).length
  return idx + nrShifts
}

function a() {
  let step = 0
  let newTemplate = template

  while (step < 10) {
    const sortedIndexes = []
    let oldTemplate = newTemplate

    for (const rule of rules) {
      const [pair, letter] = rule.split(' -> ')
      const idxs = [...oldTemplate.matchAll(new RegExp(`(?=${pair})`, 'g'))].map((m) => m.index)

      if (idxs.length !== 0) {
        for (const idx of idxs) {
          const newIdx = idx + 1
          sortedIndexes.splice(_.sortedIndex(sortedIndexes, newIdx), 0, newIdx)

          const translatedIdx = translateIndex(sortedIndexes, newIdx)
          newTemplate = insertAt(newTemplate, letter, translatedIdx)
        }
      }
    }
    step++
  }

  const freqs = new Map()
  for (const char of newTemplate) {
    freqs.set(char, (freqs.get(char) ?? 0) + 1)
  }
  const MC = Math.max(...freqs.values())
  const LC = Math.min(...freqs.values())
  return MC - LC
}

console.log(a()) // 3247
