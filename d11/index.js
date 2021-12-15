const fs = require('fs')
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((row) => row.split('').map(Number))

const incrementAll = (data, flashList) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      data[i][j]++
      if (data[i][j] > 9) {
        flashList.push({ i, j })
        totalFlashes++
      }
    }
  }
}

const incrementNeighbours = (data, i, j, flashList) => {
  const indexes = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ]
  for (const index of indexes) {
    const [x, y] = index

    if (data?.[x]?.[y]) {
      data[x][y]++
      if (data[x][y] === 10) {
        flashList.push({ i: x, j: y })
        totalFlashes++
      }
    }
  }
}

const resetFlashes = (data) => {
  let flashes = 0
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] > 9) {
        data[i][j] = 0
        flashes++
      }
    }
  }
  return flashes
}

let totalFlashes

function a() {
  totalFlashes = 0
  const data = JSON.parse(JSON.stringify(input))

  let step = 0
  while (step < 100) {
    const flashList = []
    incrementAll(data, flashList)

    while (flashList.length > 0) {
      const { i, j } = flashList.shift()
      incrementNeighbours(data, i, j, flashList)
    }

    resetFlashes(data)
    step++
  }
  return totalFlashes
}

function b() {
  totalFlashes = 0
  const data = JSON.parse(JSON.stringify(input))

  let step = 0
  while (step < 400) {
    const flashList = []
    incrementAll(data, flashList)

    while (flashList.length > 0) {
      const { i, j } = flashList.shift()
      incrementNeighbours(data, i, j, flashList)
    }

    const currentFlashes = resetFlashes(data)
    if (currentFlashes === data.length * data[0].length) {
      return step + 1
    }
    step++
  }
  return -1
}

console.log(a(), b()) // 1694 346
// const matrix = input.map((row) => row.join('') + '\n').join('')
// console.log(matrix)
