const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n')

const width = data[0].length

function a() {
  const tally = new Array(width).fill(0)

  for (let i = 0; i < data.length; i++) {
    const row = data[i].split('')
    for (let j = 0; j < row.length; j++) {
      const bit = row[j]
      if (bit == 1) {
        tally[j]++
      } else {
        tally[j]--
      }
    }
  }

  const gamma = tally.map((bit) => (bit > 0 ? '1' : '0')).join('')
  const epsilon = tally.map((bit) => (bit < 0 ? '1' : '0')).join('')

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

function b() {
  const computeTally = (input) => {
    const tally = new Array(width).fill(0)

    for (let i = 0; i < input.length; i++) {
      const row = input[i].split('')
      for (let j = 0; j < row.length; j++) {
        const bit = row[j]
        if (bit == 1) {
          tally[j]++
        } else {
          tally[j]--
        }
      }
    }
    return tally
  }
  let tally = computeTally(data)

  const gamma = tally.map((bit) => (bit > 0 ? '1' : '0')).join('')
  const epsilon = tally.map((bit) => (bit < 0 ? '1' : '0')).join('')

  let newGamma = data.filter((row) => row[0] == gamma[0])
  let newEpsilon = data.filter((row) => row[0] == epsilon[0])

  let i = 1
  while (newGamma.length > 2) {
    let newTally = computeTally(newGamma)
      .map((bit) => (bit >= 0 ? '1' : '0'))
      .join('')
    newGamma = newGamma.filter((row) => row[i] == newTally[i])
    i++
  }
  newGamma = newGamma.filter((row) => row[i] == 1).join('')

  let j = 1
  while (newEpsilon.length > 2) {
    let newTally = computeTally(newEpsilon)
      .map((bit) => (bit < 0 ? '1' : '0'))
      .join('')
    newEpsilon = newEpsilon.filter((row) => row[j] == newTally[j])
    j++
  }
  newEpsilon = newEpsilon.filter((row) => row[j] == 0).join('')

  return parseInt(newGamma, 2) * parseInt(newEpsilon, 2)
}

console.log(a(), b())
