const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n')

const bracketMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
  //
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}
const corruptTable = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}
const incompleteTable = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const getIllegal = (row) => {
  const stack = []
  const openBrackets = Object.keys(bracketMap).slice(0, 4)

  for (const char of row) {
    if (openBrackets.includes(char)) {
      stack.push(char)
    } else if (stack.at(-1) === bracketMap[char]) {
      stack.pop()
    } else {
      return char
    }
  }
}

const corrupted = []
for (const row of data) {
  corrupted.push(getIllegal(row))
}

function a() {
  return corrupted.filter((v) => v !== undefined).reduce((acc, cur) => acc + corruptTable[cur], 0)
}

const getRepair = (row) => {
  const stack = []
  const openBrackets = Object.keys(bracketMap).slice(0, 4)

  for (const char of row) {
    if (openBrackets.includes(char)) {
      stack.push(char)
    } else if (stack.at(-1) === bracketMap[char]) {
      stack.pop()
    } else {
      // return char
    }
  }
  return stack.map((b) => bracketMap[b]).reverse()
}

function b() {
  const scores = []
  const incomplete = data.filter((_, idx) => corrupted[idx] === undefined)

  for (const row of incomplete) {
    let totalScore = 0
    const completion = getRepair(row)

    for (const char of completion) {
      totalScore = totalScore * 5 + incompleteTable[char]
    }
    scores.push(totalScore)
  }

  scores.sort((a, b) => a - b)
  return scores[Math.floor(scores.length / 2)]
}

console.log(a(), b())
