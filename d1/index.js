const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(Number)

function a() {
  let count = 0
  let previous = data[0]

  for (const current of data) {
    if (current > previous) {
      count++
    }
    previous = current
  }
  return count
}

function b() {
  let count = 0
  let prevSum = data[0] + data[1] + data[2]

  for (let i = 0; i < data.length - 2; i++) {
    const current = data[i]
    const next1 = data[i + 1] ?? 0
    const next2 = data[i + 2] ?? 0
    const currSum = current + next1 + next2

    if (currSum > prevSum) {
      count++
    }
    prevSum = currSum
  }
  return count
}

console.log(a(), b())
