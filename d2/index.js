const fs = require('fs')
const data = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((str) => str.split(' '))

function a() {
  let length = 0
  let depth = 0

  data.forEach(([instruction, X]) => {
    X = Number(X)
    switch (instruction) {
      case 'forward':
        length += X
        break
      case 'up':
        depth -= X
        break
      case 'down':
        depth += X
        break
      default:
        console.error('error')
        break
    }
  })
  return length * depth
}

function b() {
  let length = 0
  let depth = 0
  let aim = 0

  data.forEach(([instruction, X]) => {
    X = Number(X)
    switch (instruction) {
      case 'forward':
        length += X
        depth += aim * X
        break
      case 'up':
        aim -= X
        break
      case 'down':
        aim += X
        break
      default:
        console.error('error')
        break
    }
  })
  return length * depth
}

console.log(a(), b())
