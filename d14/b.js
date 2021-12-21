const fs = require('fs')
const [template, data] = fs.readFileSync('input.txt', 'utf8').split('\n\n')
const rules = data.split('\n')

const rulesMap = new Map()
for (const rule of rules) {
  const [pair, letter] = rule.split(' -> ')
  rulesMap.set(pair, letter)
}

let oldTemplate = new Map()
for (let i = 0; i < template.length - 1; i++) {
  const pair = template.substring(i, i + 2)
  oldTemplate.set(pair, (oldTemplate.get(pair) ?? 0) + 1)
}

function b() {
  let step = 0
  const letterFreqs = new Map()
  for (const char of template) {
    letterFreqs.set(char, (letterFreqs.get(char) ?? 0) + 1)
  }

  while (step < 40) {
    const newTemplate = new Map()

    for (const [pair, freq] of oldTemplate) {
      const [first, second] = pair.split('')
      const insert = rulesMap.get(pair)

      letterFreqs.set(insert, (letterFreqs.get(insert) ?? 0) + freq)

      const keys = [first + insert, insert + second]
      keys.forEach((key) => newTemplate.set(key, (newTemplate.get(key) ?? 0) + freq))
    }
    oldTemplate = newTemplate
    step++
  }
  const MC = Math.max(...letterFreqs.values())
  const LC = Math.min(...letterFreqs.values())
  return MC - LC
}

console.log(b()) // 4110568157153
