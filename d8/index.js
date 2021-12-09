const fs = require('fs')
const data = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((row) => row.split(' | '))

function a() {
  const unique = [2, 4, 3, 7]

  let count = 0
  data.forEach(([signal, output]) => {
    count += output.split(' ').filter((word) => unique.includes(word.length)).length
  })
  return count
}

// A ∩ B ∩ ...
const intersect = (setA, setB, ...args) => {
  const result = new Set([...setA].filter((i) => setB.has(i)))
  if (args.length === 0) return result
  return intersect(result, args.shift(), ...args)
}

// A ⋃ B ⋃ ...
const union = (setA, setB, ...args) => {
  const result = new Set([...setA, ...setB])
  if (args.length === 0) return result
  return union(result, args.shift(), ...args)
}

// A \ B \ ...
const complement = (setA, setB, ...args) => {
  const result = new Set([...setA].filter((x) => !setB.has(x)))
  if (args.length === 0) return result
  return complement(result, args.shift(), ...args)
}

function b() {
  const crackCode = (patterns) => {
    const known = Array(10)

    known[1] = new Set(patterns.filter((p) => p.length == 2)[0].split(''))
    known[4] = new Set(patterns.filter((p) => p.length == 4)[0].split(''))
    known[7] = new Set(patterns.filter((p) => p.length == 3)[0].split(''))
    known[8] = new Set(patterns.filter((p) => p.length == 7)[0].split(''))

    const unknown5 = patterns.filter((p) => p.length == 5).map((p) => new Set(p.split('')))
    const unknown6 = patterns.filter((p) => p.length == 6).map((p) => new Set(p.split('')))

    const intersect5s = intersect(...unknown5)
    const intersect6s = intersect(...unknown6)

    const segTop = intersect(intersect5s, known[7])
    const segMid = intersect(intersect5s, known[4], known[8])

    known[0] = complement(known[8], segMid)
    known[5] = union(intersect6s, segMid)
    const segBot = complement(known[5], known[4], segTop)
    known[3] = union(known[7], segMid, segBot)
    known[9] = union(known[3], known[5])
    const segBotLeft = complement(known[8], known[9])
    known[6] = union(known[5], segBotLeft)
    const segTopRight = complement(known[8], known[6])
    known[2] = union(intersect5s, segTopRight, segBotLeft)

    return known
      .map((set) => [...set].sort((a, b) => a.localeCompare(b)).join(''))
      .reduce((acc, cur, idx) => {
        acc[cur] = idx
        return acc
      }, {})
  }

  const decodeOutput = (crack, output) => {
    const sorted = output.split(' ').map((str) =>
      str
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('')
    )
    return Number(sorted.map((str) => crack[str]).join(''))
  }

  let sum = 0
  for (let [patternString, output] of data.values()) {
    const patterns = patternString.split(' ')
    const crack = crackCode(patterns)

    sum += decodeOutput(crack, output)
  }
  return sum
}

console.log(a(), b())
